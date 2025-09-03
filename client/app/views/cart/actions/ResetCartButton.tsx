import { useOrderStore } from '@/app/store/useOrderStore';
import clsx from 'clsx';
import { X } from 'lucide-react';
import React from 'react';
import { useShallow } from 'zustand/shallow';

const ResetCartButton = () => {
	const { reset, hasItems } = useOrderStore(
		useShallow((s) => ({
			reset: s.reset,
			hasItems: (s.order?.items?.length ?? 0) > 0
		}))
	);

	return (
		<button
			type='button'
			onClick={reset}
			disabled={!hasItems}
			className={clsx(
				'flex gap-1 items-center justify-center border rounded-sm p-1 pt-0 transition-all ease-in-out',
				hasItems && 'cursor-pointer hover:bg-white hover:text-gray-900',
			)}
		>
			<X size={16} className='text-current mt-1.5' />
			<span className='text-xs uppercase mt-2'>Reset</span>
		</button>
	);
};

export default ResetCartButton;
