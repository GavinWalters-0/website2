'use client';

import {
	ChangeEvent,
	ComponentPropsWithoutRef,
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useId,
	useState,
} from 'react';
import { Message } from './message';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { safeParse } from 'valibot';
import CreditForm from './credit-form';
import { H2 } from '../prose';
import * as v from 'valibot';

export interface ServiceRequestFormData
	extends v.InferOutput<typeof ServiceRequestFormSchema> {
	existingCustomer: boolean;
	urgency: string;
}

export const ServiceRequestFormSchema = v.object({
	companyName: v.pipe(v.string(), v.nonEmpty('Required')),
	address: v.pipe(v.string(), v.nonEmpty('Required')),
	contactName: v.pipe(v.string(), v.nonEmpty('Required')),
	contactPhone: v.pipe(v.string(), v.nonEmpty('Required')),
	contactLandline: v.optional(v.string()),
	contactEmail: v.optional(v.string()),
	po: v.optional(v.string()),
	problem: v.pipe(v.string(), v.nonEmpty('Required')),
	equipment: v.pipe(v.string(), v.nonEmpty('Required')),
});

const QuestionsContext = createContext({
	currentQuestion: 0,
	next(): void {},
	reset(): void {},
	goto(n: number): void {},
	answers: [] as string[],
	setAnswers(answers: SetStateAction<string[]>): void {},
});

export function useQuestionsContext() {
	return useContext(QuestionsContext);
}

export function QuestionsContextProvider({
	children,
	currentQuestion,
	setCurrentQuestion,
}: {
	children: ReactNode;
	currentQuestion: number;
	setCurrentQuestion: Dispatch<SetStateAction<number>>;
}) {
	const [answers, setAnswers] = useState<string[]>([]);
	function next() {
		setCurrentQuestion((i) => i + 1);
	}

	function goto(n: number) {
		setCurrentQuestion(n);
	}

	function reset() {
		setCurrentQuestion(0);
	}

	return (
		<QuestionsContext.Provider
			value={{
				currentQuestion,
				next,
				reset,
				answers,
				goto,
				setAnswers,
			}}
		>
			{children}
		</QuestionsContext.Provider>
	);
}

interface CommonQuestionProps {
	index: number;
}

interface ChatQuestionProps extends CommonQuestionProps {
	children: string;
	answers: string[];
	onAnswer(value: string): void;
	skipIfLast?: string;
}

export function ChatQuestion({
	children,
	index,
	answers,
	onAnswer,
	skipIfLast,
}: ChatQuestionProps) {
	const {
		currentQuestion,
		next,
		answers: previousAnswers,
		setAnswers,
	} = useQuestionsContext();
	const [answer, setAnswer] = useState('');

	if (
		typeof skipIfLast !== 'undefined' &&
		previousAnswers[index - 1] === skipIfLast
	) {
		if (currentQuestion === index) {
			next();
		}
		return;
	}

	if (currentQuestion < index || index < 0) {
		return;
	}

	const content = children
		.split('\n')
		.filter((v) => v.trim() !== '')
		.map((m, i) => (
			<Message key={i} variant="system">
				{m.trim()}
			</Message>
		));

	if (currentQuestion > index) {
		return (
			<>
				{content}
				<Message variant="user">
					{answer !== '' ? (
						answer
					) : (
						<span className="italic">No answer</span>
					)}
				</Message>
			</>
		);
	}

	return (
		<>
			{content}

			{answers.map((a, k) => (
				<Message
					key={k}
					variant="option"
					onClick={() => {
						setAnswer(a);
						onAnswer(a);
						setAnswers((v: string[]) => {
							if (v.length < index) {
								v.push(a);
							} else {
								v[index] = a;
							}
							return v;
						});
						next();
					}}
				>
					{a}
				</Message>
			))}
		</>
	);
}

interface ModalQuestionProps<T> extends CommonQuestionProps {
	message: string;
	children?(completeForm: () => void): ReactNode;
	skip?: boolean;
}

export function ModalQuestion<T>({
	index,
	message,
	children,
	skip,
}: ModalQuestionProps<T>) {
	const { currentQuestion, next, goto } = useQuestionsContext();
	const [open, setOpen] = useState(false);

	function completeForm() {
		setOpen(false);
		next();
	}

	if (typeof skip !== 'undefined' && skip) {
		if (currentQuestion === index) {
			goto(index + 1);
		}
		return;
	}

	if (currentQuestion < index || index < 0) {
		return;
	}

	const content = message
		.split('\n')
		.filter((v) => v.trim() !== '')
		.map((m, i) => (
			<Message key={i} variant="system">
				{m.trim()}
			</Message>
		));

	if (currentQuestion > index) {
		return (
			<>
				{content}
				<Message variant="user">
					<span className="italic">Form response omitted</span>
				</Message>
			</>
		);
	}

	return (
		<>
			{content}
			<AlertDialog.Root>
				<AlertDialog.Trigger className="px-3 py-1.5 rounded-lg bg-wjo text-white">
					Open form
				</AlertDialog.Trigger>
				<AlertDialog.Portal>
					<AlertDialog.Overlay className="bg-black/25 inset-0 fixed z-[51]" />
					<AlertDialog.Content className="fixed top-0 z-[52] flex flex-col max-h-screen overflow-y-auto w-screen">
						<div className="mx-auto my-12 bg-white p-6 flex flex-col rounded-2xl">
							{children?.(completeForm)}
						</div>
					</AlertDialog.Content>
				</AlertDialog.Portal>
			</AlertDialog.Root>
		</>
	);
}

type FormQuestionProps = CommonQuestionProps &
	ComponentPropsWithoutRef<'form'> & {
		question: string;
	};

export function FormQuestion({
	children,
	index,
	question,
	...props
}: FormQuestionProps) {
	const { currentQuestion } = useQuestionsContext();

	if (currentQuestion < index || index < 0) {
		return;
	}

	const content = question.split('\n').map((m, i) => (
		<Message key={i} variant="system">
			{m.trim()}
		</Message>
	));

	if (currentQuestion > index) {
		return (
			<>
				{content}
				<Message variant="user">
					<span className="italic">Form response omitted</span>
				</Message>
			</>
		);
	}

	return <form {...props}>{children}</form>;
}

interface StaticQuestionProps extends CommonQuestionProps {
	children: string;
}

export function StaticQuestion({ children, index }: StaticQuestionProps) {
	const { currentQuestion } = useQuestionsContext();

	if (currentQuestion < index) {
		return;
	}

	const content = children
		.split('\n')
		.filter((v) => v.trim() !== '')
		.map((m, i) => (
			<Message key={i} variant="system">
				{m.trim()}
			</Message>
		));

	return <>{content}</>;
}

export function Input({
	className,
	error,
	withLabel,
	...props
}: ComponentPropsWithoutRef<'input'> & {
	error?: string;
	withLabel?: boolean;
}) {
	const id = useId();
	return (
		<>
			{withLabel !== false && (
				<label htmlFor={id} className="text-xs font-semibold">
					{props.name}
					<span className="text-red-500">
						{props.required && '*'}
					</span>
				</label>
			)}
			<input
				id={id}
				className={
					'w-full px-3 py-1.5 rounded-lg bg-neutral-100 border border-transparent data-[error]:border-red-500 ' +
					(className ?? '')
				}
				data-error={error === '' ? undefined : error}
				{...props}
			/>
			{typeof error !== 'undefined' && error !== '' && (
				<span className="text-xs text-red-500 font-semibold">
					{error}
				</span>
			)}
		</>
	);
}

function Select({
	options,
	onChange,
	error,
	...props
}: Omit<ComponentPropsWithoutRef<'select'>, 'onChange'> & {
	onChange(v: string): void;
	options: string[];
	error?: string;
}) {
	const [value, setValue] = useState('');
	const [other, setOther] = useState(false);

	return (
		<>
			<span className="text-xs font-semibold">
				{props.name}
				<span className="text-red-500">{props.required && '*'}</span>
			</span>
			<select
				className="w-full px-3 py-1.5 rounded-md bg-neutral-100"
				value={value}
				onChange={(ev) => {
					const v = ev.target.value;
					setValue(v);
					if (v === 'Other') {
						setOther(true);
					} else {
						setOther(false);
						onChange(v);
					}
				}}
			>
				{!props.required ? (
					<option value="None">None</option>
				) : (
					<option disabled value="">
						Select one
					</option>
				)}
				{options.map((o) => (
					<option key={o} value={o}>
						{o}
					</option>
				))}
			</select>
			{other && (
				<input
					type="text"
					className="w-full px-3 py-1.5 rounded-md bg-neutral-100"
					placeholder="Please specify"
					required={true}
					onChange={(ev) => {
						onChange(ev.target.value);
					}}
				/>
			)}
			{typeof error !== 'undefined' && (
				<span className="text-xs text-red-500 font-semibold">
					{error}
				</span>
			)}
		</>
	);
}

function ResetBottomButton({ onClick }: { onClick?(): void }) {
	const { currentQuestion, reset } = useQuestionsContext();
	return (
		currentQuestion > 0 && (
			<button
				className="bg-wjo text-white w-max py-1.5 px-3 rounded-md"
				onClick={() => {
					reset();
					onClick?.();
				}}
			>
				Restart
			</button>
		)
	);
}

function ResetTopButton({ onClick }: { onClick?(): void }) {
	const { currentQuestion, reset } = useQuestionsContext();
	return (
		currentQuestion > 0 && (
			<div className="sticky top-0 bg-gradient-to-b from-white to-transparent h-12">
				<button
					className="bg-wjo text-white absolute top-2 left-1/2 -translate-x-1/2 w-max px-1.5 rounded-md"
					onClick={() => {
						reset();
						onClick?.();
					}}
				>
					Go back to the start
				</button>
			</div>
		)
	);
}

type FormKey = keyof ServiceRequestFormData & {};

type TypeOfEntity = 'proprietership' | 'partnership' | 'corporation' | 'other';
interface KeyManagementMember {
	name: string;
	title: string;
	phone: string;
	email: string;
}
export interface TradeReference {
	name: string;
	phone: string;
	address: string;
}

export interface CreditForm {
	companyName: string;
	phone: string;
	email: string;
	fax: string;
	billTo: string;
	shipTo: string;
	natureOfBusiness: string;
	dateEstablished: string;
	typeOfEntity: TypeOfEntity;
	keyManagementMembers: KeyManagementMember[];
	accountPayableContactName: string;
	accountPayableContactPhone: string;
	accountPayableContactFax: string;
	financialInstitutionName: string;
	financialInstitutionPhone: string;
	tradeReferences: TradeReference[];
	title: string;
}

export interface ChatProps {
	skipExistingCustomer?: boolean;
	restartStyle?: 'top' | 'bottom';
	onSubmit(
		form: ServiceRequestFormData,
		creditForm?: CreditForm
	): Promise<void>;
	onAdvance?(): void;
}

export function Chat({
	onSubmit,
	restartStyle,
	skipExistingCustomer,
	onAdvance,
}: ChatProps) {
	const i = skipExistingCustomer ? -1 : 0;
	const blankForm = {
		existingCustomer: skipExistingCustomer ?? false,
		urgency: '',
		address: '',
		companyName: '',
		contactEmail: '',
		contactName: '',
		contactPhone: '',
		equipment: '',
		problem: '',
		contactLandline: '',
		po: '',
	};
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [state, setState] = useState<ServiceRequestFormData>(blankForm);
	const [creditForm, setCreditForm] = useState<CreditForm | undefined>();

	const [errors, setErrors] = useState<
		Partial<Record<FormKey, string | undefined>>
	>({});

	useEffect(() => {
		onAdvance?.();
	}, [onAdvance, state]);

	function fieldHandler<K extends FormKey>(k: K) {
		return (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
			// if (typeof errors[k] !== 'undefined') {
			// 	delete errors[k];
			// }

			setState((s) => ({ ...s, [k]: ev.target.value }));
		};
	}

	function validate() {
		const res = safeParse(ServiceRequestFormSchema, state);

		if (res.success) {
			return true;
		}

		setErrors((err) => {
			for (const issue of res.issues) {
				console.log(issue.path?.at(0)?.key, issue.message);
				const key = issue.path?.at(0)?.key as FormKey | undefined;
				if (typeof key === 'undefined') {
					continue;
				}

				err[key] = issue.message;
			}

			console.log(err);
			return err;
		});

		return false;
	}

	return (
		<QuestionsContextProvider
			currentQuestion={currentQuestion}
			setCurrentQuestion={setCurrentQuestion}
		>
			{restartStyle === 'top' && (
				<ResetTopButton onClick={() => setState(blankForm)} />
			)}
			<ChatQuestion
				index={i + 0}
				onAnswer={(a) => {
					setState((v) => ({
						...v,
						existingCustomer: a.includes('existing'),
					}));
				}}
				answers={["I'm a new customer", "I'm an existing customer"]}
			>
				Hi, welcome to WJO. How can we help today?
			</ChatQuestion>
			<ModalQuestion
				index={i + 1}
				message="Please fill out this credit form before continuing"
				skip={state.existingCustomer}
			>
				{(done) => (
					<div className="flex flex-col gap-4">
						<AlertDialog.Title asChild>
							<H2>Credit Application</H2>
						</AlertDialog.Title>
						<AlertDialog.Description>
							Please fill out the following credit application
							form before continuing with your service request.
						</AlertDialog.Description>
						<CreditForm
							onSubmit={(response) => {
								setCreditForm(response);
								done();
							}}
						/>
					</div>
				)}
			</ModalQuestion>
			<ChatQuestion
				index={i + 2}
				onAnswer={(a) => {
					setState((v) => ({ ...v, urgency: a }));
				}}
				answers={[
					'Emergency same day overtime approved',
					'Emergency same/next day no overtime',
					'Service within a few days',
					'Maintenance request',
				]}
			>
				How urgent is your request?
			</ChatQuestion>
			<FormQuestion
				index={i + 3}
				className="flex flex-col gap-0.5"
				question="We just need a few more details"
				onSubmit={(ev) => {
					ev.preventDefault();
					if (validate()) {
						onSubmit(state, creditForm);
						setCurrentQuestion((c) => c + 1);
					}
				}}
			>
				<Input
					type="text"
					name="Company Name"
					autoComplete="organization"
					required
					placeholder="Acme Corp"
					value={state.companyName}
					onChange={fieldHandler('companyName')}
					error={errors.companyName}
				/>
				<Input
					type="text"
					name="Address"
					autoComplete="shipping"
					required
					placeholder="123 Street St."
					value={state.address}
					onChange={fieldHandler('address')}
					error={errors.address}
				/>
				<Input
					type="text"
					name="Contact Name"
					autoComplete="name"
					required
					placeholder="John Doe"
					value={state.contactName}
					onChange={fieldHandler('contactName')}
					error={errors.contactName}
				/>
				<Input
					type="tel"
					name="Contact Phone"
					autoComplete="tel-national"
					required
					placeholder="(000) 000 - 0000"
					error={errors.contactPhone}
					value={state.contactPhone}
					onChange={fieldHandler('contactPhone')}
				/>
				<Input
					type="email"
					name="Contact Email"
					autoComplete="email"
					required={false}
					placeholder="john.doe@example.com"
					error={errors.contactEmail}
					value={state.contactEmail}
					onChange={fieldHandler('contactEmail')}
				/>
				<Input
					type="tel"
					name="Contact Landline"
					autoComplete="tel-national"
					placeholder="(000) 000 - 0000"
					error={errors.contactLandline}
					value={state.contactLandline}
					onChange={fieldHandler('contactLandline')}
				/>
				<Input
					type="text"
					name="PO (optional)"
					placeholder="..."
					error={errors.po}
					value={state.po}
					onChange={fieldHandler('po')}
				/>
				<Select
					name="Problem"
					required
					error={errors.problem}
					onChange={(v) => setState((s) => ({ ...s, problem: v }))}
					options={[
						'No heat',
						'No cool',
						'Water/steam/oil Leak',
						'Noise',
						'Process noise',
						'Gas smell',
						'Other',
					]}
				/>
				<Select
					name="Equipment"
					required
					error={errors.equipment}
					onChange={(v) => setState((s) => ({ ...s, equipment: v }))}
					options={[
						'Boiler',
						'Chiller',
						'Pump',
						'Air handler',
						'Air conditioner',
						'Furnace',
						'Rooftop unit',
						'Other',
					]}
				/>
				<button className="bg-wjo text-white w-full py-1.5 px-3 rounded-md mt-2.5">
					Submit
				</button>

				{restartStyle !== 'top' && (
					<ResetBottomButton onClick={() => setState(blankForm)} />
				)}
			</FormQuestion>
			<StaticQuestion index={i + 4}>
				Thanks, we&apos;ll get back to you shortly.
			</StaticQuestion>
		</QuestionsContextProvider>
	);
}
