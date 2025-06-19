import { FragmentType, graphql, useFragment } from '@/gql';
import { StrapiImage } from '@/components/strapi-image';

import Image from 'next/image';

import basf_logo from "@/gavin/assets/clients/basf_ce2f9bd952.webp"
import ford_logo from "@/gavin/assets/clients/thumbnail_ford_ee0e9b2d86.webp"
import gmc_logo from "@/gavin/assets/clients/thumbnail_gmc_95006a2d52.webp"
import iso_logo from "@/gavin/assets/clients/thumbnail_iso_02fec3cb11.png"
import vw_logo from "@/gavin/assets/clients/vw_f305f4f015.webp"
import mmc from "@/gavin/assets/partners/motor_city_casino_d4a9aba44e.webp" 


//TODO: Abstract
const clients = [
	{
		id: 0,
		name:"BASF",
		logo: basf_logo
	},
	{
		id: 1,
		name:"Ford",
		logo: ford_logo
	},
	{
		id: 2,
		name:"GMC",
		logo: gmc_logo
	},
	{
		id: 3,
		name:"ISO",
		logo: iso_logo
	},
	{
		id: 4,
		name:"VW",
		logo: vw_logo
	},
	{
		id: 5,
		name:"mmc",
		logo: mmc
	}
]
//

export function Clients(props: ClientsProps) {
	return (
		<div className="flex flex-row flex-wrap items-center justify-center gap-x-24 gap-y-8">
			{clients?.map((c) => (
				<div key={c!.id}>
					<Image
						className="h-auto w-auto max-h-[5rem] max-w-[20rem]"
						src={c.logo}
						alt={c.name}
					/>
				</div>
			))}
		</div>
	);
}
