import { Footer } from '@/components/footer';
import Navigation from '@/components/nav';
import { graphql } from '@/gql';
import gql from '@/app/request';
import { Contact } from '../contact';
import Column from '@/components/column';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: "Contact Us - W.J. O'Neil",
};

const contact = graphql(`
	query Contact {
		...Navigation_query
		...Footer_query
		homepage {
			...Contact
		}
	}
`);

export default async function About() {
	const resp = await gql.request(contact);
	const contactData = resp.homepage;

	return (
		<div className="flex flex-col items-center min-h-screen">
			<Navigation data={resp} />
			<Column>{contactData && <Contact data={contactData} />}</Column>
			<Footer data={resp} />
		</div>
	);
}
