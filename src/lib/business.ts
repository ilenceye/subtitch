import { Screenshot } from "@/types";

export function fromImageSrcsToScreenshots(imageSrcs: string[]) {
  return imageSrcs.map((imageUrl) => ({
    id: crypto.randomUUID(),
    imageUrl,
    clipArea: {
      topPcnt: 0.9,
      heightPcnt: 0.1,
    },
  }));
}

export function mergeImages(
  {
    screenshots,
    annotation = "",
  }: {
    screenshots: Screenshot[];
    annotation?: string;
  },
  callback: (DataURL: string) => void,
) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  let imagesLoaded = 0;
  const images: HTMLImageElement[] = [];
  let canvasHeight = 0;

  screenshots.forEach((screenshot, index) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // 解决跨域问题
    img.src = screenshot.imageUrl;

    img.onload = () => {
      images[index] = img;
      imagesLoaded++;

      if (index === 0) {
        canvas.width = img.width;
        canvasHeight = canvasHeight + img.height;
      } else {
        const subtitleAreaHeight = Math.floor(
          img.height * screenshot.clipArea.heightPcnt,
        );
        canvasHeight = canvasHeight + subtitleAreaHeight;
      }

      if (imagesLoaded === screenshots.length) {
        canvas.height = canvasHeight;

        drawImages();

        addAnnotation();

        callback(canvas.toDataURL("image/png"));
      }
    };
  });

  // 这里绘制图片时，第一张图取全部，剩下的图取字幕区域

  function drawImages() {
    const dx = 0;
    let dy = 0;

    images.forEach((img, idx) => {
      if (idx === 0) {
        // 第一张图取全部
        ctx?.drawImage(img, dx, dy);
        dy = dy + img.height;
      } else {
        // 剩下的图取字幕区域
        const screenshot = screenshots[idx];
        const sy = Math.floor(img.height * screenshot.clipArea.topPcnt);
        const sHeight = Math.floor(img.height * screenshot.clipArea.heightPcnt);
        ctx?.drawImage(
          img,
          0,
          sy,
          img.width,
          sHeight,
          dx,
          dy,
          img.width,
          sHeight,
        );
        dy = dy + sHeight;
      }
    });
  }

  function addAnnotation() {
    if (!ctx || annotation === "") return;
    annotation = `©${annotation}`;

    ctx.font = "16px normal";
    ctx.fillStyle = "rgb(255 255 255 / 60%)";
    const { width } = ctx.measureText(annotation);
    ctx.fillText(annotation, canvas.width - width - 8, 22);
  }
}
