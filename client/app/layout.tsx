import type { Metadata } from 'next';


import './globals.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

import SideNav from './views/navigation/SideNav';
import { geistMono, geistSans } from './styles/fonts';



export const metadata: Metadata = {
	title: 'Buzzle POS',
	description: 'Buzzle Cafe POS',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
					<div className='w-full flex-none md:w-64 hidden lg:block'>
						<SideNav />
					</div>
					<div className='flex-grow p-3 md:overflow-y-auto'>{children}</div>
				</div>
			</body>
		</html>
	);
}
