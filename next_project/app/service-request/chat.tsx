'use client';

import { Chat } from '@/components/form/new';
import { serviceRequestAction } from '../service-request-action';
import { useRef } from 'react';

export interface ServiceRequestChatProps {
	existingCustomer?: boolean;
}

export function ServiceRequestChat(props: ServiceRequestChatProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	return (
		<div
			ref={containerRef}
			className="overflow-scroll max-w-3xl mx-auto w-full bg-white rounded-xl h-full flex flex-col gap-1 p-3"
		>
			<Chat
				skipExistingCustomer={props.existingCustomer}
				onAdvance={() => containerRef.current?.scrollIntoView(false)}
				onSubmit={async (f, c) => {
					console.log(f, c);
					grecaptcha.enterprise.ready(async () => {
						const token = await grecaptcha.enterprise.execute(
							'6Lc-hCIqAAAAAIvuTEv2ITwP4kmsEn8WuICK3eic',
							{
								action: 'serviceRequestFormAction',
							}
						);
						const action = serviceRequestAction.bind(undefined, {
							token,
							answers: f,
							creditForm: c,
						});
						action();
					});
					// const action = serviceRequestAction.bind(undefined, {
					// 	token: '',
					// 	answers: f,
					// });
					// action();
				}}
			/>
		</div>
	);
}
