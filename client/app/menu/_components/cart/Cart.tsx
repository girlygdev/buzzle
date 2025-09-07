'use client';

import React, { useState } from 'react';
import { DollarSign, CreditCard, QrCode } from 'lucide-react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
	OrderItem,
	PaymentTypeEnum,
	useOrderStore,
} from '@/store/useOrderStore';
import CartItem from './CartItem';
import { formatPrice } from '@/utils/format';
import clsx from 'clsx';
import EditCartItemDialog from './dialogs/EditCartItemDialog';
import EditNoteButton from './actions/EditNoteButton';
import ResetCartButton from './actions/ResetCartButton';
import EditNoteDialog from './dialogs/EditNoteDialog';
import { useShallow } from 'zustand/shallow';
import { useCartTotals } from '@/store/orderStoreSelector';

const Cart = () => {
	const { order, note, setNote, updateOrderItem, deleteOrderItem } =
		useOrderStore(
			useShallow((s) => ({
				order: s.order,
				note: s.note,
				setNote: s.setNote,
				updateOrderItem: s.updateOrderItem,
				deleteOrderItem: s.deleteOrderItem,
			}))
		);

	const { subTotal, tax, total, totalItems } = useCartTotals();

	const [currentItem, setCurrentItem] = useState<OrderItem>();
	const [openEditItemDx, setOpenEditItemDx] = useState(false);
	const [openNoteDx, setOpenNoteDx] = useState(false);

	const [payment, setPayment] = useState<PaymentTypeEnum>(
		PaymentTypeEnum.Cash
	);

	const onEditItem = (item: OrderItem) => {
		setOpenEditItemDx(true);
		setCurrentItem(item);
	};

	const onDeleteItem = (id: string) => {
		deleteOrderItem(id);
	};

	const onCancelEditItem = () => {
		setCurrentItem(undefined);
		setOpenEditItemDx(false);
	};

	const onSubmitEditItem = (updatedData: { qty: number; note: string }) => {
		const { qty, note } = updatedData;

		if (currentItem) {
			updateOrderItem(currentItem.id!, { qty, note });
		}

		setCurrentItem(undefined);
		setOpenEditItemDx(false);
	};

	const onSubmitEditNote = (note: string) => {
		setNote(note);
		setOpenNoteDx(false);
	};

	const hasItems = (order?.items?.length ?? 0) > 0;
	const canPlaceOrder = hasItems && !!payment;

	if (!order) {
		return (
			<div className='w-90 h-full hidden border rounded-sm border-neutral-800 md:flex flex-col'>
				<div className='flex justify-center items-center h-full'>
					<p className='text-gray-500 text-xs text-center'>
						Add an item from the menu, to create an order.
					</p>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className='w-90 h-full hidden md:flex flex-col'>
				<div className='pb-5 border-b border-gray-700'>
					<p className='text-xl'>Table 1</p>
					<p className='text-gray-500 text-sm'>Leslie K.</p>
				</div>

				<div className='flex-grow min-h-0 overflow-hidden my-2 space-y-2 '>
					<PerfectScrollbar options={{ suppressScrollX: true }}>
						<div className='space-y-2 py-1'>
							{order?.items?.map((item: OrderItem, index) => (
								<CartItem
									key={item.id}
									itemNo={index + 1}
									cartItem={item}
									onEdit={() => onEditItem(item)}
									onDelete={() => onDeleteItem(item.id!)}
								/>
							))}
						</div>
					</PerfectScrollbar>
				</div>

				<div className='h-[50px] border-t border-gray-700 grid grid-cols-2 gap-2 items-center'>
					<EditNoteButton onClick={() => setOpenNoteDx(true)} />
					<ResetCartButton />
				</div>

				<div className='h-[350px] border-t border-gray-700 pt-2'>
					<div className='h-full flex flex-col bg-neutral-900 rounded-sm p-2 gap-2 pb-4'>
						<div className='border-b border-dashed pb-2'>
							<div className='w-full flex justify-between'>
								<p className='text-base text-gray-300'>
									Subtotal
								</p>
								<p className='text-base text-gray-200'>
									{formatPrice(subTotal)}
								</p>
							</div>
							<div className='w-full flex justify-between'>
								<p className='text-base text-gray-300'>Tax</p>
								<p className='text-base text-gray-200'>
									{formatPrice(tax)}
								</p>
							</div>
						</div>

						<div className='flex-grow flex flex-col justify-between'>
							<div>
								<div className='w-full flex justify-between'>
									<p className='text-sm text-gray-300'>
										Total Items
									</p>
									<p className='text-sm text-gray-200'>
										{totalItems}
									</p>
								</div>
								<div className='w-full flex justify-between'>
									<p className='text-xl text-gray-300'>
										Total
									</p>
									<p className='text-xl text-gray-200'>
										{formatPrice(total)}
									</p>
								</div>
							</div>

							<div className=''>
								<p className='text-base text-gray-500 text-xs uppercase'>
									Payment Method
								</p>

								<div
									role='radiogroup'
									aria-label='Payment method'
									className='grid grid-cols-3 gap-2 mt-1 mb-2'
								>
									<button
										type='button'
										onClick={() =>
											setPayment(PaymentTypeEnum.Cash)
										}
										className={clsx(
											'flex flex-col items-center justify-center border rounded-sm px-2 py-3 cursor-pointer hover:bg-white hover:text-gray-900 transition-all ease-in-out',
											payment === PaymentTypeEnum.Cash &&
											'bg-white text-gray-900'
										)}
									>
										<DollarSign
											aria-hidden='true'
											className='text-current'
										/>
										<span className='text-sm mt-1'>
											Cash
										</span>
									</button>

									<button
										type='button'
										onClick={() =>
											setPayment(PaymentTypeEnum.Card)
										}
										className={clsx(
											'flex flex-col items-center justify-center border rounded-sm px-2 py-3 cursor-pointer hover:bg-white hover:text-gray-900 transition-all ease-in-out',
											payment === PaymentTypeEnum.Card &&
											'bg-white text-gray-900'
										)}
									>
										<CreditCard
											aria-hidden='true'
											className='text-current'
										/>
										<span className='text-sm mt-1'>
											Card
										</span>
									</button>

									<button
										type='button'
										onClick={() =>
											setPayment(PaymentTypeEnum.Ewallet)
										}
										className={clsx(
											'flex flex-col items-center justify-center border rounded-sm px-2 py-3 cursor-pointer hover:bg-white hover:text-gray-900 transition-all ease-in-out',
											payment ===
											PaymentTypeEnum.Ewallet &&
											'bg-white text-gray-900'
										)}
									>
										<QrCode
											aria-hidden='true'
											className='text-current'
										/>
										<span className='text-sm mt-1'>
											E-Wallet
										</span>
									</button>
								</div>

								<button
									type='button'
									disabled={!canPlaceOrder}
									className={clsx(
										'text-center w-full rounded-full mt-5 p-2 border-2 transition-all ease-in-out',
										canPlaceOrder
											? 'cursor-pointer hover:bg-white hover:text-gray-900'
											: 'opacity-40 cursor-not-allowed'
									)}
								>
									Place Order
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{currentItem && (
				<EditCartItemDialog
					cartItem={currentItem}
					open={openEditItemDx}
					onCancel={onCancelEditItem}
					onSubmit={onSubmitEditItem}
				/>
			)}

			<EditNoteDialog
				note={note ?? ''}
				open={openNoteDx}
				onCancel={() => setOpenNoteDx(false)}
				onSubmit={onSubmitEditNote}
			/>
		</>
	);
};

export default Cart;
