import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { OrderItem } from '@/app/store/useOrderStore'
import { formatPrice } from '@/app/utils/format'
import { Minus, Plus } from 'lucide-react'
import clsx from 'clsx'

type EditCartItemDialogProps = {
	cartItem: OrderItem
	open: boolean
	onCancel: () => void
	onSubmit: (data: {qty: number, note: string}) => void
}

const EditCartItemDialog: React.FC<EditCartItemDialogProps> = ({ cartItem, open, onCancel, onSubmit }) => {
	const { item, qty, note } = cartItem;

	const [currentQty, setCurrentQty] = useState(qty)
	const [currentNote, setCurrentNote] = useState(note)

	useEffect(() => {setCurrentQty(qty)}, [qty]);
	useEffect(() => {setCurrentNote(note ?? '')}, [note]);

	const onAddItem = () => {
		setCurrentQty(prev => prev + 1);
	};

	const onDeductItem = () =>  {
		setCurrentQty(prev => Math.max(1, prev - 1));
	};

	const onChangeNote = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setCurrentNote(e.target.value);
    },
    []
  );

	const onSubmitEdit = () => {
		onSubmit({ qty: currentQty, note: currentNote ?? '' });
	}

  const totalPrice = useMemo(() => item.price * currentQty, [item.price, currentQty]);

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
                    <DialogTitle as="h3" className="text-base text-gray-400 border-b pb-1 ">
                      Edit item
                    </DialogTitle>
                    <div className="mt-5 space-y-3">
                      <div className="flex">
												<p className="text-sm text-gray-500 w-30 leading-none">Product Name:</p>
												<p className="text-base leading-none">{item?.name}</p>
											</div>

											<div className="flex items-center">
												<p className="text-sm text-gray-500 w-30 leading-none">Quantity:</p>
												
												<div className='flex justify-end items-center gap-2'>
													<button
														onClick={onDeductItem}
														className={clsx(
															'p-1 border rounded-sm cursor-pointer transition-all ease-in-out hover:bg-neutral-700'
														)}
													>
														<Minus size={12} />
													</button>
													<p
														className={clsx(
															'text-xl w-[20px] text-center'
														)}
													>
														{currentQty}
													</p>
													<button
														onClick={onAddItem}
														className={clsx(
															'p-1 border rounded-sm cursor-pointer transition-all ease-in-out hover:bg-neutral-700'
														)}
													>
														<Plus size={12} />
													</button>
												</div>
											</div>

											<div className="flex">
												<p className="text-sm text-gray-500 w-30 leading-none">Price:</p>
												<p className="text-base leading-none">{formatPrice(totalPrice)}</p>
											</div>

											<div className="">
												<p className="text-sm text-gray-500 pb-2">Note:</p>
												<input
													value={currentNote}
													onChange={onChangeNote}
													placeholder="Add a note"
													name='note'
													className="w-full rounded-md bg-neutral-800 px-3 py-2 text-sm text-white placeholder-gray-400 ring-1 ring-white/10 focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-[0_0_0_3px_rgba(255,255,255,0.1)]"
												/>
											</div>
                    </div>
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

export default EditCartItemDialog