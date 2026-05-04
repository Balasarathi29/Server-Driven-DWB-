"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, Loader2, X, ChevronDown, ChevronUp } from "lucide-react";
import {
  rateTemplate,
  getTemplateRatings,
  TemplateRating,
} from "@/lib/api/templates.api";
import { toast } from "sonner";

interface TemplateRatingModalProps {
  templateId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const TemplateRatingModal = ({
  templateId,
  isOpen,
  onClose,
}: TemplateRatingModalProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<TemplateRating[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadReviews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, templateId]);

  const loadReviews = async () => {
    try {
      setLoadingReviews(true);
      const data = await getTemplateRatings(templateId);
      setReviews(data);
    } catch (err) {
      console.error("Failed to load reviews", err);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    try {
      setLoading(true);
      await rateTemplate(templateId, rating, review);
      toast.success("Rating submitted successfully!");
      setRating(0);
      setReview("");
      await loadReviews();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to submit rating");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

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
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl shadow-2xl z-50 p-6 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Rate This Template
            </h2>

            {/* Rating Section */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                How would you rate this template?
              </label>
              <div className="flex gap-3 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(star)}
                    className="p-2 transition-all"
                  >
                    <Star
                      size={40}
                      className={`transition-all duration-200 ${
                        star <= (hover || rating)
                          ? "fill-yellow-400 text-yellow-400 drop-shadow-md"
                          : "text-gray-300"
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
              {rating > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center mt-3 text-sm font-medium text-gray-600"
                >
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Not Good"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </motion.p>
              )}
            </div>

            {/* Review Text */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Add a Review (Optional)
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value.slice(0, 300))}
                placeholder="Share your thoughts..."
                rows={4}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none text-sm"
              />
              <p className="text-xs text-gray-500 mt-1 text-right">
                {review.length}/300
              </p>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={loading || rating === 0}
              className="w-full px-4 py-3 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-gray-900 font-semibold rounded-lg transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Rating
                </>
              )}
            </motion.button>

            {/* Recent Reviews */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Latest Review
              </h3>

              {loadingReviews ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 size={20} className="animate-spin text-gray-400" />
                </div>
              ) : reviews.length === 0 ? (
                <p className="text-center text-sm text-gray-500 py-4">
                  No reviews yet. Be the first!
                </p>
              ) : showAllReviews ? (
                <div className="space-y-3">
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {reviews.map((review) => (
                      <motion.div
                        key={review._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={14}
                                className={
                                  star <= review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString(
                              undefined,
                              {
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </span>
                        </div>
                        {review.review && (
                          <p className="text-xs text-gray-700 leading-relaxed">
                            {review.review}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowAllReviews(false)}
                    className="w-full px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <ChevronUp size={14} />
                    Show Less
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            className={
                              star <= reviews[0].rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(reviews[0].createdAt).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </span>
                    </div>
                    {reviews[0].review && (
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {reviews[0].review}
                      </p>
                    )}
                  </motion.div>
                  {reviews.length > 1 && (
                    <button
                      onClick={() => setShowAllReviews(true)}
                      className="w-full px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <ChevronDown size={14} />
                      View All {reviews.length} Reviews
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
