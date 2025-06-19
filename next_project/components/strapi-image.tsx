import type { ImageProps } from 'next/image';
import Image from 'next/image';
import { FragmentType, graphql, useFragment } from '@/gql';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { UploadFragment } from '@/gql/graphql';

const Upload_fragment = graphql(`
	fragment Upload on UploadFile {
		alternativeText
		width
		height
		url
	}
`);

export type Upload = FragmentType<typeof Upload_fragment>;

export interface StrapiImageProps extends Omit<ImageProps, 'src' | 'alt'> {
	alt?: string;
	image: FragmentType<typeof Upload_fragment>;
};

export function isVideo(_url: string) {
	const url = new URL(_url);
	const file = url.pathname.split('/').slice(-1).at(0);
	return (
		typeof file !== 'undefined' && (
			file.endsWith('.mp4')
			|| file.endsWith('.webm')
			|| file.endsWith('.mov')
		)
	);
}

export function resolveStrapiMedia(url: string) {
	let src = '';
	if (url.startsWith('https:')) {
		src = url;
	} else {
		src = `http${process.env['NODE_ENV'] !== 'development' ? 's' : ''
			}://${process.env['NEXT_PUBLIC_STRAPI_HOSTNAME']}:${process.env['NEXT_PUBLIC_STRAPI_PORT']}${url}`;
	}

	return src;
}

type SizeProp = number | `${number}` | undefined;

export function calculateStrapiMediaSize(
	media: UploadFragment,
	width?: SizeProp,
	height?: SizeProp,
) {
	const { width: cmsWidth, height: cmsHeight } = media;

	let sizeProps = { width: cmsWidth, height: cmsHeight } as {
		width?: SizeProp;
		height?: SizeProp;
	};

	if (width && !height) {
		sizeProps.width = width;
		sizeProps.height =
			cmsWidth && cmsHeight
				? Math.round(Number(width) * (cmsHeight / cmsWidth))
				: undefined;
	} else if (height && !width) {
		sizeProps.height = height;
		sizeProps.width =
			cmsWidth && cmsHeight
				? Math.round(Number(height) * (cmsWidth / cmsHeight))
				: undefined;
	}

	return sizeProps;
}

export function StrapiImage({
	image,
	fill,
	width,
	height,
	...props
}: StrapiImageProps) {
	const img = useFragment(Upload_fragment, image);

	const { url, alternativeText, width: cmsWidth, height: cmsHeight } = img;

	if (!url) {
		return <></>;
	}

	// let src = '';
	// if (url.startsWith('https:')) {
	// 	src = url;
	// } else {
	// 	src = `http://${process.env['NEXT_PUBLIC_STRAPI_HOSTNAME']}:${process.env['NEXT_PUBLIC_STRAPI_PORT']}${url}`;
	// }

	// let sizeProps = { width: cmsWidth, height: cmsHeight } as {
	// 	width?: number | `${number}` | undefined;
	// 	height?: number | `${number}` | undefined;
	// };

	// if (width && !height) {
	// 	sizeProps.width = width;
	// 	sizeProps.height =
	// 		cmsWidth && cmsHeight
	// 			? Math.round(Number(width) * (cmsHeight / cmsWidth))
	// 			: undefined;
	// } else if (height && !width) {
	// 	sizeProps.height = height;
	// 	sizeProps.width =
	// 		cmsWidth && cmsHeight
	// 			? Math.round(Number(height) * (cmsWidth / cmsHeight))
	// 			: undefined;
	// }

	const src = resolveStrapiMedia(url);
	const alt = alternativeText ?? props.alt ?? '';
	const sizeProps = calculateStrapiMediaSize(img, width, height);

	return (
		<Image
			src={src}
			alt={alt}
			fill={fill}
			{...props}
			{...(!fill ? sizeProps : {})}
		/>
	);
}

export interface StrapiVideoProps extends ComponentPropsWithoutRef<'video'> {
	video: FragmentType<typeof Upload_fragment>;
	width?: SizeProp;
	height?: SizeProp;
}

export function StrapiVideo({
	width,
	height,
	video,
	...props
}: StrapiVideoProps) {
	const vid = useFragment(Upload_fragment, video);

	const { url } = vid;

	let src = resolveStrapiMedia(url);

	if (process.env['NODE_ENV'] === 'development') {
		src = src.replace('strapi', 'localhost');
	}

	// const alt = alternativeText ?? _alt ?? '';
	const sizeProps = calculateStrapiMediaSize(vid, width, height);

	return (
		<video {...props} {...sizeProps} src={src}>

		</video>
	)
}

export interface StrapiMediaProps {
	media: FragmentType<typeof Upload_fragment>;

	image?: ReactNode;
	video?: ReactNode;
}

export function StrapiMedia({
	media,
	video,
	image,
}: StrapiMediaProps) {
	const m = useFragment(Upload_fragment, media);
	const src = resolveStrapiMedia(m.url);

	if (isVideo(src)) {
		return video;
	} else {
		return image;
	}
}
