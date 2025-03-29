export function toPercentage(num: number, decimal = 2) {
  return (num * 100).toFixed(decimal) + "%";
}
