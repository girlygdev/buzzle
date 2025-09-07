'use client'

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import CategorySchema from '@/forms/inventories/CategorySchema'
import TextInput from '@/components/forms/TextInput'
import InputLabel from '@/components/forms/InputLabel'
import { Button } from '@/components/ui/Button'
import TextArea from '@/components/forms/TextArea'
import { Select } from '@headlessui/react'
import ColorSelect from '@/components/forms/FormikColorSelect'

export interface CategoryFormValues {
	title: string
	description: string
	color?: string
	icon?: string
}

type CategoryFormProps = {
	initialValues: CategoryFormValues
	onSubmit: (values: CategoryFormValues) => void
}

const CategoryForm: React.FC<CategoryFormProps> = ({ initialValues, onSubmit }) => {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={CategorySchema}
			onSubmit={onSubmit}
		>
			{({ values, setFieldValue }) => (
				<Form>
					<div className='my-2'>
						<InputLabel
							name='title'
							title={'Title'}
						/>
						<Field
							type='text'
							name='title'
							as={TextInput}
						/>
						<ErrorMessage
							name='title'
							component='div'
							className='text-red-700 text-xs'
						/>
					</div>

					<div className='my-2'>
						<InputLabel
							name='description'
							title={'Description'}
						/>
						<Field
							type='text'
							name='description'
							as={TextArea}
							rows={3}
						/>
						<ErrorMessage
							name='description'
							component='div'
							className='text-red-700 text-xs'
						/>
					</div>

					<div className='my-2'>
						<InputLabel
							name='color'
							title={'Color'}
						/>
						
						<ColorSelect name='color' value={values.color ?? 'bg-cyan-200'} setFieldValue={setFieldValue} />
					</div>

					<div className='flex justify-end'>
						<div className='flex w-1/2 gap-1'>
							<Button
								color='gray'
								className='flex-1'
							>
								Cancel
							</Button>
							<Button
								color='cyan'
								className='flex-1'
							>
								Submit
							</Button>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	)
}

export default CategoryForm
