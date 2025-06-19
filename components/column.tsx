import { ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';

export default function Column({
	className,
	...props
}: ComponentPropsWithoutRef<'div'>) {
	return (
		<div
			className={clsx(
				'flex flex-col gap-16 max-w-8xl py-15 mx-[15rem] grow',
				className
			)}
			{...props}
		/>
	);
}
