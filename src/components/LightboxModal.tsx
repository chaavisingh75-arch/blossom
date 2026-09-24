import React, { useEffect } from 'react';
import { GalleryItem } from '../types';
import { X, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md transition-all animate-in fade-in duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
        aria-label="Close image lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Navigation Button */}
      {onPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors hidden sm:flex items-center justify-center"
          aria-label="Previous gallery image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next Navigation Button */}
      {onNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors hidden sm:flex items-center justify-center"
          aria-label="Next gallery image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Modal Container */}
      <div
        className="relative max-w-4xl w-full max-h-[90vh] bg-[#FCF9F6] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/20 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Large Image */}
        <div className="md:w-3/5 bg-black/20 flex items-center justify-center max-h-[60vh] md:max-h-[85vh] overflow-hidden">
          <SafeImage
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover md:object-contain max-h-[80vh]"
          />
        </div>

        {/* Details & Caption */}
        <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-[#FCF9F6]">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#F7E7E9] text-[#8C3B4E] text-xs font-semibold uppercase tracking-wider flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-[#B45367]" />
                <span>{item.category}</span>
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#3E2F32] mb-3 leading-snug">
              {item.title}
            </h3>

            <p className="text-sm text-[#615052] leading-relaxed font-light mb-6">
              {item.description}
            </p>
          </div>

          <div className="pt-4 border-t border-[#EFE5E1] flex items-center justify-between text-xs text-[#8A7675]">
            <span className="font-serif italic">Blossom Boutique Visual Archive</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={onPrev}
                className="p-1.5 rounded-lg hover:bg-[#F2E5E2] transition-colors"
                title="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={onNext}
                className="p-1.5 rounded-lg hover:bg-[#F2E5E2] transition-colors"
                title="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
