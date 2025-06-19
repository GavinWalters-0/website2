import { FragmentType, graphql, useFragment } from '@/gql';
import { StrapiImage } from '@/components/strapi-image';

import Image from 'next/image';

import acca from "@/gavin/assets/partners/acca_b51ba0d60b.png"
import aws from "@/gavin/assets/partners/aws_4af2aedbf3.png"
import mca from "@/gavin/assets/partners/mca_logo_272f2219da.png"
import pfi from "@/gavin/assets/partners/pfi_logo_5ed082e1a1.png"
import rses from "@/gavin/assets/partners/rses_9aa9a66fed.png"
import aia from "@/gavin/assets/partners/aia_42ea7d8cdc.svg"
import dcc from "@/gavin/assets/partners/DCC_Logo_METUS_Primary.png"


//TODO: Abstract
const clients = [
	{
		id: 0,
		name:"acca",
		logo: acca
	},
	{
		id: 1,
		name:"aws",
		logo: aws
	},
	{
		id: 2,
		name:"mca",
		logo: mca
	},
	{
		id: 3,
		name:"pfi",
		logo: pfi
	},
	{
		id: 4,
		name:"rses",
		logo: rses
	},
	{
		id: 5,
		name:"aia",
		logo: aia
	},
	{
		id: 6,
		name:"rses",
		logo: dcc
	}
]
//

export function Partners(props) {
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
