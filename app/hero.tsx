import {
	StrapiImage,
	StrapiMedia,
	StrapiVideo,
} from '@/components/strapi-image';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon, ChevronDownIcon, TriangleDownIcon } from '@radix-ui/react-icons';
import { FragmentType, graphql, useFragment } from '@/gql';
import { NavList, ServicesDropdown } from '@/components/services-dropdown';
import { NavRoot } from '@/components/nav-root';
import NavLinks from '@/components/nav-links';
//import background from "../public/wjoqa-assets/wjo_hero_video_a0c1348607.mp4"
import logo from "../public/wjo_white_small_08953aa280.png"
import GlideComponent from './glide1';


const Hero_queryFragment = graphql(`
	fragment Hero_query on Query {
		...ServicesDropdown_query
		...Navigation_query
		navigation {
			logo {
				...Upload
			}
		}
		homepage {
			subtitle
			logo {
				...Upload
			}
			background {
				...Upload
			}
		}
	}
`);

export type HeroProps = {
	data: FragmentType<typeof Hero_queryFragment>;
};

export function Hero({ data }: HeroProps) {
	//const hero = useFragment(Hero_queryFragment, data);

	//if (!hero.homepage) {
	//	throw new Error('Invalid hero, missing homepage data');
	//}

	//const { logo, subtitle, background } = hero.homepage;
	//const mobileLogo = hero.navigation?.logo;
	const subtitle = "test"


	// if (!logo || !background) {
	// 	throw new Error('Invalid hero, missing logo or background');
	// }

	return (
		<header className="w-screen h-screen overflow-hidden">
			<video src="Hero_video.mp4" autoPlay loop muted className="object-cover min-h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 absolute" />
			<div className='flex w-full h-20 items-center px-20 gap-50'>
				<div className='card1 px-4 p-2 h-12'>
					<Image
					src={logo}
					width={245}
					alt="logo"
					className="object-contain"
				/>
				</div>

				<div className='flex items-center card1 px-4 p-2 h-12 gap-10'>
					<div className='flex gap-1 items-center'>
					<h2 className='text-[18px]'>About Us</h2>
					<TriangleDownIcon className='w-5 h-5 text-wjo'/>
					</div>
										<div className='flex gap-1 items-center'>
					<h2 className='text-[18px]'>What We Do</h2>
					<TriangleDownIcon className='w-5 h-5 text-wjo'  />
					</div>
										<div className='flex gap-1 items-center'>
					<h2 className='text-[18px]'>Projects</h2>
					<TriangleDownIcon className='w-5 h-5 text-wjo' />
					</div>
										<div className='flex gap-1 items-center'>
					<h2 className='text-[18px]'>Contact Us</h2>
					<TriangleDownIcon className='w-5 h-5 text-wjo'  />
					</div>
				</div>
				
			</div>
			<div className='h-23 absolute inset-x-0 bottom-0 w-full'>
				<div className='card3 w-full h-full flex items-center pt-3 pb-3' >
					<GlideComponent />
				</div>
			</div>
		</header>
	);
}
