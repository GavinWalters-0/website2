import { graphql, useFragment } from '@/gql';
import gql from './request';
import { Hero } from './hero';
import { Footer } from '@/components/footer';
import { H2, H3, P } from '../components/prose';
//import { Clients } from './clients';
import { Partners } from '@/gavin/react_components/partners';
import { FeaturedProjects } from './featured-projects';
import Link from 'next/link';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Contact } from './contact';
import Column from '@/components/column';
import { FormPopup } from '@/components/form/popup';
export const dynamic = 'force-dynamic';


import { Clients } from '@/gavin/react_components/clients';

import { ContentBlock } from '@/components/content-block';

import Image from 'next/image';

import phone0 from "@/app/phone-icon.svg"
import phone1 from "@/app/phone-calling-icon.svg"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import GlideComponent from './glide1';

const homepageQuery = graphql(`
	query Homepage {
		homepage {
			...Clients
			...FeaturedProjects
			...Contact

			mission_statement
		}
		...Partners_query
		...Hero_query
		...Footer_query
	}
`);

export default async function Home() {
		const intro = {
	 	image_side: '',
		image_fit: 'cover',
		image: undefined,
		heading:'',
		subheading:'',
		content:`-	Provider of Process Piping, HVAC, Plumbing, and Piping Fabrication
-	Piping Fabrication and Sheet Metal Fabrication facilities in both Livonia, Michigan & Chattanooga, Tennessee
-	Service Division - 24 /7 Service Operation; Including HVAC, Preventive and Full Coverage Maintenance Programs, HVAC, Boiler, Chiller, Data Centers & Building Control Systems
-	Controls Group Division: Provides full-service Retrofits and Construction for multiple control brands; Tridium, Johnson Controls, Distech, Circon, and Honeywell Systems
-	Sheet Metal Division for commercial, industrial and design/build services. A fully operational Sheet Metal shop 
-	Electrical Division: Provides full-service Retrofits and Construction electrical work
-	Mechanical Engineering:  Full time, in-house Mechanical Engineer for all aspects of mechanical systems
`,
		two_column_lists: ''
	};
	const card_width = 'w-80 h-100';
	//const resp = await gql.request(homepageQuery);

	//const attributes = resp.homepage;

	//if (!attributes) {
	//	throw new Error('No homepage data set');
	//}

	//const { mission_statement } = attributes;
	return (
		<div className="flex flex-col items-center">
			<Hero data={{}} />
			<div className='w-full h-50'>
				<GlideComponent
			</div>
			<Column>
				<div className="flex flex-col items-center gap-4">
					{/* <P>W.J. O’Neil Company is a leader in industrial and commercial installations and service. At The W.J. O’Neil Company, our focus is simple: putting our customers first. Every part of our organization — from our talented team and responsive service department to our state-of-the-art fabrication shop — operates with one purpose in mind: surpassing client expectations. This principle has been at the heart of our mission since our founding over 41 years ago, and today, that dedication is stronger than ever.</P> */}
					{/* <ContentBlock data={intro}/> */}
					<div className='flex grow justify-center items-center flex-wrap gap-4'>
					<Card className={card_width}>
						<CardContent >
							<Typography variant="h5" gutterBottom sx={{ color: 'black'}}>
								Mechanical	
							</Typography>
							<Typography variant="h5" component="div">
							</Typography>
							<Typography variant="body2">
								Provider of Process Piping and HVAC systems
							</Typography>
						</CardContent>
					</Card>
										<Card className={card_width}>
						<CardContent >
							<Typography variant="h5" gutterBottom sx={{ color: 'black'}}>
								Plumbing	
							</Typography>
							<Typography variant="h5" component="div">
							</Typography>
							<Typography variant="body2">
								Full-service provider of plumbing systems	
							</Typography>
						</CardContent>
					</Card>
										<Card className={card_width}>
						<CardContent >
							<Typography variant="h5" gutterBottom sx={{ color: 'black'}}>
								Service	
							</Typography>
							<Typography variant="h5" component="div">
							</Typography>
							<Typography variant="body2">
								A 24/7 Service Division for HVAC, Boilers, Chillers, Data Centers, and Building Control Systems	
							</Typography>
						</CardContent>
					</Card>
															<Card className={card_width}>
						<CardContent >
							<Typography variant="h5" gutterBottom sx={{ color: 'black'}}>
								Electrical	
							</Typography>
							<Typography variant="h5" component="div">
							</Typography>
							<Typography variant="body2">
								full-service electrical work for both retrofits and new construction projects	
							</Typography>
						</CardContent>
					</Card>
															<Card className={card_width}>
						<CardContent >
							<Typography variant="h5" gutterBottom sx={{ color: 'black'}}>
								Sheet Metal	
							</Typography>
							<Typography variant="h5" component="div">
							</Typography>
							<Typography variant="body2">
								commercial, industrial, and design/build services	
							</Typography>
						</CardContent>
					</Card>
															<Card className={card_width}>
						<CardContent >
							<Typography variant="h5" gutterBottom sx={{ color: 'black'}}>
								Fabrication	
							</Typography>
							<Typography variant="h5" component="div">
							</Typography>
							<Typography variant="body2">
								Piping Fabrication and Sheet Metal Fabrication	
							</Typography>
						</CardContent>
					</Card>
																				<Card className={card_width}>
						<CardContent >
							<Typography variant="h5" gutterBottom sx={{ color: 'black'}}>
								Controls	
							</Typography>
							<Typography variant="h5" component="div">
							</Typography>
							<Typography variant="body2">
								 full-service retrofits and new construction	
							</Typography>
						</CardContent>
					</Card>
					
					
					</div>
				</div>
				<div className="flex flex-col items-center gap-4">
					<H2>Trusted by the best</H2>
					<Clients/>
				</div>
				<div className="flex flex-col gap-4">
					<hgroup className="flex flex-col-reverse gap-1.5">
						<H2>Some of what we{"'"}ve done</H2>
						<H3>Projects</H3>
					</hgroup>
					<FeaturedProjects/>
					{/* <Link
						className="text-wjo underline flex flex-row gap-1.5 items-center"
						href="/projects"
					>
						Explore more projects <ArrowRightIcon />
					</Link> */}
				</div>
				<div className="flex flex-col items-center gap-4">
					<H2>Our Partners</H2>
					<Partners/>
				</div>
			<div className='flex pt-10 justify-center'>
			<div className="pt-2 pb-2 flex flex-col items-center">
				<div className='flex'>
					<Image
						alt=""
						className="w-6 h-6 basis-6 grow-0 shrink-0 pr-1"
						width={24}
						height={24}
						src={phone0}
					/>
					<h3 className="text-wjo font-semibold">
					Main Phone
				    </h3>
				</div>
					<span className="group-hover:text-wjo">
						734-458-2300
					</span>
			</div>
			<div className="pt-2 pb-2 pl-20 flex flex-col items-center">
			<div className='flex'>
					<Image
						alt=""
						className="w-6 h-6 basis-6 grow-0 shrink-0 pr-1"
						width={24}
						height={24}
						src={phone1}
					/>
					<h3 className="text-wjo font-semibold">
						24/7 Service Phone		
				    </h3>
				</div>
					<span className="group-hover:text-wjo">
						734-266-3338
					</span>
			</div>
			</div>
				{/* <Contact data={attributes} /> */}
			</Column>
			<Footer data={{}} />
			{/* <FormPopup /> */}
		</div>
	);
}

				<div style={{ borderRadius: "12px", }} className='w-full h-70 relative'>
					<video src="welding.mp4" autoPlay={true} loop={true} className='absolute pt-2 w-full h-full object-cover -z-10' />
					<div style={{ backdropFilter: "" }} className='w-full h-full flex pl-10 pt-8'>
						<h1 className='font-[Cooper] text-white text-8xl drop-shadow-xl'>MECHANICAL</h1>
					</div>
				</div>