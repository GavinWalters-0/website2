import './globals.css';
import './font.css';
import type { Metadata } from 'next';
import Script from 'next/script'


export const metadata: Metadata = {
	title: "W.J. O'Neil",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-neutral-50 text-neutral-900 flex flex-col font-knile min-h-screen max-w-screen overflow-x-hidden">
				{children}
			</body>
		</html>
	);
}
