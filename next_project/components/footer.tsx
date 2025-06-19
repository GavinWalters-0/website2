import { FragmentType, graphql, useFragment } from '@/gql';
import { StrapiImage } from '@/components/strapi-image';
import logo from "../public/wjo_white_small_08953aa280.png"
import Link from 'next/link';
import Image from 'next/image';

const Footer_queryFragment = graphql(`
	fragment Footer_query on Query {
		homepage {
			logo {
				...Upload
			}
		}
		servicePages {
			documentId
			name
			url
		}
		partners {
			documentId
			name
			link
		}
	}
`);

type FooterProps = {
	data: FragmentType<typeof Footer_queryFragment>;
};

export function Footer(props: FooterProps) {
	//const data = useFragment(Footer_queryFragment, props.data);

	//const servicePages = data.servicePages ?? [];
	const servicePages = [
		{
			documentId:"Construction",
			url:"/",
			name:"Construction"
		},
		{
			documentId:"Controls",
			url:"/",
			name:"Controls"
		},
		{
			documentId:"Sheet Metal",
			url:"/",
			name:"Sheet Metal"
		}

	]
	//const logo = data.homepage?.logo;
	//const partners = data.partners ?? [];

	return (
		<footer className="mt-auto w-screen">
			<svg
				className="w-full h-6 md:h-12"
				preserveAspectRatio="none"
				viewBox="0 0 1920 50"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1920 50.0002L3.05176e-05 50.0001L3.48887e-05 9.15477e-05C3.48887e-05 9.15477e-05 482 48.0001 960 48.0002C1438 48.0002 1920 0.000259399 1920 0.000259399L1920 50.0002Z"
					fill="#007244"
				/>
			</svg>

			<div className="flex flex-col items-center text-white bg-wjo">
				<div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 max-w-6xl w-full px-6 pt-12 pb-6 gap-x-2 gap-y-8">
					<div className="">
						<Image
								width={208}
								alt="logo"
								className="w-52 h-auto"
								src={logo}
						/>
					</div>
					<ul className="flex flex-col">
						<li>
							<Link href="/">Home</Link>
						</li>
						<li>
							<Link href="/about">About Us</Link>
						</li>
						<li>
							<Link href="/contact">Contact Us</Link>
						</li>
						<li>
							<Link href="/projects">Projects</Link>
						</li>
						<li>
							<Link href="https://www.linkedin.com/company/w.j.-o'neil-company/">
								Linkedin
							</Link>
						</li>
					</ul>
					<div className="flex flex-col gap-1.5 items-center">
						<h3 className="font-medium border-b-white/50 border-b">
							What We Do
						</h3>
						{servicePages.length > 0 && (
							<ul>
								{servicePages.map(
									(s) =>
										s && (
											<li key={s.documentId}>
												<Link
													href={`/services/${s.url}`}
												>
													{s.name}
												</Link>
											</li>
										)
								)}
							</ul>
						)}
					</div>
					{/* <div className="flex flex-col gap-1.5">
						<h3 className="font-medium border-b-white/50 border-b">
							Partners
						</h3>
						{/* {partners.length > 0 && (
							<ul>
								{partners.map(
									(s) =>
										s && (
											<li key={s.documentId}>
												<Link href={s.link ?? '#'}>
													{s.name}
												</Link>
											</li>
										)
								)}
							</ul>
						)} 
					</div> */}
				</div>
				<div className="max-w-6xl w-full p-6">
					<div className="grid grid-cols-4"></div>
					<div>© W.J. O’Neil Company</div>
					<div>Designed & Developed by Needlestack LLC.</div>
				</div>
			</div>
		</footer>
	);
}
