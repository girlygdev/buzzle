'use client';
import React from 'react';
import { SideNavLinks } from './SideNavLinks';
import Link from 'next/link';

type Segments = {
	href: string;
	label: string;
	isLast: boolean;
};

type BreadcrumbsProps = {
	crumbs: Segments[];
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ crumbs = [] }) => {
	return (
		<nav aria-label='Breadcrumb'>
			<ol className='flex items-center gap-2 text-gray-500 text-sm'>
				{crumbs.map((crumb, i) => {
					const { href, label, isLast } = crumb;
					const isLink = SideNavLinks.find(
						(link) => link.href == href
					)?.subMenu?.length
						? false
						: true;

					return (
						<li key={href} className='flex items-center gap-2'>
							{i > 0 && <span aria-hidden='true'>/</span>}

							{isLast ? (
								<span
									aria-current='page'
									className='text-gray-200 font-medium'
								>
									{label}
								</span>
							) : isLink ? (
								<Link
									href={href}
									className='hover:text-gray-200'
								>
									{label}
								</Link>
							) : (
								<span>{label}</span>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
};

export default Breadcrumbs;
