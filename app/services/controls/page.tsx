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
		heading:'Advanced Control Solutions for Maximum Efficiency',
		subheading:'',
		content:`The W.J. O'Neil Controls Division is a core part of our full-service mechanical contracting capabilities. We deliver advanced, web-based energy management systems designed to optimize building efficiency and reduce energy costs. Our services support the seamless integration of cutting-edge technology into our clients' projects, ensuring efficiency and ease of control across all building systems.`,
		two_column_lists: ''
	};
		const history_data = {
	 	image_side: '',
		image_fit: 'cover',
		image: undefined,
		heading:'State-of-the-Art Systems and Expertise',
		subheading:'',
		content:`Our Controls Division specializes in the design and installation of state-of-the-art energy management systems. By leveraging web-based interfaces, our solutions offer the following advantages:

Remote Monitoring and Control: All systems are accessible remotely, allowing real-time monitoring and adjustments from any location using a PC, tablet, or smartphone.

Smart Integration: Integration of both proprietary and open building protocols, including IoT-enabled devices, ensures seamless interaction between different building systems.

User-Friendly Interfaces: Our systems provide easy-to-use, intuitive interfaces that enhance building occupant experience and operational efficiency.

Cloud-Based Analytics: By incorporating cloud-based interfaces and advanced analytics, like Distech's ECLYPSE APEX, we offer real-time data-driven insights that support informed decision-making, identify hidden energy-saving opportunities, and streamline compliance reporting.

Energy Savings and Custom Programming: Through custom programming and tailored analytics, we deliver significant energy savings and operational improvements for all building types.`,
		two_column_lists: ''
	};

	const culture_data = {
	 	image_side: '',
		image_fit: 'cover',
		image: undefined,
		heading:'Vendor Neutrality for Client Flexibility',
		subheading:'',
		content:`W.J. O'Neil is vendor-neutral, giving our clients flexibility in choosing their control systems. We have experience with a variety of control products from leading manufacturers, including Distech Controls, Tridium, Schneider Electric, and Johnson Controls. This flexibility ensures that our clients receive the best system to meet their needs without being limited to a single manufacturer.`,
		two_column_lists: ''
	};

	const Accreditations_and_Certifications = {
	 	image_side: '',
		image_fit: 'cover',
		image: undefined,
		heading:'Distech Partner',
		subheading:'',
		content:`As an authorized distributor of Distech Controls, the W.J. O’Neil Company provides sales, application-engineering, design and configuration, as well as technical support of Distech products and systems. Distech is an innovation leader and shares the same philosophies as the W.J. O’Neil Company when it comes to energy management.`,
		two_column_lists: ''
	};

	const building_green = {
	 	image_side: '',
		image_fit: 'cover',
		image: undefined,
		heading:'Building Automation Services',
		subheading:'',
		content:`Our team provides comprehensive building automation services to ensure your facility performs at maximum efficiency, including:

Retro-commissioning and Recommissioning: We optimize your building's performance by assessing current operations, identifying issues, and implementing corrective actions.

Energy Optimization: We provide consultative services to align maintenance and operational efficiency with energy conservation goals, thereby maximizing both cost-effectiveness and energy savings.

Integration Expertise: We integrate HVAC, lighting, power, and security systems to provide an all-encompassing, efficient building management experience.`,
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
