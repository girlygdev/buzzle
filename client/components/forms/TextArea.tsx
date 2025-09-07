import React from 'react';

type Props = React.InputHTMLAttributes<HTMLTextAreaElement>;

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
	return (
		<textarea
			ref={ref}
			{...props}
			className={`w-full rounded border px-3 py-2 my-1 ${
				props.className ?? ''
			}`}
		/>
	);
});

TextArea.displayName = 'TextArea';

export default TextArea;
