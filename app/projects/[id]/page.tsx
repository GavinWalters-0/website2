import Navigation from '@/components/nav';
import { graphql } from '@/gql';
import gql from '@/app/request';
import { Footer } from '@/components/footer';
import { H1, H2 } from '@/components/prose';
import Markdown from '@/components/markdown';
import Link from 'next/link';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

import mapIcon from './map.svg';
import dollarIcon from './dollar.svg';
import Carousel from '@/components/carousel';
import Column from '@/components/column';
import { notFound } from 'next/navigation';

const projectPageQuery = graphql(`
	query ProjectPage($id: ID!) {
		currentProject: project(documentId: $id) {
			documentId
			title
			budget
			industry
			description
			location

			images {
				...Upload
			}
		}
		...Navigation_query
		...Footer_query
	}
`);

function formatCurrency(amount: number) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(amount);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const resp = await gql.request(projectPageQuery, {
		id: id,
	});

	const projectName = resp.currentProject?.title;

	return {
		title: `${projectName ?? '404 Not Found'} - W.J. O'Neil / Projects`,
	};
}

export default async function Project({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const resp = await gql.request(projectPageQuery, {
		id,
	});

	const project = resp.currentProject;

	if (!project) {
		return notFound();
	}

	return (
		<div className="flex flex-col min-h-screen h-full w-full items-center">
			<Navigation data={resp} />
			<Column>
				<div className="h-[32rem] w-full rounded-xl bg-neutral-100">
					<Carousel
						className="w-full h-full rounded-xl"
						objectFit="cover"
						images={project?.images?.map((i) => i!) ?? []}
					/>
				</div>
				<H2>{project?.title}</H2>
				<div className="flex flex-row divide-x border-wjo-dim/25 gap-3 text-wjo-dim font-semibold">
					{project?.location && (
						<span className="flex flex-row gap-2">
							<Image
								src={mapIcon}
								alt=""
								width={24}
								height={24}
								className="w-6 h-6"
							/>
							{project?.location}
						</span>
					)}
					{project?.industry && (
						<span className="[&:not(:first-child)]:pl-3 flex flex-row gap-2">
							{project?.industry}
						</span>
					)}
					{project?.budget && (
						<span className="[&:not(:first-child)]:pl-3 flex flex-row gap-2">
							<Image
								src={dollarIcon}
								alt=""
								width={24}
								height={24}
								className="w-6 h-6"
							/>
							{formatCurrency(project?.budget ?? 0)}
						</span>
					)}
				</div>
				<Markdown markdown={project?.description} />
				<Link
					className="flex flex-row gap-2 items-center text-wjo underline"
					href="/projects"
				>
					<span>Find more projects like this</span>
					<ArrowRightIcon className="w-4 h-4" />
				</Link>
			</Column>
			<Footer data={resp} />
		</div>
	);
}
