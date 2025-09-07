import React, { useCallback, useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

type EditNoteDialogProps = {
	open: boolean
	note: string
	onCancel: () => void
	onSubmit: (note: string) => void
}

const EditNoteDialog: React.FC<EditNoteDialogProps> = ({ open, note, onCancel, onSubmit }) => {
	const [currentNote, setCurrentNote] = useState(note)

	useEffect(() => {setCurrentNote(note ?? '')}, [note]);

	const onChangeNote = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setCurrentNote(e.target.value);
    },
    []
  );

	const onSubmitEdit = () => {
		onSubmit(currentNote ?? '');
	}

  return (
	<Dialog open={open} onClose={onCancel} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-neutral-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-neutral-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mt-3 text-center sm:text-left">
                    <DialogTitle as="h3" className="text-base text-gray-400 border-b pb-1 mb-5">
                      Edit note
                    </DialogTitle>
                    
										<textarea
												value={currentNote}
												onChange={onChangeNote}
												placeholder="Add or edit note for this order"
												name='note'
												rows={3}
												className="w-full rounded-md bg-neutral-800 px-3 py-2 text-sm text-white placeholder-gray-400 ring-1 ring-white/10 focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-[0_0_0_3px_rgba(255,255,255,0.1)]"
											/>
                  </div>
              </div>

              <div className="bg-neutral-700/75 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={onSubmitEdit}
                  className="inline-flex w-full justify-center rounded-md bg-green-300 px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-green-400 sm:ml-3 sm:w-auto cursor-pointer"
                >
                  Update
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={onCancel}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
  )
}

export default EditNoteDialog