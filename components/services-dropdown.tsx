'use client';

import { FragmentType, graphql, useFragment } from '@/gql';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import { ReactNode, useMemo } from 'react';
import { useFloating } from '@floating-ui/react-dom';
import NavLink from './nav-link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export const ServicesDropdown_fragment = graphql(`
	fragment ServicesDropdown_query on Query {
		servicePages {
			documentId
			name
			url
		}
	}
`);

type ServicesDropdownProps = {
	children?: ReactNode;
	data: FragmentType<typeof ServicesDropdown_fragment>;
};

export function ServicesDropdown(props: ServicesDropdownProps) {
	const pathname = usePathname();
	const active = useMemo(() => pathname.startsWith('/services'), [pathname]);
	const data = useFragment(ServicesDropdown_fragment, props.data);
		const servicePages = [
		{
			documentId:"Construction",
			url:"/construction",
			name:"Construction"
		},
		{
			documentId:"Controls",
			url:"/controls",
			name:"Controls"
		},
		{
			documentId:"Sheet Metal",
			url:"/sheet_metal",
			name:"Sheet Metal"
		},
		{
			documentId:"Service",
			url:"/service",
			name:"Service"
		}

	]
	const { refs, floatingStyles } = useFloating();

	return (
		<NavigationMenu.Item value="services">
			<NavigationMenu.Trigger
				ref={refs.setReference}
				className={clsx(
					'flex flex-row gap-1.5 items-center hover:bg-white/10 pl-3 pr-1.5 py-1 rounded-md',
					{
						'text-wjo': active,
					}
				)}
			>
				{props.children}
			</NavigationMenu.Trigger>
			<NavigationMenu.Content
				ref={refs.setFloating}
				style={floatingStyles}
				className="bg-white p-3 rounded-xl border-neutral-100 shadow-xl text-neutral-900 max-w-xs w-full flex flex-col gap-px font-medium z-50 mt-1.5"
			>
				{servicePages.map(
					(p) =>
						p && (
							<NavLink
								key={p.documentId}
								href={`/services/${p.url}`}
								passHref
								legacyBehavior
								className="w-full flex"
							>
								<NavigationMenu.Link className="p-1.5 rounded-md hover:bg-neutral-100 w-full items-center flex">
									{p.name}
								</NavigationMenu.Link>
							</NavLink>
						)
				)}
			</NavigationMenu.Content>
		</NavigationMenu.Item>
	);
}

export function NavList({ children }: { children?: ReactNode }) {
	return (
		<NavigationMenu.List className="flex flex-row items-center justify-center h-full text-inherit">
			{children}
			<NavigationMenu.Indicator
				className="flex flex-row items-center justify-center"
				id="test"
			>
				<div className="relative top-full h-3 w-3 rotate-45 rounded-tl-sm bg-white block" />
			</NavigationMenu.Indicator>
		</NavigationMenu.List>
	);
}
