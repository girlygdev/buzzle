import * as LucideIcons from 'lucide-react';

const normalizeIconName = (name: string): string => {
  return name
    .replace(/([a-z])([A-Z])/g, '$1-$2')  // camelCase → kebab-case
    .replace(/\s+/g, '-')                // spaces → dashes
    .replace(/_/g, '-')                  // underscores → dashes
    .toLowerCase()
    .split('-')                          // kebab → PascalCase
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

interface DynamicLucideIconProps {
  iconName?: string; // From DB or user input
  size?: number;
  color?: string;
}

export const DynamicLucideIcon: React.FC<DynamicLucideIconProps> = ({
  iconName = 'Utensils',
  size = 24,
  color = 'black',
}) => {
  const formatted = normalizeIconName(iconName);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const LucideIcon = ((LucideIcons as unknown) as Record<string, React.FC<any>>)[formatted];

  if (!LucideIcon) {
    console.warn(`Lucide icon "${formatted}" not found. Using default.`);
    return <LucideIcons.Utensils size={size} color={color} />;
  }

  return <LucideIcon size={size} color={color} />;
};
