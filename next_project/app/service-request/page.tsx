import { Footer } from '@/components/footer';
import { graphql } from '@/gql';
import gql from '../request';
import Navigation from '@/components/nav';
import { ServiceRequestChat } from './chat';
import { H1, H2 } from '@/components/prose';

export const dynamic = 'force-dynamic';

const serviceRequestPageQuery = graphql(`
	query ServiceRequestPage {
		...Navigation_query
		...Footer_query
		...ProjectGallery_query
	}
`);

export default async function ServiceRequest({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const params = await searchParams;
	const resp = await gql.request(serviceRequestPageQuery);

	return (
		<>
			<Navigation data={resp} />
			<div className="mx-auto py-4">
				<H2>Service Request</H2>
			</div>
			<div className="h-[calc(100vh_-_81px)]">
				<ServiceRequestChat
					existingCustomer={params['existing-customer'] === 'true'}
				/>
			</div>
			<Footer data={resp} />
		</>
	);
}
