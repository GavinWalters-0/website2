import { FragmentType, graphql, useFragment } from '@/gql';
import { ProjectCard } from '@/components/project-card';

import logo from "@/public/20240415_112447.png"
import grand_sent from "@/public/grand_cent.png"
import gm from "@/public/gmTech.png"

export function FeaturedProjects(props) {
	const featured_projects = [
		{name:"University of Michigan Housing",documentId:1,image:logo},
		{name:"Michigan Central Station Renovation",documentId:2,image:grand_sent},
		{name:"GM Tech Center",documentId:3,image:gm}
	]

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{featured_projects.map(
				(p) => p && <ProjectCard image={p.image} name={p.name} key={p.documentId}/>
			)}
		</div>
	);
}
