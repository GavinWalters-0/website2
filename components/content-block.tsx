import Markdown from '@/components/markdown';
import { H2, H3, P } from '@/components/prose';
import { StrapiImage } from '@/components/strapi-image';
import { FragmentType, graphql, useFragment } from '@/gql';
import styles from './content-block.module.css';

const contentBlock = graphql(`
	fragment ContentBlock on ComponentContentContentBlock {
		id
		heading
		subheading
		image {
			...Upload
		}
		image_fit
		image_side
		two_column_lists
		content
	}
`);

// type ContentBlockProps = {
// 	data: FragmentType<typeof contentBlock>;
// };
export function ContentBlock(props: ContentBlockProps) {
	//const data = useFragment(contentBlock, props.data);
	//console.log(data);
	// const data = {
	// 	image_side: '',
	// 	image_fit: 'cover',
	// 	image: undefined,
	// 	heading:'Built On Customer Satisfaction',
	// 	subheading:'',
	// 	content:'At The W.J. O’Neil Company, our focus is simple: putting our customers first. Every part of our organization — from our talented team and responsive service department to our state-of-the-art fabrication shop — operates with one purpose in mind: surpassing client expectations. This principle has been at the heart of our mission since our founding over 41 years ago, and today, that dedication is stronger than ever.True leadership demands a clear vision and teamwork, and at WJO, we excel at both. Our unwavering commitment to client satisfaction is evident in the trust of our past clients, the experiences of those we currently serve, and the opportunity to provide outstanding service to future partners.',
	// 	two_column_lists: ''
	// };
	const data = props.data
	return (
		<div
			className={`flex items-center flex-col gap-8 ${
				data.image_side === 'left'
					? 'md:flex-row'
					: 'md:flex-row-reverse'
			}`}
		>
			{typeof data.image !== 'undefined' && data.image !== null && (
				<div className="md:w-80 w-full basis-80 h-80 md:max-h-72 shrink-0 grow-0 relative overflow-hidden rounded-xl">
					{data.image && (
						<StrapiImage
							width={320}
							height={288}
							className={`w-full h-full ${
								data.image_fit === 'cover'
									? 'object-cover'
									: 'object-contain'
							}`}
							image={data.image}
						/>
					)}
				</div>
			)}
			<div className="flex flex-col gap-4 w-full">
				<div className="flex flex-col-reverse">
					<H2>{data.heading}</H2>
					{data.subheading && <H3>{data.subheading}</H3>}
				</div>
				<Markdown
					className={
						data.two_column_lists ? styles['two-column'] : ''
					}
					markdown={data.content}
				/>
			</div>
		</div>
	);
}
