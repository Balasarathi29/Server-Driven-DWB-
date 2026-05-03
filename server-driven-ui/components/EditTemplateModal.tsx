"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Lock, Globe } from "lucide-react";
import { toast } from "sonner";
import { Template, updateTemplate } from "@/lib/api/templates.api";

interface EditTemplateModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (updatedTemplate: Template) => void;
}

const CATEGORIES = [
  "homepage",
  "about",
  "courses",
  "departments",
  "contact",
  "blog",
  "events",
  "custom",
];

export function EditTemplateModal({
  template,
  isOpen,
  onClose,
  onSuccess,
}: EditTemplateModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "custom",
    isPublic: true,
  });

  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  // Update form data when template changes
  useEffect(() => {
    if (template) {
      setFormData({
        name: template.name,
        description: template.description,
        category: template.category,
        isPublic: template.isPublic,
      });
      setThumbnailUrl(template.thumbnail || null);
    }
  }, [template, isOpen]);

  // Reset loading state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setLoading(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!template) return;

    if (!formData.name.trim()) {
      toast.error("Template name is required");
      return;
    }

    try {
      setLoading(true);
      const payload: any = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        isPublic: formData.isPublic,
      };

      if (thumbnailUrl) payload.thumbnail = thumbnailUrl;

      const updated = await updateTemplate(template._id, payload);

      toast.success("Template updated successfully");
      onSuccess?.(updated);
      onClose();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update template");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailUrl(reader.result as string);
      toast.success("Thumbnail selected");
    };
    reader.onerror = () => {
      toast.error("Failed to read thumbnail image");
    };
    reader.readAsDataURL(file);
  };

  const handleThumbnailUrlChange = (value: string) => {
    setThumbnailUrl(value || null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
                <h2 className="text-xl font-bold text-gray-900">
                  Edit Template
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <form
                onSubmit={handleSubmit}
                className="flex-1 overflow-y-auto modern-scrollbar"
              >
                <div className="p-6 space-y-4">
                  {/* Template Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Template Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter template name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Enter template description"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Visibility Toggle */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isPublic}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isPublic: e.target.checked,
                          })
                        }
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <div className="flex items-center gap-2">
                        {formData.isPublic ? (
                          <>
                            <Globe size={16} className="text-green-600" />
                            <span className="text-sm font-medium text-gray-900">
                              Public Template
                            </span>
                            <span className="text-xs text-gray-600">
                              (visible to everyone)
                            </span>
                          </>
                        ) : (
                          <>
                            <Lock size={16} className="text-orange-600" />
                            <span className="text-sm font-medium text-gray-900">
                              Private Template
                            </span>
                            <span className="text-xs text-gray-600">
                              (only you can see)
                            </span>
                          </>
                        )}
                      </div>
                    </label>
                  </div>

                  {/* Thumbnail */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thumbnail (upload or URL)
                    </label>
                    <div className="space-y-3">
                      {/* File Upload Button */}
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="thumbnail-upload"
                        />
                        <label
                          htmlFor="thumbnail-upload"
                          className="block w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all text-sm text-gray-600 font-medium"
                        >
                          {loading ? "Uploading..." : "Click to upload image"}
                        </label>
                      </div>

                      {/* URL Input */}
                      <div>
                        <input
                          type="text"
                          value={thumbnailUrl || ""}
                          onChange={(e) =>
                            handleThumbnailUrlChange(e.target.value)
                          }
                          placeholder="Or paste image URL"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Thumbnail Preview */}
                    {thumbnailUrl && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-2 font-medium">
                          Preview:
                        </p>
                        <img
                          src={thumbnailUrl}
                          alt="thumbnail preview"
                          className="w-full max-w-xs h-32 object-cover rounded-md border border-gray-200"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </form>

              {/* Buttons */}
              <div className="flex gap-3 p-6 border-t border-gray-200 flex-shrink-0 bg-white">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  Update Template
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
