import React, { useState, useMemo } from 'react';
import { Page, Flower, FlowerCategory } from '../types';
import { FLOWERS_DATA, CATEGORIES } from '../data/flowers';
import { FlowerCard } from '../components/FlowerCard';
import { Search, X, Sparkles, Filter, Heart, ArrowRight } from 'lucide-react';

interface CollectionPageProps {
  onNavigate: (page: Page) => void;
  onAddToBouquet: (flower: Flower) => void;
  onEnquire: (flower: Flower) => void;
  onOrderNow?: (flower: Flower) => void;
  bouquetItemIds: Set<string>;
  onOpenBouquet: () => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  onNavigate,
  onAddToBouquet,
  onEnquire,
  onOrderNow,
  bouquetItemIds,
  onOpenBouquet,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FlowerCategory>('All Flowers');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter flowers based on category and search query
  const filteredFlowers = useMemo(() => {
    return FLOWERS_DATA.filter((flower) => {
      const matchesCategory =
        selectedCategory === 'All Flowers' ||
        flower.categories.includes(selectedCategory);

      const matchesSearch =
        searchQuery.trim() === '' ||
        flower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flower.symbolizes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (flower.botanicalName &&
          flower.botanicalName.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="pt-24 pb-24 overflow-hidden">
      {/* Header Section */}
      <section id="collection-header" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#FCECEE] text-[#8C3B4E] border border-[#F2CAD1] text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#B45367]" />
          <span>Botanical Catalog & Floriography</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#2E2123] tracking-tight mb-4">
          Our Pretty <span className="italic font-normal text-[#B45367]">Collection</span>
        </h1>
        <p className="text-base sm:text-lg text-[#615052] font-light max-w-2xl mx-auto leading-relaxed">
          Discover each delicate blossom, uncover its historical symbolism, and hand-select your favorite stems to create a custom bouquet or gift arrangement.
        </p>
      </section>

      {/* Search & Category Filter Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#EDE1DD] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#988280]">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="flower-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by flower name (e.g. Peony, Rose, Lily)..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-[#E3D6D2] text-sm text-[#3E2F32] bg-[#FDFBF9] placeholder:text-[#A89694] focus:outline-hidden focus:ring-1 focus:ring-[#8C3B4E]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#988280] hover:text-[#3E2F32]"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick status */}
          <div className="flex items-center justify-between md:justify-end space-x-3 text-xs text-[#7B6869]">
            <span>
              Showing <strong className="text-[#3E2F32]">{filteredFlowers.length}</strong> of {FLOWERS_DATA.length} blooms
            </span>
            {bouquetItemIds.size > 0 && (
              <button
                onClick={onOpenBouquet}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#FCECEE] text-[#8C3B4E] font-medium hover:bg-[#F8D9DF] transition-colors"
              >
                <Heart className="w-3.5 h-3.5 fill-[#B45367]" />
                <span>{bouquetItemIds.size} in bouquet</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto py-4 scrollbar-none no-scrollbar">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#8C7573] shrink-0 mr-1 flex items-center space-x-1">
            <Filter className="w-3 h-3" />
            <span>Sentiment:</span>
          </span>
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                id={`category-tab-${category.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[#8C3B4E] text-white shadow-xs'
                    : 'bg-white hover:bg-[#F9ECEF]/70 text-[#5F4D4F] border border-[#E9DDD9]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      {/* Flower Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        {filteredFlowers.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#EDE0DC] p-8 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#FCECEE] mx-auto flex items-center justify-center text-3xl mb-4">
              🥀
            </div>
            <h3 className="font-serif text-2xl font-medium text-[#3E2F32] mb-2">
              No matching blooms found
            </h3>
            <p className="text-sm text-[#735F61] mb-6">
              We couldn't find any flower matching “{searchQuery}”. Try clearing your search or switching categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Flowers');
              }}
              className="px-6 py-2.5 rounded-full bg-[#8C3B4E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#722F3E] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredFlowers.map((flower) => (
              <FlowerCard
                key={flower.id}
                flower={flower}
                onAddToBouquet={onAddToBouquet}
                onEnquire={onEnquire}
                onOrderNow={onOrderNow}
                isInBouquet={bouquetItemIds.has(flower.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Floriography Guide Note Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF4F2] rounded-2xl p-8 border border-[#E7D6D0] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-serif text-2xl font-semibold text-[#3E2F32]">
              Looking for a rare botanical or custom stems?
            </h4>
            <p className="text-sm text-[#6C5B5D] max-w-xl font-light">
              We partner with specialized highland nurseries across India and international farms. If your desired bloom is not in our standard catalog, our master florist will source it for you.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-xl bg-[#2D2123] hover:bg-[#433538] text-white text-xs font-semibold uppercase tracking-wider whitespace-nowrap shadow-xs transition-colors flex items-center space-x-2"
          >
            <span>Request Custom Blooms</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
