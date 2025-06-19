'use client';

import { NavigationMenu } from '@radix-ui/react-navigation-menu';
import { ComponentPropsWithoutRef } from 'react';

export function NavRoot(
	props: ComponentPropsWithoutRef<typeof NavigationMenu>
) {
	return <NavigationMenu {...props} />;
}
