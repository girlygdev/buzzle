'use client';

import { categories } from '@/utils/data-placeholder';
import { Category } from '@/utils/definition';
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import { ColorBadge } from './_components/table/cells';
import { DynamicLucideIcon } from '@/components/ui/DynamicLucideIcon';
import RowActions from './_components/table/rowActions';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

const CategoriesPage = () => {
	const router = useRouter();
	const [data, setData] = useState<Category[]>(categories);

	const onDelete = (id: string | number) => {
		setData(data.filter((d) => d.id !== id));
	};

	const columns: ColumnDef<Category>[] = useMemo(
		() => [
			{
				header: 'Title',
				accessorKey: 'name',
			},
			{
				header: 'Color',
				accessorKey: 'color',
				cell: ({ getValue }) => {
					const bg = String(getValue());
					return <ColorBadge bgClass={bg} />;
				},
			},
			{
				header: 'Icon',
				accessorKey: 'icon',
				cell: ({ getValue }) => {
					const name = String(getValue());
					return <DynamicLucideIcon iconName={name} color='white' />;
				},
			},
			{
				id: 'actions',
				header: () => <span className='block text-right'>Actions</span>,
				enableSorting: false,
				enableHiding: false,
				cell: ({ row }) => (
					<RowActions id={row.original.id} onDelete={onDelete} />
				),
			},
		],
		[]
	);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className='w-full'>
			<div className="flex justify-end my-5">
				<Button className='w-40' onClick={() => router.push('/inventory/categories/add')}>Add Category</Button>
			</div>

			<div className='rounded-sm border border-neutral-900'>
				<table className='w-full text-sm'>
					<thead className='bg-neutral-900'>
						<tr>
							{table.getHeaderGroups().map((hg) =>
								hg.headers.map((h) => (
									<th
										key={h.id}
										className='px-3 py-2 text-left font-medium leading-none'
									>
										{h.isPlaceholder
											? null
											: flexRender(
													h.column.columnDef.header,
													h.getContext()
											  )}
									</th>
								))
							)}
						</tr>
					</thead>
					<tbody>
						{table.getRowModel().rows.map((r) => (
							<tr
								key={r.id}
								className='border-t border-neutral-900'
							>
								{r.getVisibleCells().map((c) => (
									<td key={c.id} className='px-3 py-2'>
										{flexRender(
											c.column.columnDef.cell,
											c.getContext()
										)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default CategoriesPage;
