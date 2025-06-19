import { Footer } from '@/components/footer';
import Navigation from '@/components/wjonav';
import { graphql } from '@/gql';
import gql from '@/app/request';
import { PageHeader } from '@/app/page-header';
import { H1 } from '@/components/prose';
import { ContentBlock } from '@/components/content-block';
import Column from '@/components/column';
import { Metadata } from 'next';

import image from "@/gavin/assets/chuttersnap_oq_Jx_J4_T_Yo_Qg_unsplash_2baff248c0.jpg"

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: "About Us - W.J. O'Neil",
};

const about = graphql(`
	query About {
		...Navigation_query
		...Footer_query
		aboutPage {
			video_embed_url
			header {
				...Upload
			}
			blocks {
				id
				...ContentBlock
			}
		}
	}
`);

export default async function About() {
	//const resp = await gql.request(about);

	//const headerImage = resp.aboutPage?.header;
	//const youtubeEmbedURL = resp.aboutPage?.video_embed_url;
	const data = {
	 	image_side: '',
		image_fit: 'cover',
		image: undefined,
		heading:'PM Agreements',
		subheading:'',
		content:`We offer a variety of Maintenance Agreements:
Full Coverage, Bumper to Bumper repairs, parts and Maintenance.
Preventive Maintenance and Inspection, with recommended repairs.
Chiller Winter Maintenance and tube cleaning.
Maintaining Equipment
Reduces downtime and emergency service calls.
Reduces energy consumption
Increase reliability and increases life expectancy.
Reduces the lifetime cost of operating and repairing your equipment by up to 30%
When you have a Maintenance Agreement you do not worry about remembering to take care of the equipment, we do that for you`,
		two_column_lists: ''
	};
		const history_data = {
	 	image_side: '',
		image_fit: 'cover',
		image: undefined,
		heading:'WJO Maintains, Services, Replaces and Refurbishes the following equipment:',
		subheading:'',
		content:`Boilers, Steam and Hot Water
Makeup Air Units, Direct and In-Direct Fired
Steam and Hydronic Systems
Chillers, Air and Water-Cooled
Water Heaters
Air Handling Equipment
Furnaces
Exhaust Fans
Air Conditioners
Pumps
Pneumatic and Electronic Control Systems
Computer Room Equipment
Environmental Chambers
Rooftop Heating / Cooling Equipment
Heat Pumps
Mini Splits
Plumbing Systems
Variable Refrigerant Flow Systems
`,
		two_column_lists: ''
	};

	const culture_data = {
	 	image_side: '',
		image_fit: 'cover',
		image: undefined,
		heading:'24/7 Emergency Service',
		subheading:'',
		content:`We have over (70) service vehicles on the road for quick response.
We have a live operator standing by 24/7. You will never have to leave a voicemail and hope to get a call back. (734) 266.3338
We also offer an electronic Service Request that goes to a live operator 24/7, for immediate response.
We have technicians on standby 24/7 for a quicker response on after-hours service.`,
		two_column_lists: ''
	};

	const Accreditations_and_Certifications = {
	 	image_side: '',
		image_fit: 'cover',
		image: undefined,
		heading:'HVAC Service',
		subheading:'',
		content:`We have highly skilled, factory-trained technicians with years of experience.
We service all makes and models of HVAC equipment from the largest chillers and boilers to the smallest wall ACs and furnaces.`,
		two_column_lists: ''
	};

	const building_green = {
	 	image_side: '',
		image_fit: 'cover',
		image: undefined,
		heading:'Process Piping',
		subheading:'',
		content:`W.J. O’Neil Company is recognized nationally for our Process Piping Division. One large fabricating facility in Michigan supports our field installations, so costs are controlled and safety is maximized. The key to our success is our methodical preproduction process. We collaborate directly with building owners and the other trades to ensure all processes are coordinated and piping systems are fully integrated with the building’s overall mechanical systems.

Our veteran staff relishes the challenge of demanding assignments. Past WJO projects include refineries, automotive assemblies, chemical plants, utilities mains and our area of expertise, paint systems.`,
		two_column_lists: ''
	};
	
	const safety = {
	 	image_side: '',
		image_fit: 'cover',
		image: undefined,
		heading:'Installation / Refurbishment and HVAC Equipment Replacement',
		subheading:'',
		content:`We offer

- New Equipment installation
Replacement of old equipment with new.
Refurbishment of old equipment when replacement is not practical or possible.`,
		two_column_lists: ''
	};
	return (
		<div className="flex flex-col items-center min-h-screen">
			<Navigation/>
			<PageHeader image={image}>
				<div className='flex items-center rounded-xl bg-wjo p-1'>
				</div>
			</PageHeader>
			<Column>
			<ContentBlock data={data}/>
			<ContentBlock data={history_data}/>
			<ContentBlock data={culture_data}/>
			<ContentBlock data={Accreditations_and_Certifications}/>
			<ContentBlock data={building_green}/>
			<ContentBlock data={safety}/>
				{/* {resp.aboutPage?.blocks?.map(
					(block) =>
						block && <ContentBlock key={block.id} data={block} />
				)} */}
				{/* {youtubeEmbedURL && (
					<div className="flex flex-col items-center">
						<iframe
							width="560"
							height="315"
							className="w-full aspect-video h-auto"
							src={youtubeEmbedURL}
							title="YouTube video player"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
						></iframe>
					</div>
				)} */}
			</Column>
			{/* <Footer data={resp} /> */}
		</div>
	);
}
