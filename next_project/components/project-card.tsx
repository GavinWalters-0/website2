import { FragmentType, graphql, useFragment } from '@/gql';
import { StrapiImage } from './strapi-image';
import { H3 } from './prose';
import Link from 'next/link';
import Image from 'next/image';



const ProjectCard_fragment = graphql(`
	fragment ProjectCard on Project {
		documentId
		title
		thumbnail {
			...Upload
		}
		industry
	}
`);


export function ProjectCard(props) {
	const documentId = props.documentId
	const name = props.name
	const image = props.image

	return (
		<Link
			href={`/projects/${documentId}`}
			className="flex flex-col gap-2 group"
		>
			<div className="h-72 w-full rounded-xl overflow-clip relative">
				<Image
				alt='1'
				src={image}
				/>
			</div>
			<h2 className="text-wjo text-center font-semibold text-2xl">{name}</h2>
			{/* <H3>Test</H3> */}
		</Link>
	);
}
