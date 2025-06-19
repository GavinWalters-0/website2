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
		heading:'Design/Build Services',
		subheading:'',
		content:'Whether you need a complete proposal based on your pre-designed plans, or a team construction project, we can deliver value on your investment. Every one of our clients — large or small — gets the same superlative customer service. When WJO is your single source of responsibility, you maximize cost-effectiveness, quality craftsmanship and on-site safety.',
		two_column_lists: ''
	};
		const history_data = {
	 	image_side: '',
		image_fit: 'cover',
		image: undefined,
		heading:'BIM',
		subheading:'',
		content:`Building Information Modeling (BIM) is changing the way buildings are designed, constructed, and operated, and W.J. O’Neil is at the forefront of the technology. Our 3D CAD Design and layout capabilities allow us to engineer new products, estimate material layouts, and check for possible design conflicts before starting a new job.

We fully support the BIM process, and our capital investment in software, hardware, and personnel maintains our leadership in this evolving technology. We incorporate this model into our everyday work and our clients realize the savings in cost and time`,
		two_column_lists: ''
	};

	const culture_data = {
	 	image_side: '',
		image_fit: 'cover',
		image: undefined,
		heading:'Pipe Fabrication',
		subheading:'',
		content:`WJO has certification in all of North America. Our ASME “P” stamp and “R” stamps cover work in the United States, and our TSSA Certification is for product shipped to Canada. Our certified personnel specialize in unique welding procedures, including GTAW, SMAW, MIG, submerged arc and orbital.

Our facility features state-of-the-art equipment and technology. Work is performed by local pipefitters and plumbers, trained to current standards and certified in most welding standards including orbital welding.`,
		two_column_lists: ''
	};

	const Accreditations_and_Certifications = {
	 	image_side: '',
		image_fit: 'cover',
		image: undefined,
		heading:'Plumbing',
		subheading:'',
		content:`WJO provides a full range of plumbing capabilities. In our large, innovative fabricating facilities, our expert staff can fabricate offsite plumbing components for specialized projects. Our broad capabilities give you single-source accountability. Plus, they allow us to seamlessly integrate plumbing into the functionality of a client’s building project, including our other systems such as HVAC, process piping, mechanical systems, and controls.`,
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
		heading:'HVAC Installation',
		subheading:'',
		content:`W.J. O’Neil has years of experience installing both commercial and industrial HVAC systems and we bring a wide range of expertise to every worksite. Our project planning and management are first class, so you can be certain your HVAC system is right-sized to your facility. You get a system engineered to run efficiently and save you money.`,
		two_column_lists: ''
	};
	const services_offering = {
	 	image_side: '',
		image_fit: 'cover',
		image: undefined,
		heading:'Additional Services Offered',
		subheading:'',
		content:`W.J. O’Neil offers additional expertise in the following areas:

Systems Analysis
Survey, Testing and Solutions
Sheet Metal Duct and Exhaust Systems
Refrigerants (All Types, including Ammonia, Recovery and Recycle)
Data Centers (Precision, Environmental and Main Frame Chillers)
Indoor Air Quality Clean Air Systems
Piping (Refrigeration, Steam, Air, Water and Process)
Balancing (Air and Hydronic)
Plumbing (Backflow Certification)
Chillers (Centrifugal, Absorption, Reciprocating, Screw and Scroll)`,
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
			<ContentBlock data={services_offering}/>
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
