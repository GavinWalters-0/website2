'use client';

import { FragmentType, graphql, useFragment } from '@/gql';
import { H2, H3, P } from '../components/prose';
import * as Tabs from '@radix-ui/react-tabs';
import Image from 'next/image';

import buildingIcon from './building-icon.svg';
import phoneIcon from './phone-icon.svg';
import phoneCallingIcon from './phone-calling-icon.svg';
import emailIcon from './email-icon.svg';

import Link from 'next/link';
import { Metadata } from 'next';

const ContactData_fragment = graphql(`
	fragment Contact on Homepage {
		office_location {
			id
			name
			google_maps_iframe_url
			address
			phone
			emergency_phone
			email
			email_subject
			email_body
		}
	}
`);

function charCode(c: string) {
	return c.charCodeAt(0);
}

const char0 = charCode('0');
const char9 = charCode('9');

function formatPhoneNumber(number: string) {
	return (
		'+1' +
		number
			.split('')
			.filter((c) => ((c) => c >= char0 && c <= char9)(charCode(c)))
			.join('')
	);
}

function formatMailto(
	email: string,
	subject?: string | null,
	body?: string | null
) {
	const params = new URLSearchParams();
	if (subject) {
		params.set('subject', subject);
	}
	if (body) {
		params.set('body', body);
	}

	const encodedParams = params.toString();

	if (encodedParams !== '') {
		return `mailto:${email}?${encodedParams}`;
	}

	return `mailto:${email}`;
}

export function Contact(props: {
	data: FragmentType<typeof ContactData_fragment>;
}) {
	const data = useFragment(ContactData_fragment, props.data);
	return (
		<Tabs.Root
			defaultValue={data.office_location.at(0)?.id}
			className="flex md:flex-row flex-col"
		>
			<div className="flex flex-col gap-6 md:basis-1/2 md:w-1/2">
				<H2>Contact Us</H2>
				<P>
					With corporate offices in Livonia, Michigan, a regional
					office in Chattanooga, WJO specializes in solving complex,
					highly technical projects with outstanding design-build
					services.
				</P>
				<Tabs.List className="flex flex-row gap-2">
					{data.office_location.map(
						(office) =>
							office && (
								<Tabs.Trigger
									key={office.id}
									className="radix-active:bg-wjo radix-active:text-white bg-neutral-200 text-neutral-800 px-3 py-1 rounded-md leading-4 font-semibold text-sm"
									value={office.id}
								>
									{office.name} Office
								</Tabs.Trigger>
							)
					)}
				</Tabs.List>
				<div className="md:pb-0 pb-6">
					{data.office_location.map(
						(office) =>
							office && (
								<Tabs.Content
									className="flex flex-col gap-6"
									key={office.id}
									value={office.id}
								>
									<div className="flex flex-row gap-1.5">
										<Image
											alt=""
											className="w-6 h-6 basis-6 grow-0 shrink-0"
											width={24}
											height={24}
											src={buildingIcon}
										/>
										<div className="flex flex-col">
											<h3 className="text-wjo font-semibold">
												Office Address
											</h3>
											<span className="whitespace-pre">
												{office.address}
											</span>
										</div>
									</div>
									<Link
										href={`tel:${formatPhoneNumber(
											office.phone
										)}`}
										className="flex flex-row gap-1.5 group"
									>
										<Image
											alt=""
											className="w-6 h-6 basis-6 grow-0 shrink-0"
											width={24}
											height={24}
											src={phoneIcon}
										/>
										<div className="flex flex-col">
											<h3 className="text-wjo font-semibold">
												Main Phone
											</h3>
											<span className="group-hover:text-wjo">
												{office.phone}
											</span>
										</div>
									</Link>
									<Link
										href={`tel:${formatPhoneNumber(
											office.emergency_phone
										)}`}
										className="flex flex-row gap-1.5 group"
									>
										<Image
											alt=""
											className="w-6 h-6 basis-6 grow-0 shrink-0"
											width={24}
											height={24}
											src={phoneCallingIcon}
										/>
										<div className="flex flex-col">
											<h3 className="text-wjo font-semibold">
												24/7 Service Phone
											</h3>
											<span className="group-hover:text-wjo">
												{office.emergency_phone}
											</span>
										</div>
									</Link>
									{office.email && (
										<Link
											href={formatMailto(
												office.email,
												office.email_subject,
												office.email_body
											)}
											className="flex flex-row gap-1.5 group"
										>
											<Image
												alt=""
												className="w-6 h-6 basis-6 grow-0 shrink-0"
												width={24}
												height={24}
												src={emailIcon}
											/>
											<div className="flex flex-col">
												<h3 className="text-wjo font-semibold">
													Email
												</h3>
												<span className="group-hover:text-wjo">
													{office.email}
												</span>
											</div>
										</Link>
									)}
								</Tabs.Content>
							)
					)}
				</div>
			</div>
			<div className="md:basis-1/2 md:w-1/2">
				{data.office_location.map(
					(office) =>
						office && (
							<Tabs.Content
								key={office.id}
								value={office.id}
								className="w-full h-72 bg-neutral-200 rounded-xl overflow-hidden"
							>
								<iframe
									src={office.google_maps_iframe_url}
									className="w-full h-full"
								></iframe>
							</Tabs.Content>
						)
				)}
			</div>
		</Tabs.Root>
	);
}
