export function toPercentage(num: number, decimal = 2) {
  return (num * 100).toFixed(decimal) + "%";
}

export function downloadImage(dataUrl: string, filename = "download.png") {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.click();
}
