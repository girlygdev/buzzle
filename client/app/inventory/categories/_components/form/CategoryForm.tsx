'use client';

import React from 'react';
import {
	Formik,
	FormikHelpers,
	FormikProps,
	Form,
	Field,
	FieldProps,
	ErrorMessage,
} from 'formik';

import CategorySchema from '@/forms/inventories/CategorySchema';
import TextInput from '@/components/forms/TextInput';
import InputLabel from '@/components/forms/InputLabel';
import { Button } from '@/components/ui/Button';

export interface CategoryFormValues {
	title: string;
	description: string;
	color?: string;
	icon?: string;
}

type CategoryFormProps = {
	initialValues: CategoryFormValues;
	onSubmit: (values: CategoryFormValues) => void;
};

const CategoryForm: React.FC<CategoryFormProps> = ({
	initialValues,
	onSubmit,
}) => {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={CategorySchema}
			onSubmit={onSubmit}
		>
			{({  }) => (
				<Form>
					<div className='my-2'>
						<InputLabel name='title' title={'Title'} />
						<Field type='text' name='title' as={TextInput} />
						<ErrorMessage
							name='title'
							component='div'
							className='text-red-900 text-xs'
						/>
					</div>

					<Field type='description' name='description' />
					<ErrorMessage name='description' component='div' />

					<Button color='cyan'>Submit</Button>
				</Form>
			)}
		</Formik>
	);
};

export default CategoryForm;
