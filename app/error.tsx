'use client';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="flex flex-col gap-3 p-6 min-h-screen items-center justify-center">
			<h1 className="text-3xl font-medium">Something went wrong.</h1>
			<button
				className="text-white flex flex-row bg-wjo px-3 py-1.5 rounded-full items-center gap-1.5"
				onClick={() => reset()}
			>
				<span>Try again</span>
			</button>
			{error.digest && (
				<span className="font-mono text-neutral-500 text-sm">
					Error digest {error.digest}
				</span>
			)}
		</div>
	);
}
