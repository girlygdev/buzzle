'use client';

import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import { LinkNav, SideNavLinks } from '@/components/navigation/SideNavLinks';
import { ArrowBigLeftDash } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function InventoryLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();
	const path = usePathname() || '/';
	const params = useParams();

	// if with dynamic param
	const dynVals = new Set(
		Object.values(params)
			.flatMap((v) => (Array.isArray(v) ? v : [v]))
			.map(String)
	);

	const parts = path.split(/[?#]/)[0].split('/').filter(Boolean);
	const segments = parts.filter((p) => !dynVals.has(decodeURIComponent(p)));

	const crumbs = segments.map((seg, idx) => {
		const href = '/' + segments.slice(0, idx + 1).join('/');
		const raw = decodeURIComponent(seg);
		const label = toTitle(raw);
		const isLast = idx === segments.length - 1;
		return { href, label, isLast };
	});

	const trail = findTrail(SideNavLinks, path);
	const bestMatch = trail[trail.length - 1] ?? {};

	return (
		<div className='p-5'>
			<div className='flex justify-between'>
				<div className=''>
					<p className='text-2xl'>{bestMatch?.name ?? ''}</p>
					<Breadcrumbs crumbs={crumbs} />
				</div>

				{bestMatch?.href !== path && (
					<button
						onClick={() => router.back()}
						className='flex font-semibold text-gray-500 text-lg gap-1 items-center hover:text-gray-200 cursor-pointer'
					>
						<ArrowBigLeftDash />
						<span>Back</span>
					</button>
				)}
			</div>

			<div className='border-b border-neutral-800 w-full my-5 h-1' />

			{children}
		</div>
	);
}

function toTitle(s: string) {
	return s.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function isPrefix(path: string, href: string) {
	const clean = (s: string) => s.replace(/\/+$/, '');
	const p = clean(path);
	const h = clean(href);
	return p === h || p.startsWith(h + '/');
}

function findTrail(nodes: LinkNav[], path: string): LinkNav[] {
	let best: LinkNav[] = [];
	for (const n of nodes) {
		if (!isPrefix(path, n.href)) continue;
		const childTrail = n.subMenu ? findTrail(n.subMenu, path) : [];
		const candidate = [n, ...childTrail];
		if (candidate.length > best.length) best = candidate;
	}
	return best;
}
