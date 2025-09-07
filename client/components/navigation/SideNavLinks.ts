export type LinkNav = {
	name: string;
	href: string;
	subMenu?: LinkNav[];
};

export const SideNavLinks: LinkNav[] = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Menu', href: '/menu' },
  { name: 'Orders', href: '/orders' },
  { name: 'Reports', href: '/reports' },
  {
    name: 'Inventory',
    href: '/inventory',
    subMenu: [
      { name: 'Categories', href: '/inventory/categories' },
      { name: 'Products', href: '/inventory/products' },
    ],
  },
  { name: 'Settings', href: '/settings' },
];