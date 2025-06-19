'use client';

import { CSSProperties, useState } from 'react';
import { StrapiImage, Upload } from './strapi-image';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

export default function Carousel({
	objectFit = 'contain',
	images,
	className,
}: {
	objectFit?: CSSProperties['objectFit'];
	images: Upload[];
	className?: string;
}) {
	const [index, setIndex] = useState(0);

	if (images.length < 1) {
		// TODO: Something here other than a fragment
		return <></>;
	}

	return (
		<div className={`relative flex flex-row overflow-hidden ${className}`}>
			{images.length > 1 && (
				<button
					onClick={() => {
						setIndex((i) => (i <= 0 ? images.length - 1 : i - 1));
					}}
					className="absolute top-1/2 -translate-y-1/2 left-1 z-10 text-white p-0.5 text-sm md:w-7 md:h-7 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center"
				>
					<ArrowLeftIcon />
				</button>
			)}
			{images.map((img, i) => (
				<div
					key={i}
					className="w-full h-full absolute shrink-0 grow-0 transition-transform duration-200 inset-0"
					style={{
						transform: `translateX(${(i - index) * 100}%)`,
					}}
				>
					{img && (
						<StrapiImage
							style={{
								objectFit,
							}}
							fill
							image={img}
						/>
					)}
				</div>
			))}
			{images.length > 1 && (
				<button
					onClick={() => {
						setIndex((i) => (i >= images.length - 1 ? 0 : i + 1));
					}}
					className="absolute top-1/2 -translate-y-1/2 right-1 z-10 text-white p-0.5 text-sm md:w-7 md:h-7 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center"
				>
					<ArrowRightIcon />
				</button>
			)}
			{images.length > 1 && (
				<div className="text-xs font-white px-1.5 absolute bottom-1 bg-black/50 text-white rounded-full tabular-nums font-semibold left-1/2 -translate-x-1/2">
					{index + 1} of {images.length}
				</div>
			)}
		</div>
	);
}
