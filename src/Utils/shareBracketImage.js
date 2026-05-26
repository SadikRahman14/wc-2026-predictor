import { toPng } from "html-to-image";

function downloadDataUrl(dataUrl, fileName) {
  const link = document.createElement("a");

  link.download = fileName;
  link.href = dataUrl;
  link.click();
}

async function dataUrlToFile(dataUrl, fileName) {
  const response = await fetch(dataUrl);
  const blob = await response.blob();

  return new File([blob], fileName, {
    type: "image/png",
  });
}

export async function shareBracketImage(node, options = {}) {
  if (!node) {
    throw new Error("No bracket element found to capture.");
  }

  const fileName = options.fileName || "world-cup-2026-bracket.png";

  const rect = node.getBoundingClientRect();
  const width = Math.ceil(rect.width);
  const height = Math.ceil(rect.height);

  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: "#050505",
    width,
    height,
    style: {
      width: `${width}px`,
      height: `${height}px`,
      transform: "none",
    },
  });

  downloadDataUrl(dataUrl, fileName);

  const file = await dataUrlToFile(dataUrl, fileName);

  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      title: "My World Cup 2026 Prediction",
      text: "Here is my World Cup 2026 bracket prediction.",
      files: [file],
    });

    return "downloaded-and-shared";
  }

  return "downloaded";
}