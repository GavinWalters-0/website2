import {
	StrapiImage,
	StrapiMedia,
	StrapiVideo,
} from '@/components/strapi-image';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon, ChevronDownIcon } from '@radix-ui/react-icons';
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
		<header className="w-screen h-screen flex flex-col relative items-center justify-center overflow-hidden">
			<div className="w-full h-full absolute inset-0 p-12">
			<video src="wjo_hero_video_a0c1348607.mp4" autoPlay loop muted className="object-cover min-h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute"/>
			</div>
			<div className='h-30 absolute inset-x-0 bottom-0 w-full'>
				<div className='card1 w-full h-full bg-blac pt-5' >
					<GlideComponent/>
				</div>
			</div>
		</header>
	);
}
