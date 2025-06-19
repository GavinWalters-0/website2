import { FragmentType, graphql, useFragment } from '@/gql';
import { StrapiImage } from '@/components/strapi-image';
import Link from 'next/link';

const Partners_queryFragment = graphql(`
	fragment Partners_query on Query {
		partners {
			documentId
			name
			link
			logo {
				...Upload
			}
		}
	}
`);

type PartnersProps = {
	partners: FragmentType<typeof Partners_queryFragment>;
};

export function Partners(props: PartnersProps) {
	const data = useFragment(Partners_queryFragment, props.partners);

	const partners = data.partners ?? [];

	return (
		<div
			id="partners"
			className="flex flex-row flex-wrap gap-x-24 gap-y-8 items-center justify-center"
		>
			{partners?.map((p) => (
				<Link href={p?.link ?? '#partners'} key={p!.documentId}>
					{p?.logo && (
						<StrapiImage
							className="max-h-[5rem] h-auto w-auto max-w-[12.5rem]"
							alt={p?.name ?? undefined}
							image={p.logo}
						/>
					)}
				</Link>
			))}
		</div>
	);
}
