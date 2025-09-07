'use client';

import React, { useCallback } from 'react';

import CategoryForm, {
	CategoryFormValues,
} from '../_components/form/CategoryForm';

const AddCategoryPage = () => {
	const initialValues: CategoryFormValues = {
		title: '',
		description: '',
		color: 'bg-green-200',
	};

	const onSubmit = useCallback((values: CategoryFormValues) => {
		console.log(values)
	}, [])

	return (
		<div className='rounded-md border border-neutral-800 md:w-1/2 p-5'>
			<h2 className='text-xl pb-4 mb-4 border-b border-neutral-700'>
				New Category
			</h2>

			<CategoryForm initialValues={initialValues} onSubmit={onSubmit} />
		</div>
	);
};

export default AddCategoryPage;
