import { graphql } from '@/gql';
import Navigation from '@/components/nav';
import { Footer } from '@/components/footer';
import gql from '../request';
import { H1, H2, P } from '@/components/prose';
import { ProjectCard } from '@/components/project-card';
import { PageHeader } from '../page-header';
import Markdown from '@/components/markdown';
import Column from '@/components/column';
import * as Select from '@radix-ui/react-select';
import { ProjectsGallery } from './gallery';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

const projectsPageQuery = graphql(`
	query ProjectsPage {
		...Navigation_query
		...Footer_query
		...ProjectGallery_query
		projectsPage {
			description
			header {
				...Upload
			}
		}
	}
`);

export const metadata: Metadata = {
	title: "Projects - W.J. O'Neil",
};

export default async function Projects() {
	const resp = await gql.request(projectsPageQuery);

	const headerImage = resp.projectsPage?.header;

	if (!headerImage) {
		throw new Error('No header image specified');
	}

	return (
		<>
			<Navigation data={resp} />
			<PageHeader image={headerImage}>
				<H1>Our Projects</H1>
			</PageHeader>
			<Column>
				<Markdown markdown={resp.projectsPage?.description} />
				<ProjectsGallery data={resp} />
			</Column>
			<Footer data={resp} />
		</>
	);
}
