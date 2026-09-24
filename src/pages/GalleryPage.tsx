import React, { useState, useMemo } from 'react';
import { GalleryItem, GalleryCategory } from '../types';
import { GALLERY_ITEMS } from '../data/gallery';
import { LightboxModal } from '../components/LightboxModal';
import { SafeImage } from '../components/SafeImage';
import { Sparkles, ZoomIn, Camera, Flower2 } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories: GalleryCategory[] = [
    'All',
    'Boutique & Interior',
    'Bouquets & Gifts',
    'Romantic Moments',
    'Weddings & Events',
  ];

  // Category descriptions for boutique storytelling
  const categorySubtitles: Record<GalleryCategory, string> = {
    All: 'A curated visual journey through our boutique spaces, bespoke gift bouquets, romantic celebrations, and grand event florals.',
    'Boutique & Interior': 'Step inside our sunlit boutique, artisan greeting counters, wooden display shelves, and florist worktables.',
    'Bouquets & Gifts': 'Freshly cut roses, peonies, carnations, lavender, daffodils, iris, and luxury gift boxes wrapped with silk ribbons.',
    'Romantic Moments': 'Intimate candlelight dinners, heartfelt flower surprises, and velvety crimson rose compositions.',
    'Weddings & Events': 'Opulent bridal bouquets, floral runners, ceremony entrance archways, and bridesmaid posies.',
  };

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') {
      return GALLERY_ITEMS;
    }
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const currentIndex = selectedItem
    ? filteredItems.findIndex((item) => item.id === selectedItem.id)
    : -1;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedItem(filteredItems[currentIndex - 1]);
    } else {
      setSelectedItem(filteredItems[filteredItems.length - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      setSelectedItem(filteredItems[currentIndex + 1]);
    } else {
      setSelectedItem(filteredItems[0]);
    }
  };

  return (
    <div className="pt-24 pb-24 overflow-hidden">
      {/* Header Section */}
      <section id="gallery-header" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#FCECEE] text-[#8C3B4E] border border-[#F2CAD1] text-xs font-semibold uppercase tracking-wider mb-4">
          <Camera className="w-3.5 h-3.5 text-[#B45367]" />
          <span>Real Boutique Photography</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#2E2123] tracking-tight mb-4">
          A Little Glimpse of <span className="italic font-normal text-[#B45367]">Blossom</span>
        </h1>
        <p className="text-base sm:text-lg text-[#615052] font-light max-w-2xl mx-auto leading-relaxed">
          {categorySubtitles[activeCategory]}
        </p>
      </section>

      {/* Filter Tabs Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 py-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const count = cat === 'All'
              ? GALLERY_ITEMS.length
              : GALLERY_ITEMS.filter((i) => i.category === cat).length;

            return (
              <button
                key={cat}
                id={`gallery-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 flex items-center space-x-2 ${
                  isActive
                    ? 'bg-[#8C3B4E] text-white shadow-md font-semibold scale-105 ring-2 ring-[#8C3B4E]/20'
                    : 'bg-white hover:bg-[#F9ECEF]/80 text-[#5F4D4F] border border-[#E9DDD9] hover:border-[#E0CAD0]'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold transition-colors ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#F2E5E2] text-[#7A5F62]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Responsive Grid Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-2xl overflow-hidden bg-white border border-[#EFE4E0] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col transform hover:-translate-y-1"
            >
              {/* Image Container with Natural Ratio */}
              <div className="relative overflow-hidden aspect-4/3 bg-[#F7F2EF]">
                <SafeImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Category Badge Floating Top Left */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md text-[11px] font-medium text-white shadow-xs">
                    <Flower2 className="w-3 h-3 text-[#F2CAD1]" />
                    <span>{item.category}</span>
                  </span>
                </div>

                {/* Zoom Hint Icon Floating Top Right */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/85 backdrop-blur-xs text-[#543F42] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                  <ZoomIn className="w-4 h-4 text-[#8C3B4E]" />
                </div>

                {/* Dark Vignette Overlay on Hover */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span className="text-xs text-white/90 font-medium flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-[#E8B5BE]" />
                    <span>Click to expand high-resolution view</span>
                  </span>
                </div>
              </div>

              {/* Item Details Card Footer */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white border-t border-[#F5EBE8]">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#2D2123] group-hover:text-[#8C3B4E] transition-colors mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6A5A5C] font-light line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#EBE0DC] p-8 max-w-md mx-auto">
            <p className="font-serif text-xl text-[#4A3E3D] mb-2">No photographs found</p>
            <p className="text-sm text-[#7D6B6A]">Please choose another category to view our gallery.</p>
          </div>
        )}
      </section>

      {/* Working Lightbox Modal */}
      <LightboxModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};
