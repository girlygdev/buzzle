'use client'

import { DynamicLucideIcon } from '@/app/components/ui/DynamicLucideIcon';
import { Category } from '@/app/utils/definition';
import clsx from 'clsx';
import React from 'react';

type MenuCategoryProps = {
	category: Category;
	onClick: () => void;
	isSelected?: boolean
};

const MenuCategory: React.FC<MenuCategoryProps> = ({ category, onClick, isSelected = false }) => {
	return (
		<button
			className={`${category?.color} flex flex-col justify-between rounded-sm p-2 h-28 cursor-pointer`}
			onClick={onClick}
		>
			<div className={clsx(
				{'flex-grow flex justify-center items-center': isSelected},
				'transition-all duration-200 ease-in-out'
			)}>
				<DynamicLucideIcon
					iconName={category.icon ?? 'utensils'}
					color='black'
					size={isSelected ? 50 : 24}
				/>
			</div>

			<p className={'font-bold text-gray-900 leading-none'}>
				{category.name}
			</p>
		</button>
	);
};

export default MenuCategory;
