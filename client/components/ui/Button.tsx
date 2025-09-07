import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?:
    | 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone'
    | 'red' | 'orange' | 'amber' | 'yellow' | 'lime'
    | 'green' | 'emerald' | 'teal' | 'cyan'
    | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple'
    | 'fuchsia' | 'pink' | 'rose';
}

const colorClasses: Record<NonNullable<ButtonProps['color']>, string> = {
  slate:   'bg-slate-700 hover:bg-slate-900 active:bg-slate-800 focus-visible:outline-slate-700',
  gray:    'bg-gray-700 hover:bg-gray-900 active:bg-gray-800 focus-visible:outline-gray-700',
  zinc:    'bg-zinc-700 hover:bg-zinc-900 active:bg-zinc-800 focus-visible:outline-zinc-700',
  neutral: 'bg-neutral-700 hover:bg-neutral-900 active:bg-neutral-800 focus-visible:outline-neutral-700',
  stone:   'bg-stone-700 hover:bg-stone-900 active:bg-stone-800 focus-visible:outline-stone-700',

  red:     'bg-red-700 hover:bg-red-900 active:bg-red-800 focus-visible:outline-red-700',
  orange:  'bg-orange-700 hover:bg-orange-900 active:bg-orange-800 focus-visible:outline-orange-700',
  amber:   'bg-amber-700 hover:bg-amber-900 active:bg-amber-800 focus-visible:outline-amber-700',
  yellow:  'bg-yellow-700 hover:bg-yellow-900 active:bg-yellow-800 focus-visible:outline-yellow-700',
  lime:    'bg-lime-700 hover:bg-lime-900 active:bg-lime-800 focus-visible:outline-lime-700',

  green:   'bg-green-700 hover:bg-green-900 active:bg-green-800 focus-visible:outline-green-700',
  emerald: 'bg-emerald-700 hover:bg-emerald-900 active:bg-emerald-800 focus-visible:outline-emerald-700',
  teal:    'bg-teal-700 hover:bg-teal-900 active:bg-teal-800 focus-visible:outline-teal-700',
  cyan:    'bg-cyan-700 hover:bg-cyan-900 active:bg-cyan-800 focus-visible:outline-cyan-700',
  sky:     'bg-sky-700 hover:bg-sky-900 active:bg-sky-800 focus-visible:outline-sky-700',

  blue:    'bg-blue-700 hover:bg-blue-900 active:bg-blue-800 focus-visible:outline-blue-700',
  indigo:  'bg-indigo-700 hover:bg-indigo-900 active:bg-indigo-800 focus-visible:outline-indigo-700',
  violet:  'bg-violet-700 hover:bg-violet-900 active:bg-violet-800 focus-visible:outline-violet-700',
  purple:  'bg-purple-700 hover:bg-purple-900 active:bg-purple-800 focus-visible:outline-purple-700',
  fuchsia: 'bg-fuchsia-700 hover:bg-fuchsia-900 active:bg-fuchsia-800 focus-visible:outline-fuchsia-700',
  pink:    'bg-pink-700 hover:bg-pink-900 active:bg-pink-800 focus-visible:outline-pink-700',
  rose:    'bg-rose-700 hover:bg-rose-900 active:bg-rose-800 focus-visible:outline-rose-700',
};

export function Button({ children, className, color = 'cyan', ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex py-3 items-center justify-center leading-none rounded-lg px-4 text-sm font-medium text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:cursor-not-allowed cursor-pointer aria-disabled:opacity-50 tracking-wider',
        colorClasses[color],
        className,
      )}
    >
      {children}
    </button>
  );
}