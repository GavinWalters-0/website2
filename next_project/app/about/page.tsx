import { Footer } from '@/components/footer';
import Navigation from '@/components/wjonav';
import { graphql } from '@/gql';
import gql from '@/app/request';
import { PageHeader } from '../page-header';
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
		heading:'Built On Customer Satisfaction',
		subheading:'',
		content:'At The W.J. O’Neil Company, our focus is simple: putting our customers first. Every part of our organization — from our talented team and responsive service department to our state-of-the-art fabrication shop — operates with one purpose in mind: surpassing client expectations. This principle has been at the heart of our mission since our founding over 41 years ago, and today, that dedication is stronger than ever.True leadership demands a clear vision and teamwork, and at WJO, we excel at both. Our unwavering commitment to client satisfaction is evident in the trust of our past clients, the experiences of those we currently serve, and the opportunity to provide outstanding service to future partners.',
		two_column_lists: ''
	};
		const history_data = {
	 	image_side: '',
		image_fit: 'cover',
		image: undefined,
		heading:'History',
		subheading:'',
		content:`Established in 1983, W.J. O’Neil Company was founded on the belief that every one of our valuable customers deserves outstanding quality and service. Because of these convictions, much of our new business is referrals from our satisfied clients.

Today we are a leader in green building. We design our projects to conserve energy, and strengthen the economies of the communities where we work and live. Conducting business in a socially, economically, and environmentally responsible manner is a mandate in every aspect of our operation.`,
		two_column_lists: ''
	};

	const culture_data = {
	 	image_side: '',
		image_fit: 'cover',
		image: undefined,
		heading:'Culture',
		subheading:'',
		content:`The W.J. O’Neil Company is a team of specialists united by a singular purpose: to exceed the expectations of our clients. We are Project Estimators, Journeymen Pipefitters, Service Technicians, Project Foremen, Safety Engineers and more, bound together by principles of integrity, quality, and excellence.

From the smallest service job to the largest construction project, we deliver quality work each and every time. We are a multi-faceted mechanical contractor specializing in industrial and commercial installations and service, and achieving 100% customer satisfaction is why we have an excellent reputation in the Mechanical Contracting Industry.`,
		two_column_lists: ''
	};

	const Accreditations_and_Certifications = {
	 	image_side: '',
		image_fit: 'cover',
		image: undefined,
		heading:'Accreditations and Certifications',
		subheading:'',
		content:`ISO-9001:2015 Certified and QOS Compliant

These certifications ensure that WJO as designed and implemented a reliable system of controls that meet customer demands for quality management. Achieving these certifications required a rigorous review process of assessment, document review, and onsite evaluations.

LEED Certification

Careful planning is essential to achieving LEED certification, and our highly skilled LEED Accredited Professionals know all the latest green building practices and LEED requirements and processes.

GreenStar Designation

We take pride in helping our customers achieve energy efficiency and conserve natural resources. Our commitment to environmental sustainability began in the last century, and we continue to be a leader in green technology in the 21st century.`,
		two_column_lists: ''
	};

	const building_green = {
	 	image_side: '',
		image_fit: 'cover',
		image: undefined,
		heading:'Building Green - Setting a Higher Standard',
		subheading:'',
		content:`W.J. O’Neil is a leader in green building. We help clients safeguard the environment, conserve energy, and strengthen the economies and social structures of communities. Our commitment to environmental sustainability began in the last century, and we continue to be a leader in green technology in the 21st century.

In fact, sustainability is integral to every aspect of W.J. O’Neil’s operation. Conducting business in a socially, economically, and environmentally responsible manner, is a mandate on every one of our projects.

Leadership in sustainability is more than a responsibility at WJO; it is an obligation, a privilege, and an honor.`,
		two_column_lists: ''
	};
	
	const safety = {
	 	image_side: '',
		image_fit: 'cover',
		image: undefined,
		heading:'Safety Is More Than A Goal: It\'s A Requirement',
		subheading:'',
		content:`From front office managers to field employees, safety is always first. We were one of the first in the industry to establish an effective Safety Program to prevent potential hazards from occurring at the work environment.

Our goal is Zero Incidents. We look at each incident as a series of steps that led to an injury that should be prevented from ever happening again.

We conduct regular training seminars, safety meetings, toolbox talks, site inspections, and pre-task planning. Safety issues include: fire prevention, excavations, welding and burning, industrial hygiene, occupational health, motorized vehicles and mechanized equipment.

Our Safety Protection Program and the Accident Prevention Program exceed MIOSHA requirements and are mandatory for WJ O’Neil employees. This up-to-date training makes our staff and personnel as knowledgeable as possible about some of the potential hazards that can occur within the job site.`,
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
