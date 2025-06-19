import { ChevronDownIcon } from '@radix-ui/react-icons';
import NavLink from './nav-link';
import { NavList, ServicesDropdown } from './services-dropdown';
import { NavigationProps, Navigation_queryFragment } from './nav';
import { useFragment } from '@/gql';

export default function DesktopNav(props: NavigationProps) {
	const data = useFragment(Navigation_queryFragment, props.data);

	return (
		<NavList>
			<li>
				<NavLink className="px-3 py-1.5" href="/about">
					About Us
				</NavLink>
			</li>
			<ServicesDropdown data={data}>
				What We Do
				<ChevronDownIcon />
			</ServicesDropdown>
			<li>
				<NavLink className="px-3 py-1.5" exact={false} href="/projects">
					Projects
				</NavLink>
			</li>
			<li>
				<NavLink className="px-3 py-1.5" href="/contact">
					Contact Us
				</NavLink>
			</li>
		</NavList>
	);
}
