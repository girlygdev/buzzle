'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import NavItem from './NavItem';
import { LinkNav, SideNavLinks } from './SideNavLinks';

const SideNav = () => {
	const path = usePathname();

	return (
		<div className='flex flex-col h-full'>
			<div className='flex items-center justify-center py-5'>
				<p className='text-white font-bold text-2xl'>BuzzlePOS</p>
			</div>

			<nav className='px-5 flex-grow flex flex-col justify-between'>
				<ul className='flex flex-col flex-grow space-y-2'>
					{SideNavLinks.map((item: LinkNav) => (
						<NavItem key={item.href} item={item} path={path} />
					))}
				</ul>

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
