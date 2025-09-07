'use client';

import { create } from 'zustand';
import { Customer, Item, Table } from '../utils/definition';
import { persist } from 'zustand/middleware';

export type OrderItem = {
	id?: string;
  item: Item;
	qty: number;
	note?: string;
}

export type Order = {
	id: string;
	items: Array<OrderItem>
	tableId?: string;
  customerId?: string;
  status: OrderStatusEnum;
  paymentStatus: PaymentStatusEnum;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum OrderStatusEnum {
  Waiting,
  InService,
  ReadyToCheckout,
  Closed, // service is done
}

export enum PaymentTypeEnum {
	Cash = 'cash',
	Card = 'card',
	Ewallet = 'e-wallet'
}

export enum PaymentStatusEnum {
  Unpaid,
  Paid,
  Refunded,
}

interface OrderInterface {
	table?: Table,
	setTable: (table: Table) => void

	customer?: Customer,
	setCustomer: (customer: Customer) => void

	order?: Order,
	setOrder: (order: Order) => void

	addOrIncrementItem: (item: Item) => void
	decrementItemQty: (item: Item) => void

	updateOrderItem: (id: string, itemData: Partial<OrderItem>) => void
	deleteOrderItem: (id: string) => void

	status: OrderStatusEnum,
	setStatus: (status: OrderStatusEnum) => void

	paymentType: PaymentTypeEnum
	setPaymentType: (type: PaymentTypeEnum) => void

	paymentStatus: PaymentStatusEnum
	setPaymentStatus: (status: PaymentStatusEnum) => void

	note?: string
	setNote: (note?: string) => void

	reset: () => void
}

export const useOrderStore = create<OrderInterface>()(
	// persist(
		(set) => ({
			table: undefined,
			setTable: (table: Table) => set(({ table })),

			customer: undefined,
			setCustomer: (customer: Customer) => set({ customer }),

			order: undefined,
			setOrder: (order: Order) => set({ order }),

			addOrIncrementItem: (item: Item) => set((state) => {
				const existingOrder = state.order;

				// Create new order if none
				if (!existingOrder) {
					return {
						order: {
							id: crypto.randomUUID(),
							items: [
								{
									id: crypto.randomUUID(),
									item,
									qty: 1,
								},
							],
							status: OrderStatusEnum.Waiting,
							paymentStatus: PaymentStatusEnum.Unpaid,
						},
					};
				}

				// Clone current items
				const existingItems = [...existingOrder.items];
				const index = existingItems.findIndex((i) => i.item.id === item.id);

				if (index !== -1) {
					// Update quantity immutably
					const updatedItem = {
						...existingItems[index],
						qty: existingItems[index].qty + 1,
					};
					existingItems[index] = updatedItem;
				} else {
					// Add new item
					existingItems.push({
						id: crypto.randomUUID(),
						item,
						qty: 1,
					});
				}

				return {
					order: {
						...existingOrder,
						items: existingItems, 
					},
				}
			}),

			decrementItemQty: (item: Item) => set((state) => {
				if (!state.order) return {};

				const updatedItems = state.order.items
					.map((orderItem) =>
						orderItem.item.id === item.id
							? { ...orderItem, qty: orderItem.qty - 1 }
							: orderItem
					)
					.filter((item) => item.qty > 0); // remove if qty is 0

				return {
					order: { ...state.order, items: updatedItems },
				};
			}),

			updateOrderItem: (id: string, updatedItem: Partial<OrderItem>) => set((state) => {
				if (!state.order) return {}

				const updatedItems = state.order.items.map((orderItem: OrderItem) => (
					orderItem.id === id ? ({...orderItem, ...updatedItem}) : orderItem
				))
				console.log(updatedItems)
				return {
					order: {
						...state.order,
						items: updatedItems
					}
				}
			}),

			deleteOrderItem: (id: string) => set((state) => {
				if (!state.order) return {}

				const updatedItems = state.order.items.filter((item: OrderItem) => item.id !== id)

				return {
					order: {
						...state.order,
						items: updatedItems
					}
				}
			}),

			status: OrderStatusEnum.Waiting,
			setStatus: (status: OrderStatusEnum) => set({ status }),

			paymentStatus: PaymentStatusEnum.Unpaid,
			setPaymentStatus: (paymentStatus: PaymentStatusEnum) => set({ paymentStatus }),

			paymentType: PaymentTypeEnum.Cash,
			setPaymentType: (paymentType: PaymentTypeEnum) => set({ paymentType }),

			setNote: (note?: string) => set({ note }),

			reset: () => set(() => ({
				table: undefined,
				customer: undefined,
				order: undefined,
				status: OrderStatusEnum.Waiting,
				paymentStatus: PaymentStatusEnum.Unpaid,
				paymentType: PaymentTypeEnum.Cash,
				note: undefined
			})),
		}),
	// 	{
  //     name: 'order-store', // key in localStorage
  //     partialize: (state) => ({
  //       table: state.table,
  //       customer: state.customer,
  //       order: state.order,
  //       status: state.status,
  //       paymentStatus: state.paymentStatus,
  //     }),
	// 	}
	// )
);
