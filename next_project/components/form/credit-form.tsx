import {
	DeepKeys,
	DeepValue,
	FieldApi,
	FieldOptions,
	ReactFormApi,
	useForm,
} from '@tanstack/react-form';
import { type CreditForm, Input } from './new';
import { CheckIcon, Cross1Icon, PlusIcon } from '@radix-ui/react-icons';
import { H3 } from '../prose';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { ComponentPropsWithoutRef } from 'react';
import { valibotValidator } from '@tanstack/valibot-form-adapter';
import * as v from 'valibot';

type SelfKeys<T> = {
	[K in keyof T]: K;
}[keyof T];

type DeepKeyValueName<TFormData, TField> = SelfKeys<{
	[K in DeepKeys<TFormData> as DeepValue<TFormData, K> extends TField
		? K
		: never]: K;
}>;

function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function Row(props: ComponentPropsWithoutRef<'div'>) {
	return <div {...props} className="flex flex-row gap-4" />;
}

function TextField<T extends FieldApi<any, any, any, any>>({
	field,
	inputProps,
	className,
}: {
	field: T;
	className?: string;
	inputProps: ComponentPropsWithoutRef<typeof Input>;
}) {
	return (
		<div className={className ?? 'flex flex-col grow'}>
			<Input
				{...inputProps}
				error={field.state.meta.errors.join(', ')}
				value={field.state.value}
				onChange={(ev) => field.handleChange(ev.currentTarget.value)}
			/>
		</div>
	);
}

export interface CreditFormProps {
	onSubmit(form: CreditForm): void;
}

export default function CreditForm({ onSubmit }: CreditFormProps) {
	const creditForm = useForm<CreditForm>({
		defaultValues: {
			companyName: '',
			phone: '',
			email: '',
			fax: '',
			billTo: '',
			shipTo: '',
			natureOfBusiness: '',
			dateEstablished: '',
			typeOfEntity: 'other',
			keyManagementMembers: [],
			accountPayableContactName: '',
			accountPayableContactPhone: '',
			accountPayableContactFax: '',
			financialInstitutionName: '',
			financialInstitutionPhone: '',
			tradeReferences: [],
			title: '',
		},
		onSubmit({ value }) {
			onSubmit(value);
		},
	});

	return (
		<form
			onSubmit={(ev) => {
				ev.preventDefault();
				ev.stopPropagation();
				creditForm.handleSubmit();
			}}
			className="flex flex-col gap-4 w-screen max-w-5xl"
		>
			<H3>General Information</H3>
			<Row>
				<creditForm.Field
					name="companyName"
					validatorAdapter={valibotValidator()}
					validators={{
						onChange: v.pipe(
							v.string(),
							v.minLength(
								3,
								'Company name must be 3 or more characters'
							)
						),
					}}
				>
					{(field) => (
						<TextField
							field={field}
							inputProps={{
								type: 'text',
								required: true,
								name: 'Company Name',
								placeholder: 'ACME Corporation',
								autoComplete: 'organization',
							}}
						/>
					)}
				</creditForm.Field>
			</Row>
			<Row>
				<creditForm.Field
					name="phone"
					validatorAdapter={valibotValidator()}
					validators={{
						onChange: v.pipe(
							v.string('Invalid phone'),
							v.minLength(
								10,
								'Phone number must be 10 or more characters'
							)
						),
					}}
				>
					{(field) => (
						<TextField
							field={field}
							inputProps={{
								type: 'tel',
								name: 'Phone',
								required: true,
								placeholder: '(000) 000-0000',
								autoComplete: 'tel-national',
							}}
						/>
					)}
				</creditForm.Field>
				<creditForm.Field
					name="email"
					validatorAdapter={valibotValidator()}
					validators={{
						onChange: v.pipe(
							v.string('Invalid email'),
							v.email('Must be a valid email address')
						),
					}}
				>
					{(field) => (
						<TextField
							field={field}
							inputProps={{
								type: 'email',
								name: 'Email',
								required: true,
								placeholder: 'contact@acmecorp.example',
								autoComplete: 'email',
							}}
						/>
					)}
				</creditForm.Field>
			</Row>

			<creditForm.Field name="fax">
				{(field) => (
					<TextField
						field={field}
						inputProps={{
							type: 'tel',
							name: 'Fax',
							placeholder: '(000) 000-0000',
							autoComplete: 'tel-national',
						}}
					/>
				)}
			</creditForm.Field>
			<Row>
				<creditForm.Field
					name="billTo"
					validatorAdapter={valibotValidator()}
					validators={{
						onChange: v.pipe(
							v.string(),
							v.minLength(
								10,
								'Billing address must be 10 or more characters'
							)
						),
					}}
				>
					{(field) => (
						<div className="flex flex-col grow">
							<label
								htmlFor="billto"
								className="text-xs font-semibold"
							>
								Bill to
								<span className="text-red-500">*</span>
							</label>
							<textarea
								id="billto"
								className="w-full px-3 py-1.5 rounded-lg bg-neutral-100 border border-transparent data-[error]:border-red-500"
								placeholder="Bill to"
								autoComplete="billing street-address"
								value={field.state.value}
								data-error={
									field.state.meta.errors.length > 0
										? field.state.meta.errors.join(', ')
										: undefined
								}
								onChange={(ev) =>
									field.handleChange(ev.currentTarget.value)
								}
							/>
							{field.state.meta.errors.length > 0 && (
								<span className="text-xs text-red-500 font-semibold">
									{field.state.meta.errors.join(', ')}
								</span>
							)}
						</div>
					)}
				</creditForm.Field>
				<creditForm.Field
					name="shipTo"
					validatorAdapter={valibotValidator()}
					validators={{
						onChange: v.pipe(
							v.string(),
							v.minLength(
								10,
								'Shipping address must be 10 or more characters'
							)
						),
					}}
				>
					{(field) => (
						<div className="flex flex-col grow">
							<label
								htmlFor="shipto"
								className="text-xs font-semibold"
							>
								Ship to
								<span className="text-red-500">*</span>
							</label>
							<textarea
								id="shipto"
								className="w-full px-3 py-1.5 rounded-lg bg-neutral-100 border border-transparent data-[error]:border-red-500"
								placeholder="Ship to"
								autoComplete="shipping street-address"
								value={field.state.value}
								data-error={
									field.state.meta.errors.length > 0
										? field.state.meta.errors.join(', ')
										: undefined
								}
								onChange={(ev) =>
									field.handleChange(ev.currentTarget.value)
								}
							/>
							{field.state.meta.errors.length > 0 && (
								<span className="text-xs text-red-500 font-semibold">
									{field.state.meta.errors.join(', ')}
								</span>
							)}
						</div>
					)}
				</creditForm.Field>
			</Row>

			<creditForm.Field name="typeOfEntity">
				{(field) => (
					<RadioGroup.Root
						className="flex flex-row justify-between"
						value={field.state.value}
						onValueChange={(value) => {
							field.handleChange(
								value as
									| 'proprietership'
									| 'partnership'
									| 'corporation'
									| 'other'
							);
						}}
					>
						<span>Type of entity</span>
						{[
							'proprietership',
							'partnership',
							'corporation',
							'other',
						].map((v, i) => (
							<div
								key={i}
								className="flex flex-row gap-1.5 items-center justify-center grow"
							>
								<RadioGroup.Item
									id={`toe-r${i}`}
									className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center data-[state=checked]:bg-wjo"
									value={v}
								>
									<RadioGroup.Indicator className="w-2 h-2 rounded-full bg-white" />
								</RadioGroup.Item>
								<label htmlFor={`toe-r${i}`}>
									{capitalize(v)}
								</label>
							</div>
						))}
					</RadioGroup.Root>
				)}
			</creditForm.Field>

			<hr />

			<H3>Key Management Members</H3>
			<creditForm.Field
				name="keyManagementMembers"
				mode="array"
				validatorAdapter={valibotValidator()}
				validators={{
					onChange: v.pipe(
						v.array(
							v.object({
								name: v.string(),
								title: v.string(),
								phone: v.string(),
								email: v.string(),
							})
						),
						v.minLength(
							1,
							'You must add at least one key management member.'
						)
					),
				}}
			>
				{(field) => (
					<div className="flex flex-col gap-2">
						<div className="flex flex-row gap-2">
							<div className="font-semibold grow">Name</div>
							<div className="font-semibold grow">Title</div>
							<div className="font-semibold grow">Phone</div>
							<div className="font-semibold grow">Email</div>
							<div className="w-9" />
						</div>

						{field.state.value.length === 0 && (
							<div className="p-4 text-center bg-gray-100 rounded-md">
								You must add at least one key management member.
							</div>
						)}

						{field.state.value.map((_, i) => (
							<div key={i} className="flex flex-row gap-2">
								<creditForm.Field
									name={`keyManagementMembers[${i}].name`}
									validatorAdapter={valibotValidator()}
									validators={{
										onChange: v.pipe(
											v.string(),
											v.minLength(
												1,
												'You must specify a name'
											)
										),
									}}
								>
									{(field) => (
										<TextField
											field={field}
											inputProps={{
												name: 'Name',
												placeholder: 'Alex Doe',
												withLabel: false,
												required: true,
												autoComplete: 'name',
											}}
										/>
									)}
								</creditForm.Field>
								<creditForm.Field
									name={`keyManagementMembers[${i}].title`}
									validatorAdapter={valibotValidator()}
									validators={{
										onChange: v.pipe(
											v.string(),
											v.minLength(
												1,
												'You must specify a title'
											)
										),
									}}
								>
									{(field) => (
										<TextField
											field={field}
											inputProps={{
												name: 'Title',
												withLabel: false,
												placeholder: 'CEO',
												required: true,
												autoComplete:
													'organization-title',
											}}
										/>
									)}
								</creditForm.Field>
								<creditForm.Field
									name={`keyManagementMembers[${i}].phone`}
									validatorAdapter={valibotValidator()}
									validators={{
										onChange: v.pipe(
											v.string('Invalid phone'),
											v.minLength(
												10,
												'Phone number must be 10 or more characters'
											)
										),
									}}
								>
									{(field) => (
										<TextField
											field={field}
											inputProps={{
												type: 'tel',
												name: 'Phone',
												placeholder: '(000) 000-0000',
												withLabel: false,
												required: true,
												autoComplete: 'tel-national',
											}}
										/>
									)}
								</creditForm.Field>
								<creditForm.Field
									name={`keyManagementMembers[${i}].email`}
									validatorAdapter={valibotValidator()}
									validators={{
										onChange: v.pipe(
											v.string('Invalid email'),
											v.email('Must be a valid email')
										),
									}}
								>
									{(field) => (
										<TextField
											field={field}
											inputProps={{
												type: 'email',
												name: 'Email',
												placeholder:
													'alex.doe@acme.example',
												withLabel: false,
												required: true,
												autoComplete: 'email',
											}}
										/>
									)}
								</creditForm.Field>
								<button
									type="button"
									className="p-2 flex items-center justify-center w-9 h-9 text-gray-500 bg-gray-100 rounded-full"
									onClick={() => {
										field.removeValue(i);
									}}
								>
									<Cross1Icon className="m-auto" />
								</button>
							</div>
						))}
						<button
							className="bg-wjo text-white px-3 py-1.5 rounded-lg items-center justify-center flex ml-auto gap-1.5"
							type="button"
							onClick={() =>
								field.pushValue({
									name: '',
									title: '',
									phone: '',
									email: '',
								})
							}
						>
							<PlusIcon />
							Add key management member
						</button>
					</div>
				)}
			</creditForm.Field>

			<hr />

			<H3>Account Payable Contact</H3>
			<Row>
				<creditForm.Field
					name="accountPayableContactName"
					validatorAdapter={valibotValidator()}
					validators={{
						onChange: v.pipe(
							v.string(),
							v.minLength(1, 'You must specify a name')
						),
					}}
				>
					{(field) => (
						<TextField
							field={field}
							inputProps={{
								type: 'text',
								name: 'Account Payable Contact Name',
								placeholder: 'Alex Doe',
								autoComplete: 'name',
								required: true,
							}}
						/>
					)}
				</creditForm.Field>
				<creditForm.Field
					name="accountPayableContactPhone"
					validatorAdapter={valibotValidator()}
					validators={{
						onChange: v.pipe(
							v.string('Invalid phone'),
							v.minLength(
								10,
								'Phone number must be 10 or more characters'
							)
						),
					}}
				>
					{(field) => (
						<TextField
							field={field}
							inputProps={{
								type: 'tel',
								name: 'Account Payable Contact Phone',
								placeholder: '(000) 000-0000',
								autoComplete: 'tel-national',
								required: true,
							}}
						/>
					)}
				</creditForm.Field>
				<creditForm.Field name="accountPayableContactFax">
					{(field) => (
						<TextField
							field={field}
							inputProps={{
								type: 'tel',
								name: 'Account Payable Contact Fax',
								placeholder: '(000) 000-0000',
								autoComplete: 'tel-national',
							}}
						/>
					)}
				</creditForm.Field>
			</Row>

			<hr />

			<H3>Financial Institution</H3>
			<div className="flex flex-row gap-4">
				<creditForm.Field name="financialInstitutionName">
					{(field) => (
						<div className="flex flex-col grow">
							<Input
								type="text"
								name="Financial Institution Name"
								placeholder="ACME Bank"
								autoComplete="organization"
								value={field.state.value}
								onChange={(ev) =>
									field.handleChange(ev.currentTarget.value)
								}
							/>
						</div>
					)}
				</creditForm.Field>
				<creditForm.Field
					name="financialInstitutionPhone"
					validatorAdapter={valibotValidator()}
					validators={{
						onChange: v.pipe(
							v.string('Invalid phone'),
							v.minLength(
								10,
								'Phone number must be 10 or more characters'
							)
						),
					}}
				>
					{(field) => (
						<div className="flex flex-col grow">
							<Input
								type="tel"
								name="Financial Institution Phone"
								placeholder="(000) 000-0000"
								autoComplete="tel-national"
								value={field.state.value}
								onChange={(ev) =>
									field.handleChange(ev.currentTarget.value)
								}
							/>
						</div>
					)}
				</creditForm.Field>
			</div>

			<hr />

			<H3>Trade References</H3>

			<creditForm.Field name="tradeReferences" mode="array">
				{(field) => (
					<div className="flex flex-col gap-2">
						<div className="flex flex-row gap-2">
							<div className="font-semibold grow">Name</div>
							<div className="font-semibold grow">Phone</div>
							<div className="font-semibold grow">Address</div>
							<div className="w-9" />
						</div>

						{field.state.value.length === 0 && (
							<div className="p-4 text-center bg-gray-100 rounded-md">
								You must add at least one trade reference.
							</div>
						)}

						{field.state.value.map((_, i) => (
							<div key={i} className="flex flex-row gap-2">
								<creditForm.Field
									name={`tradeReferences[${i}].name`}
									validatorAdapter={valibotValidator()}
									validators={{
										onChange: v.pipe(
											v.string(),
											v.minLength(
												1,
												'You must specify a name'
											)
										),
									}}
								>
									{(subField) => (
										<TextField
											field={subField}
											inputProps={{
												type: 'text',
												name: 'Name',
												placeholder: 'Alex Doe',
												autoComplete: 'name',
												withLabel: false,
												required: true,
												value: subField.state.value,
												onChange(ev) {
													subField.handleChange(
														ev.currentTarget.value
													);
												},
											}}
										/>
									)}
								</creditForm.Field>
								<creditForm.Field
									name={`tradeReferences[${i}].phone`}
									validatorAdapter={valibotValidator()}
									validators={{
										onChange: v.pipe(
											v.string(),
											v.minLength(
												10,
												'Phone number must be 10 or more characters'
											)
										),
									}}
								>
									{(subField) => (
										<TextField
											field={subField}
											inputProps={{
												type: 'tel',
												name: 'Phone',
												autoComplete: 'tel-national',
												withLabel: false,
												placeholder: '(000) 000-0000',
												value: subField.state.value,
												required: true,
												onChange(ev) {
													subField.handleChange(
														ev.currentTarget.value
													);
												},
											}}
										/>
									)}
								</creditForm.Field>
								<creditForm.Field
									name={`tradeReferences[${i}].address`}
									validatorAdapter={valibotValidator()}
									validators={{
										onChange: v.pipe(
											v.string(),
											v.minLength(
												10,
												'Address must be 10 or more characters'
											)
										),
									}}
								>
									{(subField) => (
										<TextField
											field={subField}
											inputProps={{
												type: 'text',
												name: 'Address',
												autoComplete: 'shipping',
												placeholder: '1234 ACME Dr',
												withLabel: false,
												value: subField.state.value,
												required: true,
												onChange(ev) {
													subField.handleChange(
														ev.currentTarget.value
													);
												},
											}}
										/>
									)}
								</creditForm.Field>
								<button
									type="button"
									className="p-2 flex items-center justify-center w-9 h-9 grow-0 shrink-0 text-gray-500 bg-gray-100 rounded-full"
									onClick={() => {
										field.removeValue(i);
									}}
								>
									<Cross1Icon className="m-auto" />
								</button>
							</div>
						))}
						<button
							className="bg-wjo text-white px-3 py-1.5 rounded-lg items-center justify-center flex ml-auto gap-1.5"
							type="button"
							onClick={() =>
								field.pushValue({
									name: '',
									phone: '',
									address: '',
								})
							}
						>
							<PlusIcon />
							Add trade reference
						</button>
					</div>
				)}
			</creditForm.Field>

			<hr />

			<div>
				To the best of our knowledge and belief, the information is
				accurate and may be relied upon in making your credit decision.
				We authorize our bank and suppliers to furnish any information
				to complete your evaluation of our credit history.
			</div>
			<button
				className="bg-wjo text-white px-3 py-1.5 rounded-lg items-center justify-center flex ml-auto gap-1.5"
				onClick={() => {}}
				type="submit"
			>
				<CheckIcon />
				Acknowledge and submit form
			</button>
		</form>
	);
}
