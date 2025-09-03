import { IconName } from 'lucide-react/dynamic';

export type Category = {
	id: number,
	name: string,
	color?: string,
	icon?: IconName
};

export type Item = {
	id: string,
	name: string,
	description: string,
	price: number,
	is_available: boolean,
	category_id: number
};

export type Table = {
	id: string,
	name: string,
	description?: string,
	location?: string,
	pax: number
}

export type Customer = {
	id: string,
	first_name: string,
	last_name: string,
	phone?: string,
	email?: string,
	note?: string
}

