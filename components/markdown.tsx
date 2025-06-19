import { ComponentPropsWithoutRef } from 'react';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

export default async function Markdown({
	markdown,
	className,
	...props
}: Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
	markdown?: string | null;
}) {
	const __html = String(
		await unified()
			.use(remarkParse)
			.use(remarkRehype)
			.use(rehypeSanitize)
			.use(rehypeStringify)
			.process(markdown ?? '')
	);

	return (
		<div
			className={`w-full md:prose prose-sm prose-ul:list-disc prose-neutral max-w-none md:max-w-none${
				typeof className !== undefined ? ' ' + className : ''
			}`}
			dangerouslySetInnerHTML={{ __html }}
			{...props}
		/>
	);
}
