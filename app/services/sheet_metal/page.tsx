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
		heading:'In House Fabrication',
		subheading:'',
		content:`W.J. O’Neil offers a wide range of sheet metal services. Our in-house group enables us to effectively support the sheet metal needs of our construction and service divisions. We offer our clients a fully operational sheet metal shop, complete with metal fabrication capabilities.`,
		two_column_lists: ''
	};
		const history_data = {
	 	image_side: '',
		image_fit: 'cover',
		image: undefined,
		heading:'Design and Build',
		subheading:'',
		content:`When WJO is your single source of responsibility, you maximize cost-effectiveness and quality craftsmanship. We work in tandem with all of our divisions from design to completion to deliver a streamlined, holistic experience to our customers.`,
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
