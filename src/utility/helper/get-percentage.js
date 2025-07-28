export function calculatePercentage(total, value) {
  const percentage = (value * 100) / total;
  return `${percentage.toFixed(1)}`;
}
