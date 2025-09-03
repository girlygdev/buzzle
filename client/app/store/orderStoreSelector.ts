import { useShallow } from 'zustand/shallow';
import { useOrderStore } from './useOrderStore';

export const useCartTotals = () =>
	useOrderStore(
		useShallow((s) => {
			const taxRate = 0.1;

			const items = s.order?.items ?? [];

			const subTotal = items.reduce(
				(acc, oi) => acc + oi.qty * (oi.item.price ?? 0),
				0
			);

			const tax = subTotal * taxRate;

			const total = subTotal + tax;

			const totalItems = items.reduce((acc, oi) => acc + oi.qty, 0);

			return { subTotal, tax, total, totalItems };
		})
	);
