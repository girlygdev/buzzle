import numeral from 'numeral';

/**
 * Formats a centavo value into a peso string.
 * @param cents number - value in centavos (e.g. 12345 = ₱123.45)
 */
export function formatPrice(cents: number, currency?: '₱'): string {
  return '₱' + numeral(cents).divide(100).format('0,0.00');
}