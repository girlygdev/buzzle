import { Category, Item } from '@/app/utils/definition';
import React from 'react';
import { Minus, Plus } from 'lucide-react';
import numeral from 'numeral';

type OrderItemProps = {
	category: Category;
	item: Item;
	onClick: () => void;
};

const OrderItem: React.FC<OrderItemProps> = ({ item, category, onClick }) => {
	return (
		<div
			onClick={onClick}
			className={`flex rounded-sm h-28`}
		>
			<div className={`${category.color} rounded-tl-sm rounded-bl-sm  w-1.5`} />
			<div className='flex-grow bg-neutral-900 p-2 flex flex-col justify-between'>
				<div className="leading-none text-left">
					<p className='font-bold text-white  text-base'>
						{item.name}
					</p>
					<p className='font-bold text-gray-400 text-sm'>
						₱{numeral(item.price).divide(100).format('0,000.00')}
					</p>
				</div>
				

				<div className="flex justify-end items-center gap-2">
					<button className="p-1 border rounded-sm cursor-pointer transition-all ease-in-out hover:bg-neutral-700">
						<Minus size={16} />
					</button>
					<p className="text-2xl">0</p>
					<button className="p-1 border rounded-sm cursor-pointer transition-all ease-in-out hover:bg-neutral-700">
						<Plus size={16} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default OrderItem;
