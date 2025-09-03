'use client';

import React, { useMemo, useState } from 'react';
import { categories, items } from '../utils/data-placeholder';
import { Category, Item } from '../utils/definition';
import OrderCategory from '../views/menu/MenuCategory';
import OrderItemComponent from '../views/menu/MenuItem';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { inter } from '../styles/fonts';
import clsx from 'clsx';
import Cart from '../views/cart/Cart';

const OrderPage = () => {
	const [currentCategory, setCurrentCategory] = useState<Category | null>();

	const orderItems: Array<Item> = useMemo(() => {
		return items.filter(
			(item: Item) => item.category_id == currentCategory?.id
		);
	}, [currentCategory?.id]);

	const onCategoryClick = (category: Category) => {
		setCurrentCategory(category);
	};

	return (
		<main className={`flex h-full gap-3 ${inter.className}`}>
			{/* Menu Selection */}
			<div className='h-full w-full flex flex-col'>
				{/* Category Container */}
				<div
					className={clsx('h-60', categories.length > 8 && 'lg:h-90')}
				>
					<PerfectScrollbar options={{ suppressScrollX: true }}>
						<div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
							{categories.map((category: Category) => (
								<OrderCategory
									key={category.id}
									category={category}
									onClick={() => onCategoryClick(category)}
									isSelected={
										category.id == currentCategory?.id
									}
								/>
							))}
						</div>
					</PerfectScrollbar>
				</div>

				{/* Divider */}
				<div className='my-3 h-px w-full bg-gray-200 dark:bg-gray-700' />

				{/* Menu Items Container */}
				<div className='flex-grow min-h-0 overflow-hidden'>
					<PerfectScrollbar options={{ suppressScrollX: true }}>
						{orderItems.length == 0 && currentCategory ? (
							<div className='flex justify-center items-center h-full'>
								<p className='text-gray-500 text-sm'>
									No items in this category.
								</p>
							</div>
						) : !currentCategory ? (
							<div className='flex justify-center items-center h-full'>
								<p className='text-gray-500 text-sm'>
									Select a category.
								</p>
							</div>
						) : (
							<div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
								{orderItems.map((item: Item, key) => (
									<OrderItemComponent
										key={key}
										item={item}
										category={currentCategory}
									/>
								))}
							</div>
						)}
					</PerfectScrollbar>
				</div>
			</div>

			{/* Cart */}
			<Cart />
		</main>
	);
};

export default OrderPage;
