import { Edit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

type RowActionsType = {
	id: number | string;
	onDelete?: (id: number | string) => void;
};

const RowActions: React.FC<RowActionsType> = ({ id, onDelete }) => {
	const router = useRouter();

	const editHref = useMemo(() => `/inventory/categories/${id}/edit`, [id])

	const handleDelete = async () => {
		if (!confirm('Delete this record?')) return;

		if (onDelete) {
		  await onDelete(id);
		} else {
		  await fetch(`/api/categories/${id}`, { method: 'DELETE' });
		  router.refresh();
		}
	};

	return (
		<div className='flex justify-end gap-1'>
			<button
				type='button'
				onClick={() => router.push(editHref)}
				className='inline-flex h-8 w-8 items-center justify-center rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'
				aria-label='Edit'
				title='Edit'
			>
				<Edit className='h-4 w-4' />
			</button>

			<button
				type='button'
				onClick={handleDelete}
				className='inline-flex h-8 w-8 items-center justify-center rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 text-red-800'
				aria-label='Delete'
				title='Delete'
			>
				<Trash2 className='h-4 w-4' />
			</button>
		</div>
	);
};

export default RowActions;
