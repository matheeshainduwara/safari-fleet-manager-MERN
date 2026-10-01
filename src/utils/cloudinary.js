/**
 * Cloudinary Upload Utility
 * Uploads images directly from the browser to Cloudinary using unsigned upload preset.
 * No backend required — credentials are safe because we only use Cloud Name + Upload Preset.
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Upload a single image file to Cloudinary.
 * @param {File} file - The image File object from an <input type="file">
 * @param {Object} options - Optional extra params
 * @param {string} options.folder - Cloudinary folder path (e.g. "safari-portal/gallery")
 * @param {Function} options.onProgress - Progress callback (0-100)
 * @returns {Promise<Object>} - Result object with url, public_id, etc.
 */
export async function uploadImage(file, options = {}) {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary is not configured. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env file."
    );
  }

  const formData = new FormData();
  formData.append("file", file);
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
  const { width, height, crop = "fill", quality = "auto" } = transforms;

  const parts = [`q_${quality}`];
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
