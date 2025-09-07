import React from 'react'

type InputLabelProps = {
	name?: string
	title: string
}

const InputLabel: React.FC<InputLabelProps> = ({ name, title }) => {
	return (
		<label htmlFor={name} className='text-xs tracking-wider'>{title}</label>
	)
}

export default InputLabel