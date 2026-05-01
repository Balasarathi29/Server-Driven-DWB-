"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, AlertTriangle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Template, deleteTemplate } from "@/lib/api/templates.api";

interface DeleteTemplateModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function DeleteTemplateModal({
  template,
  isOpen,
  onClose,
  onSuccess,
}: DeleteTemplateModalProps) {
  const [loading, setLoading] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  // Reset form when modal closes or template changes
  useEffect(() => {
    if (!isOpen) {
      setLoading(false);
      setConfirmText("");
    } else if (template) {
      setConfirmText("");
    }
  }, [isOpen, template?._id]);

  const handleDelete = async () => {
    if (!template) return;

    if (confirmText !== template.name) {
      toast.error(`Please type "${template.name}" to confirm deletion`);
      return;
    }

    try {
      setLoading(true);
      await deleteTemplate(template._id);
      toast.success("Template deleted successfully");
      onSuccess?.();
      onClose();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete template");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && template && (
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
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Delete Template
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Warning */}
                <div className="flex gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                  <AlertTriangle
                    size={20}
                    className="text-red-600 mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="font-medium text-red-900">
                      This action cannot be undone
                    </p>
                    <p className="text-sm text-red-700">
                      The template "{template.name}" will be permanently
                      deleted.
                    </p>
                  </div>
                </div>

                {/* Confirmation */}
                <div>
                  <p className="text-sm text-gray-700 mb-3">
                    Type <strong className="font-bold">{template.name}</strong>{" "}
                    below to confirm:
                  </p>
                  <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder={`Type "${template.name}" to confirm`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  />
                </div>

                {/* Template Info */}
                <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600">
                  <p className="font-medium text-gray-900 mb-1">
                    {template.name}
                  </p>
                  <p className="line-clamp-2">{template.description}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Category:{" "}
                    <span className="capitalize">{template.category}</span>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={loading || confirmText !== template.name}
                    className="flex-1 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    {!loading && <Trash2 size={16} />}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
