import { FragmentType, graphql, useFragment } from '@/gql';
import { StrapiImage } from '@/components/strapi-image';

const Clients_fragment = graphql(`
	fragment Clients on Homepage {
		clients {
			id
			name
			logo {
				...Upload
			}
		}
	}
`);

type ClientsProps = {
	clients: FragmentType<typeof Clients_fragment>;
};

export function Clients(props: ClientsProps) {
	const { clients } = useFragment(Clients_fragment, props.clients);

	return (
		<div className="flex flex-row flex-wrap gap-x-24 gap-y-8 items-center justify-center">
			{clients?.map((c) => (
				<div key={c!.id}>
					{c?.logo && (
						<StrapiImage
							className="max-h-[5rem] h-auto w-auto max-w-[20rem]"
							alt={c.name ?? undefined}
							image={c.logo}
						/>
					)}
				</div>
			))}
		</div>
	);
}
