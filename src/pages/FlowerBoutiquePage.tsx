import React, { useState, useMemo } from 'react';
import { Page, ReadyBouquet, BouquetOccasionFilter } from '../types';
import { READY_BOUQUETS, BOUQUET_OCCASION_FILTERS } from '../data/bouquets';
import { BouquetCard } from '../components/BouquetCard';
import { SafeImage } from '../components/SafeImage';
import blossomInterior from '../assets/images/blossom_interior_1790099402755.jpg';
import {
  Sparkles,
  Heart,
  Truck,
  CheckCircle2,
  ShieldCheck,
  Search,
  X,
  PhoneCall,
  Gift,
  ArrowRight
} from 'lucide-react';

interface FlowerBoutiquePageProps {
  onNavigate: (page: Page) => void;
  onAddToBouquet: (bouquet: ReadyBouquet) => void;
  onOrderNow: (bouquet: ReadyBouquet) => void;
  onOpenBouquet: () => void;
  bouquetCount: number;
}

export const FlowerBoutiquePage: React.FC<FlowerBoutiquePageProps> = ({
  onNavigate,
  onAddToBouquet,
  onOrderNow,
  onOpenBouquet,
  bouquetCount,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<BouquetOccasionFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter bouquets based on selected occasion and search input
  const filteredBouquets = useMemo(() => {
    return READY_BOUQUETS.filter((bq) => {
      const matchesOccasion =
        selectedFilter === 'All' || bq.occasions.includes(selectedFilter);

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        bq.name.toLowerCase().includes(query) ||
        bq.subtitle.toLowerCase().includes(query) ||
        bq.description.toLowerCase().includes(query) ||
        bq.includes.some((stem) => stem.toLowerCase().includes(query));

      return matchesOccasion && matchesSearch;
    });
  }, [selectedFilter, searchQuery]);

  return (
    <div className="pt-20 pb-24 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section id="boutique-hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#EBE1DC] min-h-[400px] sm:min-h-[460px] flex items-center">
          {/* Real Boutique Photography Background */}
          <div className="absolute inset-0 z-0">
            <SafeImage
              src={blossomInterior}
              alt="Blossom Flower Boutique Florist Interior"
              className="w-full h-full object-cover object-center"
            />
            {/* Atmospheric gradient overlay for typography clarity */}
            <div className="absolute inset-0 bg-linear-to-r from-[#211417]/92 via-[#291B1E]/80 to-black/35" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-2xl text-white">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-semibold uppercase tracking-wider text-[#FCECEE] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#E8A5B2]" />
              <span>Handcrafted Floral Arrangements</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4 leading-[1.12]">
              Beautiful Bouquets, <br />
              <span className="italic font-normal text-[#F2CAD1]">Made with Love</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-[#EFE3DF] font-light leading-relaxed mb-8 max-w-xl">
              Fresh flowers thoughtfully arranged for every beautiful moment. Each bouquet is hand-tied at dawn by our master florists in premium papers with pure silk ribbons.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  const el = document.getElementById('our-bouquet-collection');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-7 py-3.5 rounded-full bg-[#8C3B4E] hover:bg-[#722F3E] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-md transition-all duration-200 flex items-center space-x-2"
              >
                <span>Shop Bouquets</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {bouquetCount > 0 && (
                <button
                  onClick={onOpenBouquet}
                  className="px-5 py-3.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs sm:text-sm font-medium border border-white/40 transition-colors flex items-center space-x-2"
                >
                  <Heart className="w-4 h-4 fill-[#F2CAD1] text-[#F2CAD1]" />
                  <span>My Bouquet ({bouquetCount})</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. BOUTIQUE ASSURANCE PERKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#EDE0DC] shadow-xs flex items-center space-x-4">
            <div className="w-11 h-11 rounded-full bg-[#FCECEE] flex items-center justify-center shrink-0 text-[#8C3B4E]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#2E1F22]">Morning-Cut Farm Stems</h4>
              <p className="text-xs text-[#735F62]">Cut fresh daily & hydrated with botanical flower food</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EDE0DC] shadow-xs flex items-center space-x-4">
            <div className="w-11 h-11 rounded-full bg-[#F2F5ED] flex items-center justify-center shrink-0 text-[#5D7052]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#2E1F22]">Bespoke Florist Wrapping</h4>
              <p className="text-xs text-[#735F62]">Tied with luxurious silk ribbons and a wax-sealed note</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EDE0DC] shadow-xs flex items-center space-x-4">
            <div className="w-11 h-11 rounded-full bg-[#FBF5EC] flex items-center justify-center shrink-0 text-[#D8A776]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#2E1F22]">7-Day Freshness Guarantee</h4>
              <p className="text-xs text-[#735F62]">Guaranteed to stay radiant or we replace it free</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR BOUQUET COLLECTION */}
      <section id="our-bouquet-collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FCECEE] text-[#8C3B4E] border border-[#F2CAD1] text-xs font-semibold uppercase tracking-wider mb-3">
            <Gift className="w-3.5 h-3.5 text-[#B45367]" />
            <span>Ready-Made Arrangements</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#291B1E] tracking-tight mb-3">
            Our Bouquet <span className="italic font-normal text-[#B45367]">Collection</span>
          </h2>
          <p className="text-sm sm:text-base text-[#6E5C5E] font-light max-w-xl mx-auto">
            Choose from our signature hand-tied arrangements for romantic anniversaries, celebratory birthdays, or spontaneous gestures of love.
          </p>
        </div>

        {/* Search & Occasion Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EDE1DD] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#988280]">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="bouquet-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bouquet (e.g. Red Rose, Peony, Tulip, Lily)..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-[#E3D6D2] text-sm text-[#3E2F32] bg-[#FDFBF9] placeholder:text-[#A89694] focus:outline-hidden focus:ring-1 focus:ring-[#8C3B4E]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#988280] hover:text-[#3E2F32]"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Count Badge */}
          <div className="flex items-center justify-between md:justify-end space-x-3 text-xs text-[#7B6869]">
            <span>
              Showing <strong className="text-[#3E2F32]">{filteredBouquets.length}</strong> bouquets
            </span>
          </div>
        </div>

        {/* Occasion Filter Buttons: All | Romantic | Birthday | Anniversary | Celebration | Premium */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-2.5 mb-10">
          {BOUQUET_OCCASION_FILTERS.map((filter) => {
            const isActive = selectedFilter === filter;
            const count = filter === 'All'
              ? READY_BOUQUETS.length
              : READY_BOUQUETS.filter((b) => b.occasions.includes(filter)).length;

            return (
              <button
                key={filter}
                id={`filter-${filter.toLowerCase()}`}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-[#8C3B4E] text-white shadow-md font-semibold scale-103'
                    : 'bg-white hover:bg-[#F9ECEF]/70 text-[#5F4D4F] border border-[#E7D9D5]'
                }`}
              >
                <span>{filter}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
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

      {/* 4. CLEAN 3-COLUMN RESPONSIVE BOUQUET GRID (1-2 columns on smaller screens) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        {filteredBouquets.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#EDE0DC] p-8 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#FCECEE] mx-auto flex items-center justify-center text-3xl mb-4">
              💐
            </div>
            <h3 className="font-serif text-2xl font-medium text-[#3E2F32] mb-2">
              No matching bouquets found
            </h3>
            <p className="text-sm text-[#735F61] mb-6">
              We couldn’t find any bouquet matching “{searchQuery}”. Try clearing your search or picking another occasion.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('All');
              }}
              className="px-6 py-2.5 rounded-full bg-[#8C3B4E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#722F3E] transition-colors"
            >
              Show All Bouquets
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            {filteredBouquets.map((bouquet) => (
              <BouquetCard
                key={bouquet.id}
                bouquet={bouquet}
                onOrderNow={onOrderNow}
                onAddToBouquet={onAddToBouquet}
              />
            ))}
          </div>
        )}
      </section>

      {/* 5. CUSTOM BESPOKE BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF4F2] rounded-3xl p-8 sm:p-10 border border-[#E7D6D0] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#B45367]">
              Need A Custom Floral Design?
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2F2124]">
              Want a tailor-made bouquet or specific floral palette?
            </h3>
            <p className="text-sm text-[#6A575A] max-w-xl font-light">
              Our floral artisans can assemble personalized bouquets with specific stem counts, custom ribbon colors, or special imported varieties.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigate('collection')}
              className="px-5 py-3 rounded-xl bg-white hover:bg-[#FBF2F4] text-[#8C3B4E] border border-[#F2CAD1] text-xs font-semibold uppercase tracking-wider whitespace-nowrap shadow-xs transition-colors"
            >
              Build Stem-by-Stem
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-xl bg-[#2D2123] hover:bg-[#433538] text-white text-xs font-semibold uppercase tracking-wider whitespace-nowrap shadow-xs transition-colors flex items-center space-x-2 justify-center"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Talk to Our Florist</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. FLOATING CHECKOUT BAR (Visible when customer adds bouquets) */}
      {bouquetCount > 0 && (
        <aside aria-label="Selected bouquets summary" className="fixed bottom-6 inset-x-4 max-w-md mx-auto z-40">
          <div className="bg-[#2B1C1F]/95 backdrop-blur-md text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-white/20 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="w-10 h-10 rounded-xl bg-[#8C3B4E] flex items-center justify-center text-lg shadow-xs">
                💐
              </span>
              <div>
                <p className="text-[11px] text-[#E0CECA] uppercase tracking-wider font-medium">Ready to send?</p>
                <p className="text-sm font-serif font-bold text-white">
                  {bouquetCount} {bouquetCount === 1 ? 'Bouquet' : 'Bouquets'} in basket
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenBouquet}
                className="px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-medium text-white transition-colors"
              >
                View
              </button>
              <button
                id="floating-book-delivery-btn"
                onClick={() => onNavigate('checkout')}
                className="px-4 py-2 rounded-xl bg-[#8C3B4E] hover:bg-[#A14156] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm flex items-center space-x-1"
              >
                <span>Book Delivery →</span>
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};
