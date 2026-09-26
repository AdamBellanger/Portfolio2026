// Tells whether the pointer is over an opaque pixel of a transparent image
// (e.g. the hero cutout), so the cursor can react to the subject only and not
// to the empty corners of its bounding box. Each image is sampled once into a
// small alpha grid.

type Mask = { w: number; h: number; alpha: Uint8ClampedArray };

const MASK_WIDTH = 120;
const masks = new Map<string, Mask | "loading">();

function load(src: string) {
  masks.set(src, "loading");
  const probe = new Image();
  probe.onload = () => {
    const w = MASK_WIDTH;
    const h = Math.max(1, Math.round((probe.naturalHeight / probe.naturalWidth) * w));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.drawImage(probe, 0, 0, w, h);
    const { data } = ctx.getImageData(0, 0, w, h);
    const alpha = new Uint8ClampedArray(w * h);
    for (let i = 0; i < alpha.length; i++) alpha[i] = data[i * 4 + 3];
    masks.set(src, { w, h, alpha });
  };
  probe.onerror = () => masks.delete(src);
  probe.src = src;
}

/** Alpha (0–255) of the image under the pointer; 0 while the mask loads. */
export function alphaAt(img: HTMLImageElement, clientX: number, clientY: number) {
  const src = img.currentSrc || img.src;
  const mask = masks.get(src);
  if (!mask) {
    load(src);
    return 0;
  }
  if (mask === "loading") return 0;

  const rect = img.getBoundingClientRect();
  const px = Math.floor(((clientX - rect.left) / rect.width) * mask.w);
  const py = Math.floor(((clientY - rect.top) / rect.height) * mask.h);
  if (px < 0 || py < 0 || px >= mask.w || py >= mask.h) return 0;
  return mask.alpha[py * mask.w + px];
}
