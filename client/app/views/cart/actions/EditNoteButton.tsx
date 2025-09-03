import { NotebookPen } from 'lucide-react';
import React from 'react';

type EditNoteButtonProps = {
	onClick: () => void;
}

const EditNoteButton: React.FC<EditNoteButtonProps> = ({ onClick }) => {
	return (
		<button
			type='button'
			onClick={onClick}
			className='flex gap-1 items-center justify-center border rounded-sm p-1 pt-0 cursor-pointer hover:bg-white hover:text-gray-900 transition-all ease-in-out'
		>
			<NotebookPen size={16} className='text-current mt-1.5' />
			<span className='text-xs uppercase mt-2'>Add Notes</span>
		</button>
	);
};

export default EditNoteButton;
