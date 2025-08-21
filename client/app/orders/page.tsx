'use client';

import React, { useMemo, useState } from 'react';
import { categories, items } from '../utils/data-placeholder';
import { Category, Item } from '../utils/definition';
import OrderCategory from '../views/orders/OrderCategory';
import OrderItem from '../views/orders/OrderItem';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { inter } from '../styles/fonts';
import { DollarSign, CreditCard, QrCode } from 'lucide-react';

const OrderPage = () => {
	const [currentCategory, setCurrentCategory] = useState<Category>(
		categories[0]
	);

	const orderItems: Array<Item> = useMemo(() => {
		return items.filter(
			(item: Item) => item.category_id == currentCategory.id
		);
	}, [currentCategory?.id]);

	const onCategoryClick = (category: Category) => {
		setCurrentCategory(category);
	};

	const onItemClick = (item: Item) => {
		// add item to cart
	};

	return (
		<main className={`flex h-full gap-3 ${inter.className}`}>
			{/* Menu Selection */}
			<div className='h-full w-full flex flex-col'>
				{/* Category Container */}
				<div className='h-60'>
					<PerfectScrollbar options={{ suppressScrollX: true }}>
						<div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
							{categories.map((category: Category, key) => (
								<OrderCategory
									key={key}
									category={category}
									onClick={onCategoryClick.bind(
										this,
										category
									)}
									isSelected={
										category.id == currentCategory.id
									}
								/>
							))}
						</div>
					</PerfectScrollbar>
				</div>

				{/* Divider */}
				<div className='my-3 h-px w-full bg-gray-200 dark:bg-gray-700' />

				{/* Category Container */}
				<div className='flex-grow min-h-0 overflow-hidden'>
					<PerfectScrollbar options={{ suppressScrollX: true }}>
						<div className='grid grid-cols-2 md:grid-cols-4 gap-2 mt-3'>
							{orderItems.map((item: Item, key) => (
								<OrderItem
									key={key}
									item={item}
									category={currentCategory}
									onClick={onItemClick.bind(this, item)}
								/>
							))}
						</div>
					</PerfectScrollbar>
				</div>
			</div>

			{/* Cart Summary */}
			<div className='w-90 h-full hidden md:flex flex-col'>
				<div className='pb-5 border-b border-gray-700'>
					<p className='text-xl'>Table 1</p>
					<p className='text-gray-500 text-sm'>Leslie K.</p>
				</div>

				<div className='flex-grow min-h-0 overflow-hidden my-2 space-y-2'>
					<PerfectScrollbar options={{ suppressScrollX: true }}>
						<div className='space-y-2'>
							<div className='p-2 bg-neutral-900 flex justify-between items-center rounded-sm'>
								<div className='flex items-center gap-2'>
									<span className='rounded-full bg-white w-4 h-4 flex items-center justify-center text-[10px] text-gray-900 shrink-0'>
										1
									</span>

									<div className='flex-grow min-w-0'>
										<p className='text-sm'>
											Pancakes Roasted With Sesame Butter
										</p>
										<p className='text-[10px] text-gray-500'>
											No butter, wheat
										</p>
									</div>
								</div>

								<div className='flex gap-2'>
									<p className='text-sm text-gray-500'>x1</p>
									<p className='text-sm  w-17 text-right'>
										₱247.25
									</p>
								</div>
							</div>
						</div>
					</PerfectScrollbar>
				</div>

				<div className='h-[350px] border-t border-gray-700 pt-2'>
					<div className='h-full flex flex-col bg-neutral-900 rounded-sm p-2 gap-2 pb-4'>
						<div className="border-b border-dashed pb-2">
							<div className="w-full flex justify-between">
								<p className="text-base text-gray-300">Subtotal</p>
								<p className="text-base text-gray-200">₱2,171.90</p>
							</div>
							<div className="w-full flex justify-between">
								<p className="text-base text-gray-300">Tax</p>
								<p className="text-base text-gray-200">₱17.90</p>
							</div>
						</div>

						<div className="flex-grow flex flex-col justify-between">
							<div className="w-full flex justify-between">
								<p className="text-xl text-gray-300">Total</p>
								<p className="text-xl text-gray-200">₱2,171.90</p>
							</div>

							<div className="">
								<p className="text-base text-gray-500">Payment Method</p>
								<div className="grid grid-cols-3 gap-2 my-2">
									<button className='flex flex-col items-center justify-center border rounded-sm px-2 py-3 cursor-pointer hover:bg-white hover:text-gray-900 transition-all ease-in-out'>
										<DollarSign className="text-current"  />
										<span className="text-sm mt-1">Cash</span>
									</button>

									<button className='flex flex-col items-center justify-center border rounded-sm px-2 py-3 cursor-pointer hover:bg-white hover:text-gray-900 transition-all ease-in-out'>
										<CreditCard className="text-current"/>
										<span className="text-sm mt-1">Card</span>
									</button>

									<button className='flex flex-col items-center justify-center border rounded-sm px-2 py-3 cursor-pointer hover:bg-white hover:text-gray-900 transition-all ease-in-out'>
										<QrCode className="text-current"/>
										<span className="text-sm mt-1">E-Wallet</span>
									</button>
								</div>

								<button className="text-center w-full rounded-full p-2 mt-5 border-2 hover:bg-white hover:text-gray-900 transition-all ease-in-out cursor-pointer">
									Place Order
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default OrderPage;
