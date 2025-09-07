import { HTMLAttributes } from 'react';

export function ColorBadge({
  bgClass,
  className = '',
  ...rest
}: { bgClass: string } & HTMLAttributes<HTMLSpanElement>) {
	const stringColor = bgClass.split('-')[1]
  return (
    <span
      className={`inline-block rounded px-2 py-1 w-25 text-center text-xs font-medium text-gray-800 tracking-wider ${bgClass} ${className}`}
      {...rest}
    >
      {stringColor.toUpperCase()}
    </span>
  );
}
