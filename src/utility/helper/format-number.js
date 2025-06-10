export function formatNumber(num, locale = "en-US") {
  return new Intl.NumberFormat(locale).format(num);
}
