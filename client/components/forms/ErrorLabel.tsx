import React from 'react'

type ErrorLabelProps = {
	name?: string
	title: string
}
const ErrorLabel: React.FC<ErrorLabelProps> = ({ name, title }) => {
	return (
		<label htmlFor={name} className='text-sm tracking-wider'>{title}</label>
	)
}

export default ErrorLabel