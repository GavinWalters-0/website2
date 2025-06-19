import { graphql } from '@/gql';
import gql from '@/app/request';
import { Footer } from '@/components/footer';
import { H1 } from '@/components/prose';
import Navigation from '@/components/nav';
import { ContentBlock } from '../../../components/content-block';
import { PageHeader } from '@/app/page-header';
import { notFound } from 'next/navigation';

const servicePageQuery = graphql(`
	query ServicePage($name: String!) {
		currentPage: servicePages(filters: { url: { eq: $name } }) {
			documentId
			name
			header {
				...Upload
			}
			blocks {
				id
				...ContentBlock
			}
		}
		...Navigation_query
		...Footer_query
	}
`);

export async function generateMetadata({
	params,
}: {
	params: Promise<{ service: string }>;
}) {
	const { service } = await params;
	const resp = await gql.request(servicePageQuery, {
		name: service,
	});

	const currentPage = resp.currentPage?.at(0);

	return {
		title: `${
			currentPage?.name ?? '404 Not Found'
		} - W.J. O'Neil / Services`,
	};
}

export default async function Service({
	params,
}: {
	params: Promise<{ service: string }>;
}) {
	const { service } = await params;
	const resp = await gql.request(servicePageQuery, {
		name: service,
	});

	const currentPage = resp.currentPage?.at(0);

	if (!currentPage) {
		return notFound();
	}

	return (
		<div className="flex flex-col min-h-screen h-full w-full items-center">
			<Navigation data={resp} />
			{currentPage?.header && (
				<PageHeader image={currentPage?.header}>
					<H1>{currentPage?.name}</H1>
				</PageHeader>
			)}

			<div className="flex flex-col gap-16 w-full max-w-6xl py-12 px-6">
				{currentPage?.blocks?.map(
					(b) => b && <ContentBlock key={b.id} data={b} />
				)}
			</div>
			<Footer data={resp} />
		</div>
	);
}
