'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	ComponentPropsWithRef,
	ComponentPropsWithoutRef,
	ReactNode,
	useMemo,
} from 'react';

export default function NavLink({
	href,
	exact,
	children,
	className,
	...props
}: ComponentPropsWithoutRef<typeof Link> & {
	exact?: boolean;
}) {
	const path = usePathname();
	const active = useMemo(
		() =>
			exact || exact === undefined
				? path === href.toString()
				: path.startsWith(href.toString()),
		[exact, path, href]
	);
	return (
		<Link
			className={clsx(className, {
				'text-wjo': active,
			})}
			href={href}
		>
			{children}
		</Link>
	);
}
