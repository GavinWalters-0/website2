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
			<NavRoot className="lg:absolute top-0 left-0 right-0 py-6 px-6 grid lg:grid-cols-[208px_1fr_208px] grid-cols-[208px_1fr] gap-1.5 items-center justify-center text-white z-50 fixed bg-white lg:bg-transparent">
				<div className="items-start flex">
					<Link className="block" href="/">
					<div className='absolute w-[14rem] h-12 card -z-10'/>
					<Image
						src={logo}	
						width={208}
						alt="logo"
						className="object-contain w-full h-full lg:block hidden pl-2 pt-3"
					/>
						{/* {mobileLogo && (
							<StrapiImage
								image={mobileLogo}
								width={208}
								className="object-contain w-full h-full lg:hidden block"
							/>
						)} */}
					</Link>
				</div>
				<div className='flex justify-center w-full h-full'>
					<div className='card w-2/3-full'>
						<NavLinks data={{}} />
					</div>
				</div>
				{/* <NavList>
					<li>
						<Link
							className="px-3 py-1.5 rounded-md hover:bg-white/10"
							href="/about"
						>
							About Us
						</Link>
					</li>
					<ServicesDropdown data={hero}>
						What We Do
						<ChevronDownIcon />
					</ServicesDropdown>
					<li>
						<Link
							className="px-3 py-1.5 rounded-md hover:bg-white/10"
							href="/projects"
						>
							Projects
						</Link>
					</li>
					<li>
						<Link
							className="px-3 py-1.5 rounded-md hover:bg-white/10"
							href="/contact"
						>
							Contact Us
						</Link>
					</li>
				</NavList> */}
			</NavRoot>
			<div className="w-full h-full absolute inset-0 -z-10 p-12">
				<video src="wjo_hero_video_a0c1348607.mp4" autoPlay={true} loop={true} className="object-cover min-h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute"/>
				<div>
					{/* {background && (
						// <StrapiImage
						// 	image={}
						// 	fill
						// 	className="object-cover"
						// />

						<StrapiMedia
							media={background}
							image={
								<StrapiImage
									image={background}
									fill
									className="object-cover"
								/>
							}
							video={
								<StrapiVideo
									video={background}
									autoPlay
									muted
									loop
									className="object-cover min-h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute"
								/>
							}
						/>
					)} */}
				</div>
				{/*<div className="inset-0 absolute w-full h-screen bg-wjo-dark mix-blend-color" />
				<div className="inset-0 absolute w-full h-screen bg-wjo-dark/50" />*/}
			</div>
			<div className="flex flex-col gap-4 items-center">
				{/*<div className="h-16 px-4 md:px-0 max-w-screen">
					{logo.data?.attributes && (
						<StrapiImage
							image={logo.data?.attributes}
							height={64}
							className="object-contain w-full h-full"
						/>
					)}
				</div>*/}
				{/* <span className="text-white text-lg">{subtitle}</span> */}
			</div>
		</header>
	);
}
