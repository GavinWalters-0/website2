'use client';

import { useRef, useState } from 'react';
import { PhoneIcon } from './phone';
import clsx from 'clsx';
import { Chat } from './new';
import ArrowUp from './arrow-up';
import Link from 'next/link';
import MaximizeSquare from './maximize-square';
//import { serviceRequestAction } from '@/app/service-request-action';

export function FormPopup() {
	const scrollContainer = useRef<HTMLDivElement>(null);
	const [collapsed, setCollapsed] = useState(true);

	return (
		<div className="fixed bottom-0 md:right-24 right-0 md:w-96 w-full flex flex-col bg-white rounded-t-lg shadow-lg z-50">
			<div className="flex flex-row justify-between bg-wjo text-white px-2.5 py-2.5 rounded-t-lg items-center">
				<div className="flex flex-row gap-1.5">
					<PhoneIcon />
					Service Request
				</div>
				<div className="flex flex-row gap-1 items-center">
					<Link className="md:p-0 p-2" href="/service-request">
						<MaximizeSquare />
					</Link>
					<button
						className="md:p-0 p-2"
						onClick={() => setCollapsed((c) => !c)}
					>
						<div
							className="data-[open=true]:rotate-180"
							data-open={!collapsed}
						>
							<ArrowUp />
						</div>
					</button>
				</div>
			</div>
			<div
				ref={scrollContainer}
				className={clsx(
					'transition-all duration-300 overflow-scroll relative box-border gap-3',
					{
						'md:h-[36rem] max-h-screen h-[calc(100vh_-_10rem)] ease-out':
							!collapsed,
						'h-0 ease-in': collapsed,
					}
				)}
			>
				<div className="p-3 flex flex-col gap-3">
					{/* <Chat
						restartStyle="top"
						onAdvance={() => {
							scrollContainer.current?.scrollIntoView(false);
						}}
						onSubmit={async (s, c) => {
							grecaptcha.enterprise.ready(async () => {
								const token =
									await grecaptcha.enterprise.execute(
										'6Lc-hCIqAAAAAIvuTEv2ITwP4kmsEn8WuICK3eic',
										{
											action: 'serviceRequestFormAction',
										}
									);
								//const action = serviceRequestAction.bind(
								//	undefined,
								//	{
								//		token,
								//		answers: s,
								//		creditForm: c,
								//	}
								//);
								//action();
							});
						}}
					/> */}
				</div>
			</div>
		</div>
	);
}
