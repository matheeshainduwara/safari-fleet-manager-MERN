/**
 * Cloudinary Upload Utility
 * Uploads images directly from the browser to Cloudinary using unsigned upload preset.
 * No backend required — credentials are safe because we only use Cloud Name + Upload Preset.
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Convert an image File object to WebP format using the browser Canvas API.
 * Drastically reduces file size while preserving high visual quality.
 * @param {File} file - Original image file (JPEG, PNG, etc.)
 * @param {number} quality - Compression quality between 0.1 and 1.0 (default 0.88)
 * @returns {Promise<File>} - Converted WebP File
 */
export function convertImageToWebP(file, quality = 0.88) {
  return new Promise((resolve) => {
    // Already WebP, or SVG vector format
    if (!file || file.type === "image/webp" || file.type === "image/svg+xml") {
      return resolve(file);
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (!blob) return resolve(file); // Fallback to original
            const baseName = file.name ? file.name.replace(/\.[^/.]+$/, "") : "image";
            const webpFile = new File([blob], `${baseName}.webp`, {
              type: "image/webp",
              lastModified: Date.now(),
            });
            resolve(webpFile);
          },
          "image/webp",
          quality
        );
      } catch (err) {
        console.warn("Canvas conversion to WebP failed, using original file:", err);
        resolve(file);
      }
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(objectUrl);
      console.warn("Image load failed for WebP conversion, using original file:", err);
      resolve(file);
    };

    img.src = objectUrl;
  });
}

/**
 * Upload a single image file to Cloudinary.
 * Automatically converts files to WebP format before upload for faster transfers and lower storage.
 * @param {File} file - The image File object from an <input type="file">
 * @param {Object} options - Optional extra params
 * @param {string} options.folder - Cloudinary folder path (e.g. "safari-portal/gallery")
 * @param {boolean} options.convertToWebP - Whether to convert to WebP (default true)
 * @param {number} options.quality - WebP quality 0.1-1.0 (default 0.88)
 * @param {Function} options.onProgress - Progress callback (0-100)
 * @returns {Promise<Object>} - Result object with url, public_id, etc.
 */
export async function uploadImage(file, options = {}) {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary is not configured. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env file."
    );
  }

  // Automatically convert to WebP before uploading to Cloudinary
  let fileToUpload = file;
  if (options.convertToWebP !== false && file instanceof File && file.type !== "image/webp") {
    try {
      fileToUpload = await convertImageToWebP(file, options.quality || 0.88);
    } catch (err) {
      console.warn("WebP conversion failed, proceeding with original:", err);
      fileToUpload = file;
    }
  }

  const formData = new FormData();
  formData.append("file", fileToUpload);
  formData.append("upload_preset", UPLOAD_PRESET);

  if (options.folder) {
    formData.append("folder", options.folder);
  }

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  // Use XMLHttpRequest to support upload progress tracking
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", url);

    // Track upload progress
    if (options.onProgress) {
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          options.onProgress(percent);
        }
      });
    }

    xhr.onload = () => {
      if (xhr.status === 200) {
        const result = JSON.parse(xhr.responseText);
        resolve(result);
      } else {
        const error = JSON.parse(xhr.responseText);
        reject(new Error(error.error?.message || "Upload failed"));
      }
    };

    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(formData);
  });
}

/**
 * Upload multiple images to Cloudinary in parallel.
 * @param {File[]} files - Array of File objects
 * @param {Object} options - Same options as uploadImage
 * @returns {Promise<Object[]>}
 */
export async function uploadMultipleImages(files, options = {}) {
  const uploads = files.map((file) => uploadImage(file, options));
  return Promise.all(uploads);
}

/**
 * Get a Cloudinary URL with optional transformations.
 * @param {string} publicId - The public_id from the upload result
 * @param {Object} transforms - Transformation options
 * @param {number} transforms.width - Resize width
 * @param {number} transforms.height - Resize height
 * @param {string} transforms.crop - Crop mode (e.g. 'fill', 'fit', 'thumb')
 * @param {number} transforms.quality - Quality (1-100 or 'auto')
 * @returns {string} - Transformed Cloudinary URL
 */
export function getCloudinaryUrl(publicId, transforms = {}) {
  const { width, height, crop = "fill", quality = "auto", format = "webp" } = transforms;

  const parts = [`f_${format}`, `q_${quality}`];
  if (width) parts.push(`w_${width}`);
  if (height) parts.push(`h_${height}`);
  if (width || height) parts.push(`c_${crop}`);

  const transformStr = parts.join(",");

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformStr}/${publicId}`;
}

/**
 * Get a thumbnail URL from a Cloudinary public_id.
 * @param {string} publicId
 * @param {number} size - Square size in pixels (default 300)
 */
export function getThumbnailUrl(publicId, size = 300) {
  return getCloudinaryUrl(publicId, { width: size, height: size, crop: "thumb" });
}
