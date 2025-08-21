'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type LinkNav = {
	name: string;
	href: string;
};

const links: Array<LinkNav> = [
	{
		name: 'Dashboard',
		href: '/dashboard',
	},
	{
		name: 'New Order',
		href: '/orders',
	},
	{
		name: 'Menu',
		href: '/menu',
	},
	{
		name: 'Reports',
		href: '/reports',
	},
	{
		name: 'Settings',
		href: '/settings',
	},
];

const SideNav = () => {
	const path = usePathname();

	return (
		<div className='flex flex-col h-full'>
			<div className='flex items-center justify-center py-5'>
				<p className='text-white font-bold text-2xl'>BuzzlePOS</p>
			</div>

			<nav className='px-5 flex-grow flex flex-col justify-between'>
				<div className='flex flex-col flex-grow'>
					{links.map((link: LinkNav, key) => (
						<Link
							key={key}
							href={link.href}
							className={clsx(
								'hover:bg-neutral-900 py-2 px-2 rounded-sm cursor-pointer',
								{ 'bg-neutral-900': path === link.href }
							)}
						>
							{link.name}
						</Link>
					))}
				</div>

				<div className='py-5'>
					<form>
						<button className='bg-neutral-800 w-full py-2 rounded-sm hover:bg-neutral-900 cursor-pointer'>
							Sign Out
						</button>
					</form>
				</div>
			</nav>
		</div>
	);
};

export default SideNav;
