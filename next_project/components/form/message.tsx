import clsx from 'clsx';
import { ComponentPropsWithoutRef, ElementType } from 'react';

export type MessageProps<T extends ElementType> =
	ComponentPropsWithoutRef<T> & {
		variant?: 'system' | 'user' | 'option';
	};

export function Message<T extends ElementType>({
	className,
	...props
}: MessageProps<T>) {
	const Tag = props.variant === 'option' ? 'button' : 'div';
	return (
		<Tag
			className={clsx(
				'py-1.5 px-3 rounded-t-lg inline-block w-auto',
				{
					'rounded-br-lg mr-auto bg-wjo text-white':
						props.variant === 'system',
					'rounded-bl-lg ml-auto bg-neutral-100':
						props.variant !== 'system',
					'hover:bg-neutral-200': props.variant === 'option',
					'text-right ml-auto':
						props.variant === 'user' || props.variant === 'option',
				},
				className
			)}
			{...props}
		/>
	);
}
