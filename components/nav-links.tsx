'use client';

import { useState, useEffect } from 'react';
import MobileNav from './mobile-nav';
import DesktopNav from './desktop-nav';
import { NavigationProps } from './nav';
import useMobile from './useMobile';

export default function NavLinks({ data }: NavigationProps) {
	const mobile = useMobile();

	if (mobile) {
		return <MobileNav data={data} />;
	}

	return <DesktopNav data={data} />;
}
