export function toPercentage(num: number, decimal = 2) {
  return (num * 100).toFixed(decimal) + "%";
}

export function downloadImage(dataUrl: string, filename: string) {
  filename = filename.trim() || "download";

  // 不允许的字符：\/:*?"<>|，Windows 文件系统非法字符
  const invalidChars = /[\\\/:*?"<>|]/;
  if (invalidChars.test(filename)) {
    throw new Error("Invalid filename: contains illegal characters.");
  }

  if (filename.length > 100) {
    throw new Error("Invalid filename: too long (max 100 characters).");
  }

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = `${filename}.png`;
  link.click();
}
