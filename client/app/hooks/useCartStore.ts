import { useMemo } from 'react';
import { useOrderStore } from '../store/useOrderStore';
import { sumBy } from 'lodash';

const useCartStore = () => {
	const defaultTax = 0.1;

	const { order } = useOrderStore((state) => state);

	const totalItems = useMemo(() => {
		return sumBy(order?.items, 'qty');
	}, [order?.items]);

	const subTotal = useMemo(() => {
		return (order?.items ?? []).reduce((acc, curr) => {
			return acc + curr.qty * curr.item.price;
		}, 0);
	}, [order]);

	const tax = useMemo(() => {
		return subTotal * defaultTax;
	}, [subTotal]);

	const total = useMemo(() => {
		return subTotal + tax;
	}, [subTotal, tax]);

	return {
		subTotal,
		total,
		tax,
		totalItems,
	};
};

export default useCartStore;
