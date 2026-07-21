export const TARGET_REPORT_PHOTO_SIZE_BYTES = 1024 * 1024;

const MAX_REPORT_PHOTO_DIMENSION = 2048;
const JPEG_QUALITY_STEPS = [0.82, 0.72, 0.62, 0.52] as const;

export interface PreparedReportPhoto {
  data: Blob;
  filename: string;
}

function getPreparedFilename(contentType: string): string {
  switch (contentType.toLowerCase()) {
    case "image/png":
      return "report-photo.png";
    case "image/webp":
      return "report-photo.webp";
    case "image/heic":
      return "report-photo.heic";
    case "image/heif":
      return "report-photo.heif";
    default:
      return "report-photo.jpg";
  }
}

function loadPhoto(objectUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Photo decoding failed."));
    image.src = objectUrl;
  });
}

function encodeJpeg(
  canvas: HTMLCanvasElement,
  quality: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
          return;
        }

        reject(new Error("Photo encoding failed."));
      },
      "image/jpeg",
      quality,
    );
  });
}

export async function prepareReportPhotoForSubmission(
  photo: File,
): Promise<PreparedReportPhoto> {
  if (photo.size <= TARGET_REPORT_PHOTO_SIZE_BYTES) {
    return {
      data: new Blob([await photo.arrayBuffer()], { type: photo.type }),
      filename: getPreparedFilename(photo.type),
    };
  }

  const objectUrl = URL.createObjectURL(photo);

  try {
    const image = await loadPhoto(objectUrl);
    const longestEdge = Math.max(image.naturalWidth, image.naturalHeight);

    if (longestEdge <= 0) {
      throw new Error("Photo dimensions are invalid.");
    }

    const scale = Math.min(1, MAX_REPORT_PHOTO_DIMENSION / longestEdge);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Photo canvas is unavailable.");
    }

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    let smallestPhoto: Blob | null = null;

    for (const quality of JPEG_QUALITY_STEPS) {
      const candidate = await encodeJpeg(canvas, quality);

      if (!smallestPhoto || candidate.size < smallestPhoto.size) {
        smallestPhoto = candidate;
      }

      if (candidate.size <= TARGET_REPORT_PHOTO_SIZE_BYTES) {
        return { data: candidate, filename: "report-photo.jpg" };
      }
    }

    if (smallestPhoto && smallestPhoto.size < photo.size) {
      return { data: smallestPhoto, filename: "report-photo.jpg" };
    }

    return {
      data: new Blob([await photo.arrayBuffer()], { type: photo.type }),
      filename: getPreparedFilename(photo.type),
    };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
