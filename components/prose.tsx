import { ComponentPropsWithoutRef } from 'react';

export function H1({ className: _, ...props }: ComponentPropsWithoutRef<'h1'>) {
	return (
		<h1
			className="font-medium text-2xl md:text-4xl text-white"
			{...props}
		/>
	);
}
export function H1_black({ className: _, ...props }: ComponentPropsWithoutRef<'h1'>) {
	return (
		<h1
			className="font-medium text-2xl md:text-4xl text-black"
			{...props}
		/>
	);
}
export function H2({ className: _, ...props }: ComponentPropsWithoutRef<'h2'>) {
	return (
		<h2
			className="font-semibold text-2xl md:text-4xl text-wjo"
			{...props}
		/>
	);
}

export function H3({ className: _, ...props }: ComponentPropsWithoutRef<'h3'>) {
	return <h3 className="font-semibold text-wjo-dim text-base" {...props} />;
}

export function P({ className: _, ...props }: ComponentPropsWithoutRef<'p'>) {
	return (
		<p
			className="text-base whitespace-pre-wrap text-neutral-900"
			{...props}
		/>
	);
}
