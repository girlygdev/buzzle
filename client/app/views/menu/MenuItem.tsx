import { Category, Item } from '@/app/utils/definition';
import React, { useMemo } from 'react';
import { Minus, Plus } from 'lucide-react';
import { formatPrice } from '@/app/utils/format';
import { OrderItem, useOrderStore } from '@/app/store/useOrderStore';
import clsx from 'clsx';

type MenuItemProps = {
	category: Category;
	item: Item;
};

const MenuItem: React.FC<MenuItemProps> = ({ item, category }) => {
	const { addOrIncrementItem, decrementItemQty, order } = useOrderStore(
		(state) => state
	);

	const isExisting = useMemo(() => {
		return order?.items.find((oi: OrderItem) => oi.item.id === item.id)
			? true
			: false;
	}, [order?.items, item.id]);

	const currentQty = useMemo(() => {
		return (
			order?.items.find((oi: OrderItem) => oi.item.id === item.id)?.qty ??
			0
		);
	}, [order?.items, item.id]);

	const onAddItem = () => addOrIncrementItem(item);
	const onDeductItem = () => decrementItemQty(item);

	return (
		<div
			className={clsx(
				'relative rounded-sm h-28 transition-all ease-in-out bg-neutral-900'
			)}
		>
			<div
				className={clsx(
					`${category.color} absolute left-0 top-0 h-full  transition-all ease-in-out `,
					isExisting ? 'w-full rounded-sm' : 'w-1 rounded-tl-sm rounded-bl-sm'
				)}
			/>
			<div className='absolute w-full h-full p-2 flex flex-col justify-between'>
				<div className='leading-none text-left'>
					<p
						className={clsx(
							'font-bold text-base',
							isExisting ? 'text-gray-900' : 'text-white'
						)}
					>
						{item.name}
					</p>
					<p
						className={clsx(
							'font-bold text-sm',
							isExisting ? 'text-gray-800' : 'text-gray-500'
						)}
					>
						{formatPrice(item.price)}
					</p>
				</div>

				<div className='flex justify-end items-center gap-2'>
					<button
						onClick={onDeductItem}
						className={clsx(
							'p-1 border rounded-sm cursor-pointer transition-all ease-in-out hover:bg-neutral-700',
							isExisting ? 'text-gray-900' : ''
						)}
					>
						<Minus size={16} />
					</button>
					<p
						className={clsx(
							'text-2xl w-[20px] text-center',
							isExisting ? 'text-gray-900' : ''
						)}
					>
						{currentQty}
					</p>
					<button
						onClick={onAddItem}
						className={clsx(
							'p-1 border rounded-sm cursor-pointer transition-all ease-in-out hover:bg-neutral-700',
							isExisting ? 'text-gray-900' : ''
						)}
					>
						<Plus size={16} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default MenuItem;
