import { ReactNode } from 'react';
//import { StrapiImage, StrapiMedia, StrapiVideo, Upload } from '@/components/strapi-image';
import Image from 'next/image';
import image from "../logo_2.png"
type PageHeaderProps = {
	image: Upload;
	children?: ReactNode;
};

export function PageHeader({ children, image}: PageHeaderProps) {
	return (
		<div className="h-[70svh] relative flex flex-col items-center justify-center p-6 w-full">
			{children}
			<div className="w-full h-full absolute inset-0 -z-10 overflow-hidden">
				<Image
				src={image}
				alt="test"
				objectFit="cover"
				fill={true}
				/>

				{/*<div className="inset-0 absolute w-full h-full bg-wjo-dark mix-blend-color" />
				<div className="inset-0 absolute w-full h-full bg-wjo-dark/50" />*/}
			</div>
			<svg
				className="w-full h-6 md:h-12 absolute -bottom-px fill-neutral-50"
				preserveAspectRatio="none"
				viewBox="0 0 1920 50"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M1920 50.0002L3.05176e-05 50.0001L3.48887e-05 9.15477e-05C3.48887e-05 9.15477e-05 482 48.0001 960 48.0002C1438 48.0002 1920 0.000259399 1920 0.000259399L1920 50.0002Z" />
			</svg>
		</div>
	);
}
