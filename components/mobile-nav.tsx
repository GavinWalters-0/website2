'use client';

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useState } from 'react';
import { NavigationProps, Navigation_queryFragment } from './nav';
import { useFragment } from '@/gql';
import { ServicesDropdown_fragment } from './services-dropdown';

export default function DesktopNav(props: NavigationProps) {
	const data = useFragment(Navigation_queryFragment, props.data);
	const services = useFragment(ServicesDropdown_fragment, data);

	const [open, setOpen] = useState(false);

	return (
		<div className={'flex flex-row justify-end text-neutral-900'}>
			<button
				onClick={() => setOpen((o) => !o)}
				className="p-2.5 rounded-lg bg-wjo-dark/5"
			>
				{open ? <Cross1Icon /> : <HamburgerMenuIcon />}
				<span className="sr-only">
					{open ? 'Close navigation' : 'Open navigation'}
				</span>
			</button>
			{open && (
				<div className="inset-0 pt-24 fixed flex flex-col p-6 gap-6 -z-[1] bg-white">
					<div className="md:grid md:grid-cols-2 flex flex-col  items-start justify-start gap-0.5 text-lg">
						<Link
							className="px-4 py-2 bg-neutral-100 rounded-lg w-full"
							href="/"
						>
							Home
						</Link>
						<Link
							className="px-4 py-2 bg-neutral-100 rounded-lg w-full"
							href="/about"
						>
							About Us
						</Link>
					</div>
					<h2 className="text-lg font-semibold text-wjo border-b border-b-wjo-dim/25 py-1.5 mt-3">
						What We Do
					</h2>
					<div className="md:grid md:grid-cols-2 flex flex-col  items-start justify-start gap-0.5 text-lg border-b border-b-wjo-dim/25 pb-6">
						{services.servicePages?.map((p) => (
							<Link
								key={p?.documentId}
								className="px-4 py-2 bg-neutral-100 rounded-lg w-full"
								href={`/services/${p?.url}`}
							>
								{p?.name}
							</Link>
						))}
					</div>
					<div className="md:grid md:grid-cols-2 flex flex-col  items-start justify-start gap-0.5 text-lg">
						<Link
							className="px-4 py-2 bg-neutral-100 rounded-lg w-full"
							href="/projects"
						>
							Projects
						</Link>
						<Link
							className="px-4 py-2 bg-neutral-100 rounded-lg w-full"
							href="/contact"
						>
							Contact Us
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}
