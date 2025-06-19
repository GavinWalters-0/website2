'use client';

import { ProjectCard } from '@/components/project-card';
import { FragmentType, graphql, useFragment } from '@/gql';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import * as Popover from '@radix-ui/react-popover';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Slider from '@radix-ui/react-slider';
import { useMemo, useState } from 'react';
import { ProjectGallery_QueryFragment } from '@/gql/graphql';

export const ProjectsGallery_fragment = graphql(`
	fragment ProjectGallery_query on Query {
		projects(pagination: { limit: 25 }) {
			...ProjectCard
			documentId
			title
			industry
			location
			budget
			order
			createdAt
		}
	}
`);

function nearestMagnitude(n: number) {
	return Math.pow(10, Math.ceil(Math.log10(n)));
}

type ProjectType = NonNullable<
	ProjectGallery_QueryFragment['projects']
>[number];

function projectOrder(project: ProjectType) {
	const orderAttr = project?.order;
	if (typeof orderAttr === 'number') {
		return orderAttr;
	}

	return typeof project?.createdAt === 'string'
		? new Date(project?.createdAt).valueOf() + 1000
		: 10_000;
}

function formatCurrency(n: number) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0,
	}).format(n);
}

export function ProjectsGallery(props: {
	data: FragmentType<typeof ProjectsGallery_fragment>;
}) {
	const data = useFragment(ProjectsGallery_fragment, props.data);
	const industries = useMemo(
		() => Array.from(new Set(data.projects?.map((p) => p?.industry!)!)),
		[data]
	);
	const [nameFilter, setNameFilter] = useState('');
	const [selectedIndustries, setSelectedIndustries] = useState(industries);
	const initialMaxBudget = useMemo(
		() =>
			nearestMagnitude(
				Math.max(...data.projects?.map((p) => p?.budget!)!)
			),
		[data.projects]
	);
	const [minBudget, setMinBudget] = useState(0);
	const [maxBudget, setMaxBudget] = useState(initialMaxBudget);

	const filteredProjects = useMemo(() => {
		const projects = data.projects ?? [];
		type Project = (typeof projects)[number];

		function filterNames(p: Project) {
			return nameFilter !== ''
				? p?.title
						.toLocaleLowerCase()
						.includes(nameFilter.toLocaleLowerCase())
				: true;
		}

		function filterBudget(p: Project) {
			return p?.budget! >= minBudget && p?.budget! <= maxBudget;
		}

		function filterIndustries(p: Project) {
			return selectedIndustries.includes(p?.industry!);
		}

		return projects
			.filter(filterNames)
			.filter(filterBudget)
			.filter(filterIndustries);
	}, [data.projects, nameFilter, minBudget, maxBudget, selectedIndustries]);

	return (
		<>
			<div className="flex flex-col lg:flex-row gap-4">
				<Popover.Root>
					<Popover.Trigger className="flex flex-row gap-3 px-3 py-1.5 rounded-lg bg-neutral-100 group items-center w-full lg:w-64 truncate">
						<span className="grow text-left truncate">
							{selectedIndustries.length === 0
								? 'No industry'
								: selectedIndustries.length ===
									  industries.length
									? 'Filter by industry'
									: selectedIndustries.length > 2
										? `${selectedIndustries.length} selected industries`
										: selectedIndustries.join(', ')}
						</span>
						<ChevronDownIcon className="group-data-[state=open]:rotate-180 grow-0 shrink-0" />
					</Popover.Trigger>
					<Popover.Portal>
						<Popover.Content className="flex flex-col bg-white gap-px p-1.5 rounded-xl w-[--radix-popover-trigger-width] shadow-xl border border-neutral-100">
							{industries.map((industry) => (
								<label
									key={industry}
									className="flex flex-row gap-2 pl-3 py-1 pr-1.5 bg-neutral-100 items-center rounded-md"
								>
									<div className="grow">{industry}</div>
									<Checkbox.Root
										checked={selectedIndustries.includes(
											industry
										)}
										className="flex w-5 h-5 rounded-md justify-center items-center bg-neutral-200 text-white data-[state=checked]:bg-wjo"
										onCheckedChange={() => {
											const i =
												selectedIndustries.findIndex(
													(i) => i === industry
												);
											if (i >= 0) {
												setSelectedIndustries((old) => {
													const newI = [...old];
													newI.splice(i, 1);
													return newI;
												});
											} else {
												setSelectedIndustries((old) => [
													...old,
													industry,
												]);
											}
										}}
									>
										<Checkbox.Indicator>
											<CheckIcon />
										</Checkbox.Indicator>
									</Checkbox.Root>
								</label>
							))}
						</Popover.Content>
					</Popover.Portal>
				</Popover.Root>
				<input
					className="bg-neutral-100 px-3 py-1.5 rounded-lg grow"
					value={nameFilter}
					placeholder="Filter by name..."
					onChange={(ev) => setNameFilter(ev.currentTarget.value)}
				/>
				<div className="flex flex-col gap-2 my-auto pt-2 w-full lg:w-96">
					<Slider.Root
						defaultValue={[minBudget, maxBudget]}
						onValueChange={([newMin, newMax]) => {
							setMinBudget(newMin);
							setMaxBudget(newMax);
						}}
						min={0}
						max={initialMaxBudget}
						step={250_000}
						className="w-full lg:w-96 relative flex items-center"
					>
						<Slider.Track className="h-0.5 bg-neutral-200 relative grow rounded-full">
							<Slider.Range className="absolute bg-wjo rounded-full h-full" />
						</Slider.Track>
						<Slider.Thumb className="w-5 h-5 rounded-full bg-white border border-neutral-200 block shadow-xs relative" />
						<Slider.Thumb className="w-5 h-5 rounded-full bg-white border border-neutral-200 block shadow-xs relative" />
					</Slider.Root>
					<div className="text-sm gap-3 flex flex-row justify-between items-center">
						<span>{formatCurrency(minBudget)}</span>
						<span>{formatCurrency(maxBudget)}</span>
					</div>
				</div>
			</div>
			<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 w-full">
				{filteredProjects
					.sort((a, b) => projectOrder(a) - projectOrder(b))
					.map(
						(project) =>
							project && (
								<ProjectCard
									key={project?.documentId}
									project={project}
								/>
							)
					)}
			</div>
			{filteredProjects.length === 0 && (
				<div className="text-center text-2xl text-wjo-dim py-12">
					No projects match your filters
				</div>
			)}
		</>
	);
}
