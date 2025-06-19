import { Footer } from '@/components/footer';
import Navigation from '@/components/nav';
import { graphql } from '@/gql';
import gql from '@/app/request';
import Link from 'next/link';
import { ArrowRightIcon } from '@radix-ui/react-icons';

export const dynamic = 'force-dynamic';

const notFound = graphql(`
	query NotFound {
		...Navigation_query
		...Footer_query
	}
`);

export default async function NotFound() {
	//const resp = await gql.request(notFound);
	return (
		<div className="flex flex-col items-center min-h-screen">
			<Navigation data={{}} />

			<div className="flex flex-col gap-y-2 items-center mt-auto">
				<h1 className="text-4xl text-wjo font-bold">404 Not Found</h1>
				<p>You&apos;re looking for a page that doesn&apos;t exist</p>
				<Link
					href="/"
					className="flex flex-row items-center gap-x-1.5 text-sm text-white bg-wjo rounded-full py-1.5 pl-3 pr-1.5"
				>
					Home page <ArrowRightIcon />
				</Link>
			</div>

			<Footer data={{}} />
		</div>
	);
}
