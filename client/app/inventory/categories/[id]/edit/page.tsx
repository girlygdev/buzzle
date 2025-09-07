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
import ErrorLabel from '@/components/forms/ErrorLabel';

interface CategoryValues {
	title: string;
	description: string;
	color?: string;
}

const AddCategoryPage = () => {
	const initialValues: CategoryValues = {
		title: '',
		description: '',
		color: 'bg-green-200',
	};

	const onSubmit = (values: CategoryValues) => {
		console.log(values)
	}

	return (
		<div className='rounded-md bg-neutral-900 md:w-1/2 p-5'>
			<h2 className='text-xl pb-4 mb-4 border-b border-neutral-700'>Edit Category</h2>

			<Formik
       initialValues={initialValues}
       validationSchema={CategorySchema}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       {({ isSubmitting }) => (
         <Form>
						<div className="my-2">
							<InputLabel name='title' title={'Title'} />
						<Field type="title" name="title" as={TextInput} />
           	<ErrorMessage name="title" className="text-red-600 text-sm"  />
						</div>
           
           <Field type="description" name="description" />
           <ErrorMessage name="description" component="div" />
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
		</div>
	);
};

export default AddCategoryPage;
