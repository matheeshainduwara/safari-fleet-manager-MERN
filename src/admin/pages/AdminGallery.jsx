import { useState, useEffect } from 'react';
import { uploadImage, convertImageToWebP } from '../../utils/cloudinary';
import {
  FiPlus,
  FiTrash2,
  FiUploadCloud,
  FiLink,
  FiSearch,
  FiFilter,
  FiCheckCircle,
  FiAlertCircle,
  FiImage,
  FiRefreshCw,
  FiX,
} from 'react-icons/fi';

const TAGS = ['All', 'Leopard', 'Elephants', 'Birds', 'Sloth Bear', 'On Safari', 'Landscape', 'Other'];

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Filtering & Search
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [uploadMode, setUploadMode] = useState('file'); // 'file' | 'url'
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [form, setForm] = useState({
    title: '',
    tag: 'Leopard',
    desc: '',
    imageUrl: '',
    file: null,
    preview: null,
  });

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // 1. Fetch images from MongoDB
  const fetchImages = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setImages(data);
      } else {
        throw new Error(data.error || 'Failed to fetch gallery images');
      }
    } catch (err) {
      setError(err.message || 'Could not load gallery from server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle local file selection with automatic WebP conversion
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const webpFile = await convertImageToWebP(file);
      const preview = URL.createObjectURL(webpFile);
      setForm((f) => ({ ...f, file: webpFile, preview }));
    } catch {
      const preview = URL.createObjectURL(file);
      setForm((f) => ({ ...f, file, preview }));
    }
  };

  // Convert File to Base64 (fallback if Cloudinary is not configured)
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // 2. Handle Add / Upload to MongoDB
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Please provide a title for the image');
      return;
    }

    if (uploadMode === 'file' && !form.file) {
      setError('Please choose an image file to upload');
      return;
    }

    if (uploadMode === 'url' && !form.imageUrl.trim()) {
      setError('Please provide an image URL');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');
    setUploadProgress(0);

    try {
      let finalImageUrl = form.imageUrl.trim();
      let publicId = '';

      // If uploading a file, try Cloudinary first if configured
      if (uploadMode === 'file' && form.file) {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const isCloudinaryConfigured = cloudName && cloudName !== 'your-cloud-name-here';

        if (isCloudinaryConfigured) {
          try {
            const uploadRes = await uploadImage(form.file, {
              folder: 'safari-portal/gallery',
              onProgress: (pct) => setUploadProgress(pct),
            });
            finalImageUrl = uploadRes.secure_url;
            publicId = uploadRes.public_id;
          } catch (cloudErr) {
            console.warn('Cloudinary upload failed, falling back to local base64 storage:', cloudErr);
            const webpFile = await convertImageToWebP(form.file);
            finalImageUrl = await fileToBase64(webpFile);
          }
        } else {
          // Cloudinary not configured: store as WebP data URL directly in MongoDB
          const webpFile = await convertImageToWebP(form.file);
          finalImageUrl = await fileToBase64(webpFile);
        }
      }

      // Save record to MongoDB via Express API
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title.trim(),
          tag: form.tag,
          desc: form.desc.trim(),
          imageUrl: finalImageUrl,
          publicId,
        }),
      });

      const savedImage = await res.json();

      if (!res.ok) {
        throw new Error(savedImage.error || 'Failed to save image to MongoDB');
      }

      // Prepend the new MongoDB document to state
      setImages((prev) => [savedImage, ...prev]);
      setSuccess(`"${savedImage.title}" added to MongoDB successfully!`);
      setForm({ title: '', tag: 'Leopard', desc: '', imageUrl: '', file: null, preview: null });
      setShowForm(false);
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError(err.message || 'Error saving image');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // 3. Handle Delete from MongoDB
  const handleDelete = async (target) => {
    if (!target) return;
    const targetId = target._id || target.id;
    setDeleting(true);
    try {
      const res = await fetch(`/api/gallery/${targetId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete image');
      }

      setImages((prev) => prev.filter((img) => (img._id || img.id) !== targetId));
      setDeleteTarget(null);
      setSuccess(`Image deleted from MongoDB successfully.`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete image');
    } finally {
      setDeleting(false);
    }
  };

  // Filtered list based on search and tag
  const filteredImages = images.filter((img) => {
    const matchesTag = selectedTag === 'All' || img.tag === selectedTag;
    const matchesQuery =
      !searchQuery ||
      img.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.desc?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesQuery;
  });

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>Gallery Management</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium">
              MongoDB Live
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            {images.length} images stored in MongoDB Atlas · Manage live photos across the portal
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchImages}
            disabled={loading}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-all border border-white/5"
            title="Refresh from MongoDB"
          >
            <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
          </button>

          <button
            onClick={() => {
              setShowForm(!showForm);
              setError('');
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_25px_rgba(52,211,153,0.5)] active:scale-95"
          >
            {showForm ? <FiX className="w-4 h-4" /> : <FiPlus className="w-4 h-4" />}
            <span>{showForm ? 'Close Form' : 'Add New Image'}</span>
          </button>
        </div>
      </div>

      {/* Alert Notices */}
      {error && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiAlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError('')} className="text-red-400 hover:text-white">
            <FiX className="w-4 h-4" />
          </button>
        </div>
      )}

      {success && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs flex items-center gap-2">
          <FiCheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Add New Image Form Modal / Drawer */}
      {showForm && (
        <div className="bg-[#0f1712] border border-emerald-500/25 rounded-2xl p-5 sm:p-6 shadow-2xl relative">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/5">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <FiImage className="w-4 h-4 text-emerald-400" />
                <span>Save New Image to MongoDB</span>
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Upload image file or provide direct image URL
              </p>
            </div>

            {/* Mode Toggle */}
            <div className="flex rounded-lg bg-black/40 p-1 border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setUploadMode('file')}
                className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                  uploadMode === 'file' ? 'bg-emerald-600 text-white font-medium shadow-sm' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <FiUploadCloud className="w-3.5 h-3.5" />
                <span>Upload File</span>
              </button>
              <button
                type="button"
                onClick={() => setUploadMode('url')}
                className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                  uploadMode === 'url' ? 'bg-emerald-600 text-white font-medium shadow-sm' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <FiLink className="w-3.5 h-3.5" />
                <span>Image URL</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleAdd} className="grid sm:grid-cols-2 gap-5">
            {/* Left Column: Image Source Preview / Dropzone */}
            <div className="sm:row-span-3 flex flex-col justify-between">
              {uploadMode === 'file' ? (
                <label
                  className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer transition-all min-h-[220px] h-full relative overflow-hidden ${
                    form.preview ? 'border-emerald-500/50 bg-black/30' : 'border-white/15 hover:border-emerald-500/40 bg-white/[0.02]'
                  }`}
                >
                  {form.preview ? (
                    <div className="relative w-full h-full min-h-[220px] flex items-center justify-center">
                      <img src={form.preview} alt="preview" className="w-full h-full object-cover max-h-[250px]" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-semibold text-white gap-1.5 backdrop-blur-xs">
                        <FiUploadCloud className="w-4 h-4 text-emerald-400" />
                        <span>Click to Change File</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2.5 p-6 text-center">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <FiUploadCloud className="w-6 h-6" />
                      </div>
                      <p className="text-xs font-semibold text-white">Click or drag image to upload</p>
                      <p className="text-[10px] text-neutral-400">Supports JPG, PNG, WEBP (Max 10MB) · Auto-converts to WebP</p>
                    </div>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
                </label>
              ) : (
                <div className="space-y-3 flex flex-col justify-between h-full">
                  <div className="space-y-1.5">
                    <label className="text-xs text-neutral-300 font-semibold uppercase tracking-wider">
                      Image Direct Link *
                    </label>
                    <input
                      type="url"
                      value={form.imageUrl}
                      onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-[#090d0b] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                    />
                  </div>

                  <div className="h-44 rounded-xl border border-white/10 bg-[#090d0b] flex items-center justify-center overflow-hidden">
                    {form.imageUrl ? (
                      <img
                        src={form.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={() => setError('Invalid image URL or image failed to load')}
                      />
                    ) : (
                      <div className="text-center text-neutral-500 text-xs flex flex-col items-center gap-1.5">
                        <FiImage className="w-5 h-5 text-neutral-600" />
                        <span>Image preview will appear here</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Metadata Fields */}
            <div className="space-y-1">
              <label className="text-[11px] text-neutral-300 font-semibold uppercase tracking-wider">Title *</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Sri Lankan Leopard at Sunset"
                className="w-full bg-[#090d0b] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-neutral-300 font-semibold uppercase tracking-wider">Category Tag</label>
              <select
                value={form.tag}
                onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
                className="w-full bg-[#090d0b] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
              >
                {TAGS.filter((t) => t !== 'All').map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-neutral-300 font-semibold uppercase tracking-wider">
                Location / Caption
              </label>
              <input
                value={form.desc}
                onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
                placeholder="e.g. Yala National Park, Block 1"
                className="w-full bg-[#090d0b] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
              />
            </div>

            {/* Upload Progress Bar if active */}
            {uploading && uploadProgress > 0 && (
              <div className="sm:col-span-2 space-y-1.5">
                <div className="flex justify-between text-[11px] text-neutral-400">
                  <span>Uploading to Cloud Storage...</span>
                  <span className="font-mono text-emerald-400">{uploadProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="sm:col-span-2 flex gap-3 justify-end pt-3 border-t border-white/5">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs sm:text-sm font-medium transition-all border border-white/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)] flex items-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving to MongoDB...</span>
                  </>
                ) : (
                  <span>Save to MongoDB</span>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 rounded-2xl bg-[#0f1712] border border-white/5">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or location..."
            className="w-full bg-[#080d0a] border border-white/10 rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400 transition-all"
          />
        </div>

        {/* Tag Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Image Grid */}
      {loading ? (
        <div className="py-24 text-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-neutral-400">Loading gallery records from MongoDB Atlas...</p>
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="py-20 text-center rounded-2xl border border-dashed border-white/10 bg-[#0f1712]/50 p-8">
          <FiImage className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
          <h3 className="text-white text-sm font-semibold">No images found</h3>
          <p className="text-neutral-500 text-xs mt-1 max-w-sm mx-auto">
            {searchQuery || selectedTag !== 'All'
              ? 'Try clearing your search query or selecting a different category tag.'
              : 'Your MongoDB gallery collection is empty. Click "Add New Image" above to save your first photo.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredImages.map((img) => {
            const id = img._id || img.id;
            const src = img.imageUrl || img.src;

            return (
              <div
                key={id}
                className="group relative bg-[#0f1712] border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition-all flex flex-col justify-between shadow-lg"
              >
                {/* Image Container */}
                <div className="aspect-square w-full overflow-hidden relative bg-[#080d0a]">
                  <img
                    src={src}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Delete Button */}
                  <button
                    onClick={() => setDeleteTarget(img)}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-lg bg-red-600/85 hover:bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md active:scale-95"
                    title="Delete from MongoDB"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Metadata */}
                <div className="p-3.5 space-y-1">
                  <p className="text-xs font-semibold text-white truncate" title={img.title}>
                    {img.title}
                  </p>
                  <p className="text-[11px] text-neutral-400 truncate" title={img.desc}>
                    {img.desc || 'Yala National Park'}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">
                      {img.tag || 'Other'}
                    </span>
                    <span className="text-[9px] font-mono text-neutral-500">
                      {img.createdAt ? new Date(img.createdAt).toLocaleDateString() : 'Active'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="bg-[#0f1712] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-red-500/20">
              <FiTrash2 className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-white font-bold text-center text-base mb-1.5">Delete Gallery Image?</h3>
            <p className="text-neutral-400 text-xs text-center mb-5 leading-normal">
              Are you sure you want to delete <strong className="text-white">"{deleteTarget.title}"</strong> from MongoDB? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-medium border border-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={() => handleDelete(deleteTarget)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-red-900/30"
              >
                {deleting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Yes, Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
