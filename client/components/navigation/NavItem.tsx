import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { LinkNav } from './SideNavLinks';

type NavItemProps = {
	item: LinkNav;
	path: string;
};

const NavItem: React.FC<NavItemProps> = ({ item, path }) => {
	const isActive = path === item.href || path.startsWith(item.href + '/');
	const [open, setOpen] = useState(isActive);

	// Keep submenu open when route changes into this section
	useEffect(() => {
		if (isActive) setOpen(true);
	}, [isActive]);

	const baseClass = 'block p-2 rounded-sm transition-colors ease-in-out';
	const activeClass = isActive ? 'bg-cyan-800' : 'hover:bg-cyan-900';

	if (!item.subMenu?.length) {
		return (
			<li>
				<Link href={item.href} className={clsx(baseClass, activeClass)}>
					{item.name}
				</Link>
			</li>
		);
	}

	return (
		<li>
			<button
				type='button'
				aria-expanded={open}
				aria-controls={`submenu-${item.href}`}
				onClick={() => setOpen((v) => !v)}
				className={clsx(
					baseClass,
					'w-full flex items-center justify-between hover:bg-cyan-900',
					isActive && ''
				)}
				title={item.name}
			>
				<span className='text-left'>{item.name}</span>
				<ChevronDown
					aria-hidden='true'
					className={clsx(
						'size-4 transition-transform duration-200',
						open && 'rotate-180'
					)}
				/>
			</button>

			<div
				id={`submenu-${item.href}`}
				className={clsx(
					'grid transition-all duration-300 ease-in-out',
					open
						? 'grid-rows-[1fr] opacity-100'
						: 'grid-rows-[0fr] opacity-0'
				)}
			>
				<div className='overflow-hidden'>
					<ul className='pl-5 mt-1 space-y-1'>
						{item.subMenu?.map((menu) => {
							const menuActive =
								path === menu.href ||
								path.startsWith(menu.href + '/');
							const menuActiveClass = menuActive
								? 'bg-cyan-800'
								: 'hover:bg-cyan-900';

							return (
								<li key={menu.href}>
									<Link
										href={menu.href}
										className={clsx(
											baseClass,
											menuActiveClass
										)}
									>
										{menu.name}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</li>
	);
};

export default NavItem;
