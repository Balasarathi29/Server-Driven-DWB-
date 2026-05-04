"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  AlertCircle,
  Loader2,
  Copy,
  Lock,
  Globe,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import { getSharedTemplate, Template } from "@/lib/api/templates.api";
import { TemplatePreviewIframe } from "@/components/TemplatePreviewIframe";

export default function SharedTemplatePage() {
  const params = useParams();
  const shareCode = params.shareCode as string;
  const accessLevel = new URL(window.location.href).searchParams.get(
    "access",
  ) as "view" | "use" | "edit" | null;

  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedTemplate = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getSharedTemplate(shareCode);
        setTemplate(data);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            "Failed to load shared template. The link may have expired or been revoked.",
        );
        toast.error("Failed to load shared template");
      } finally {
        setLoading(false);
      }
    };

    if (shareCode) {
      fetchSharedTemplate();
    }
  }, [shareCode]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">
            Loading shared template...
          </p>
        </div>
      </div>
    );
  }

  if (error || !template) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Template Not Found
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={18} />
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>

          <div className="mt-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {template.name}
            </h1>
            <p className="text-gray-600">{template.description}</p>
          </div>

          {/* Template Info */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Category</p>
              <p className="text-sm font-semibold text-gray-900 capitalize">
                {template.category}
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                {template.isPublic ? (
                  <>
                    <Globe size={14} />
                    Visibility
                  </>
                ) : (
                  <>
                    <Lock size={14} />
                    Visibility
                  </>
                )}
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {template.isPublic ? "Public" : "Private"}
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                <Calendar size={14} />
                Created
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {new Date(template.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Access Level</p>
              <p className="text-sm font-semibold text-blue-600 capitalize">
                {accessLevel || "View"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Preview</h2>

            {template.thumbnail ? (
              <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full max-h-96 object-cover"
                />
              </div>
            ) : (
              <div className="mb-8 w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">No preview available</p>
              </div>
            )}

            {/* Additional Info */}
            <div className="space-y-4">
              {template.tags && template.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-gray-600 text-sm">Views</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {template.viewCount}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-sm">Shares</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {template.shareCount}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-sm">Rating</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {template.ratingScore > 0
                      ? template.ratingScore.toFixed(1)
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
