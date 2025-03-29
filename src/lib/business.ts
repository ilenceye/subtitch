import { Screenshot } from "@/types";

export function fromImageSrcsToScreenshots(
  imageSrcs: string[],
  prevScreenshots: Screenshot[],
) {
  return imageSrcs.map((imageUrl, idx) => {
    const clipArea: Screenshot["clipArea"] =
      prevScreenshots.length === 0 && idx === 0
        ? {
            topPcnt: 0,
            heightPcnt: 1,
          }
        : {
            topPcnt: 0.9,
            heightPcnt: 0.1,
          };

    const newScreenshot: Screenshot = {
      id: crypto.randomUUID(),
      imageUrl,
      clipArea,
    };

    return newScreenshot;
  });
}
