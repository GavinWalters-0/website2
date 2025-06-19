import { FragmentType, graphql, useFragment } from '@/gql';
import { StrapiImage } from './strapi-image';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { NavList, ServicesDropdown } from './services-dropdown';
import { NavRoot } from '@/components/nav-root';
import NavLink from './nav-link';
import NavLinks from './nav-links';
import logo from "../public/wjo_full_green_44d8dd0fac.png"
import Image from 'next/image';

export const Navigation_queryFragment = graphql(`
	fragment Navigation_query on Query {
		...ServicesDropdown_query
		navigation {
			logo {
				...Upload
			}
		}
	}
`);

export default function Navigation(props) {
	const data = useFragment(Navigation_queryFragment, props.data);

	//const nav = data.navigation;

	return (
		<NavRoot className="bg-neutral-50 text-neutral-900 p-6 lg:grid-cols-[208px_1fr_208px] grid-cols-[208px_1fr] grid w-screen border-b border-b-neutral-100 items-center lg:static sticky top-0 z-50">
			<Link href="/">
				<Image
				src={logo}
				alt="test"
				/>
			</Link>

			<NavLinks {...props} />
		</NavRoot>
	);
}
