import React, { useMemo, useState } from 'react';
import { OrderItem } from '@/store/useOrderStore';
import numeral from 'numeral';
import { Pencil, Trash2 } from 'lucide-react';
import clsx from 'clsx';

type CartItemProps = {
	itemNo: number;
	cartItem: OrderItem;
	onDelete: () => void
	onEdit: () => void
};

const CartItem: React.FC<CartItemProps> = ({ cartItem, itemNo, onEdit, onDelete }) => {
	const { item, qty, note } = cartItem;
	const [hovered, setHovered] = useState(false);

	const totalPrice = useMemo(() => {
		return item.price * qty;
	}, [qty, item.price]);

	return (
		<div
			className='relative w-full overflow-hidden rounded-sm transition-all'
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{/* Cart Item Content */}
			<div
				className={clsx(
					'relative bg-neutral-900 px-3 py-3 flex items-center justify-between transition-transform duration-300 ease-in-out'
				)}
			>
				<div className='flex items-center gap-2'>
					<span className='rounded-sm bg-neutral-800 w-3 h-3 pt-[2px] flex items-center justify-center text-[8px] text-gray-400 shrink-0'>
						{itemNo}
					</span>

					<div className='flex-grow min-w-0'>
						<p className='text-sm'>{item.name}</p>
						{note && (
							<p className='text-[10px] text-gray-500'>{note}</p>
						)}
					</div>
				</div>

				<div className='flex gap-2'>
					<p className='text-sm text-gray-500'>x{qty}</p>
					<p className='text-sm  w-17 text-right'>
						{numeral(totalPrice).divide(100).format('0,000.00')}
					</p>
				</div>
			</div>

			{/* Slide-down actions */}
			<div
				className={clsx(
					'flex transition-all duration-300 ease-in-out ',
					hovered ? 'h-10 bg-neutral-800' : 'h-0'
				)}
			>
				<button 
					type='button'
					onClick={onEdit}
					className='flex-1 hover:bg-neutral-900/50 flex items-center justify-center text-white text-sm font-medium cursor-pointer gap-2'>
					<Pencil size={14} />
					<span>Edit</span>
				</button>
				<button 
					type='button'
					onClick={onDelete}
					className='flex-1 hover:bg-neutral-900/50 flex items-center justify-center text-white text-sm font-medium cursor-pointer gap-2'>
					<Trash2 size={14} />
					<span>Delete</span>
				</button>
			</div>
		</div>
	);
};

export default CartItem;
