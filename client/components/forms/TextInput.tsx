import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const TextInput = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
	return (
		<input
			ref={ref}
			{...props}
			className={`w-full rounded border px-3 py-2 my-1 ${
				props.className ?? ''
			}`}
		/>
	);
});

TextInput.displayName = 'TextInput';

export default TextInput;
