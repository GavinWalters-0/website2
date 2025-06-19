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

import HoverToScroll from './HoverToScroll';

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


import React from 'react';

// This is the reusable card component for each video.
// It contains all the hover and transition logic.
const VideoCard = ({ videoSrc, title }) => {
  return (
    // This is the item that will be blurred or focused.
    // 'transition-all' makes the changes smooth.
    // 'group-hover:...' applies styles when the parent 'group' is hovered.
    // 'hover:!...' overrides the group-hover styles for the specific item you're on.
    <div className="w-full h-100 shadow-xl overflow-hidden cursor-pointer relative
                    transition-all duration-500 ease-in-out
                    
                    group-has-[&>:hover]:blur-md group-has-[&>:hover]:scale-95
                    
                    hover:!blur-none hover:!scale-105 hover:z-10">
      
      {/* The video element now acts as the background of the card. */}
      {/* `muted` is essential for reliable autoplay in modern browsers. */}
					{/* <video src="welding.mp4" autoPlay={true} loop={true} className='absolute pt-2 w-full h-full object-cover -z-10' />
					<div style={{ backdropFilter: "" }} className='w-full h-full flex pl-10 pt-8'>
						<h1 className='font-[Cooper] text-white text-8xl drop-shadow-xl'>MECHANICAL</h1>
					</div> */}
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        className="absolute brightness-90 top-0 left-0 w-full h-full object-cover"/>
    <h1 className='pt-2 pl-2 font-[Cooper] text-white text-[5rem] drop-shadow-xl'>{title}</h1>
 
      {/* This div provides a subtle dark overlay to ensure the text is always readable. */}
      {/* <div className="w-full h-full flex pl-10 items-center bg-black/20"> */}
        {/* Note: Your original 'font-[Cooper]' is a custom font. */}
        {/* I've used a fallback 'font-serif' here. You'll need to import 'Cooper' into your project. */}
        {/* <h1 className="font-serif text-white text-6xl md:text-8xl font-bold drop-shadow-xl">{title}</h1> */}
      {/* </div> */}
    </div>
  );
};

// This is the main App component that lays out the gallery.
function App() {
  return (
    <div className="w-screen min-h-screen bg-white flex flex-col">
      {/* This is the main container. The 'group' class is what allows us to style
        the children based on the hover state of this parent container.
      */}
      <div className="group w-full h-full grid grid-cols-2 lg:grid-cols-3">
        
        {/* I've used your "MECHANICAL" card and added two others to demonstrate the effect. */}
        {/* I'm using placeholder videos; you can replace the src with your own. */}
        <VideoCard 
          videoSrc="mechanical.mp4" 
          title="MECHANICAL" 
        />
        <VideoCard 
          videoSrc="welding.mp4" 
          title="FABRICATION" 
        />
        <VideoCard 
          videoSrc="electrical.mp4" 
          title="ELECTRICAL" 
        />
		<VideoCard 
          videoSrc="" 
          title="ELECTRICAL" 
        />

      </div>
    </div>
  );
}

export default async function Home() {
	const intro = {
		image_side: '',
		image_fit: 'cover',
		image: undefined,
		heading: '',
		subheading: '',
		content: `-	Provider of Process Piping, HVAC, Plumbing, and Piping Fabrication
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
		 	<div className='w-screen h-screen'>
		 		<App />
		 	</div>
		</div>
	);
}
