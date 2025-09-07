import { Field } from 'formik';
import clsx from 'clsx';
import { ColorBadge } from '@/app/inventory/categories/_components/table/cells';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { Fragment, useMemo } from 'react';

const tailwindColors = [
  { value: 'bg-red-200', label: 'red' },
  { value: 'bg-orange-200', label: 'orange' },
  { value: 'bg-amber-200', label: 'amber' },
  { value: 'bg-yellow-200', label: 'yellow' },
  { value: 'bg-lime-200', label: 'lime' },

  { value: 'bg-green-200', label: 'green' },
  { value: 'bg-emerald-200', label: 'emerald' },
  { value: 'bg-teal-200', label: 'teal' },
  { value: 'bg-cyan-200', label: 'cyan' },
  { value: 'bg-sky-200', label: 'sky' },

  { value: 'bg-blue-200', label: 'blue' },
  { value: 'bg-indigo-200', label: 'indigo' },
  { value: 'bg-violet-200', label: 'violet' },
  { value: 'bg-purple-200', label: 'purple' },
  { value: 'bg-fuchsia-200', label: 'fuchsia' },

  { value: 'bg-pink-200', label: 'pink' },
  { value: 'bg-rose-200', label: 'rose' },
];



type ColorSelectProps = {
	name: string;
	value: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setFieldValue: (field: string, value: any) => void
}

const ColorSelect: React.FC<ColorSelectProps> = ({ name, value, setFieldValue }) => {
  // return (
  //   <Field as="select" name={name} aria-label="Select Color"
  //     className="w-full rounded border px-3 py-2"
  //   >
  //     <option value="">Select a color…</option>
  //     {tailwindColors.map(color => (
  //       <option
  //         key={color.value}
  //         value={color.value}
  //       >
  //         {color.label.toUpperCase()}
	// 				<span
  //     className={`inline-block rounded px-2 py-1 w-25 text-center text-xs font-medium text-gray-800 ${color.className}`}>
  //   </span>
  //       </option>
  //     ))}
  //   </Field>
  // );

	const onChangeValue = (value: string) => {
		setFieldValue(name, value)
	}

	const selectedColor = useMemo(() => tailwindColors.find(c => c.value === value), [value])

	return (
		<div className='relative'>
    <Listbox value={value} onChange={onChangeValue}>
      <ListboxButton className={'border rounded-sm p-2 w-full text-left capitalize'}>{selectedColor?.label}</ListboxButton>
      <ListboxOptions anchor="bottom start" className='h-50 w-50 mt-1 px-1'>
        {tailwindColors.map((color) => (
          <ListboxOption key={color.value} value={color.value} as={Fragment}>
            {({ focus, selected }) => (
              <ColorBadge bgClass={color.value} className={clsx(focus && 'text-white font-bold', selected && 'text-gray-300 font-bold cursor-pointer', 'w-full cursor-pointer')} />
            )}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
		</div>
  )
}

export default ColorSelect;