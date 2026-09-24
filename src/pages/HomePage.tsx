import React from 'react';
import { Page, Flower, ReadyBouquet } from '../types';
import { FLOWERS_DATA } from '../data/flowers';
import { READY_BOUQUETS } from '../data/bouquets';
import { FlowerCard } from '../components/FlowerCard';
import { SafeImage } from '../components/SafeImage';
import { 
  ArrowRight, 
  Sparkles, 
  Heart, 
  Leaf, 
  Gift, 
  MapPin, 
  Instagram, 
  Compass,
  CheckCircle2,
  Calendar,
  Store
} from 'lucide-react';

// Real boutique assets
import blossomInterior from '../assets/images/blossom_interior_1790099402755.jpg';
import blossomExterior from '../assets/images/blossom_exterior_1790099414638.jpg';
import customerBouquet from '../assets/images/customer_bouquet_1790099452312.jpg';
import floristArranging from '../assets/images/florist_arranging_1790099432954.jpg';
import peonyPhoto from '../assets/images/flower_peony_1790135911997.jpg';
import rosePhoto from '../assets/images/flower_rose_1790136029005.jpg';
import sunflowerPhoto from '../assets/images/flower_sunflower_1790136064134.jpg';
import lavenderPhoto from '../assets/images/flower_lavender_1790136040524.jpg';
import giftBoxPhoto from '../assets/images/gallery_gift_box_1790140307216.jpg';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onAddToBouquet: (flower: Flower) => void;
  onEnquire: (flower: Flower) => void;
  onOrderNow?: (bouquet: ReadyBouquet) => void;
  onOrderFlower?: (flower: Flower) => void;
  bouquetItemIds: Set<string>;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onAddToBouquet,
  onEnquire,
  onOrderNow,
  onOrderFlower,
  bouquetItemIds,
}) => {
  const featuredFlowers = FLOWERS_DATA.filter((f) => f.featured).slice(0, 6);

  // Flower of the Day (Lavender)
  const flowerOfTheDay = FLOWERS_DATA.find((f) => f.id === 'lavender') || FLOWERS_DATA[4];

  // Made With Love - 3 Featured Bouquets
  const featuredBouquets = [
    {
      id: 'romance-bouquet',
      name: 'The Romance Bouquet',
      subtitle: 'Roses, peonies and baby’s breath',
      description: 'A decadent harmony of blushing garden peonies, deep velvet Damask roses, and clouds of baby’s breath hand-tied with raw blush silk.',
      image: giftBoxPhoto,
      tag: 'Bestseller'
    },
    {
      id: 'sunshine-bouquet',
      name: 'The Sunshine Bouquet',
      subtitle: 'Sunflowers, daisies and seasonal blooms',
      description: 'Luminous golden sunflowers paired with crisp white English daisies and fresh chamomile stems to bring warmth to any heart.',
      image: sunflowerPhoto,
      tag: 'Joyful'
    },
    {
      id: 'lavender-dream',
      name: 'The Lavender Dream',
      subtitle: 'Lavender, white flowers and soft greenery',
      description: 'A soothing, fragrant bouquet of French lavender spikes, ethereal white lisianthus, and eucalyptus sprigs for pure tranquility.',
      image: lavenderPhoto,
      tag: 'Calming'
    }
  ];

  // Instagram Feed 6 photos
  const instagramPhotos = [
    {
      id: 'insta-1',
      image: customerBouquet,
      caption: 'A bouquet of pure joy on a sunny morning in Jodhpur 💐✨',
      likes: '482'
    },
    {
      id: 'insta-2',
      image: rosePhoto,
      caption: 'Velvety Damask roses freshly delivered from our morning harvest 🌹',
      likes: '620'
    },
    {
      id: 'insta-3',
      image: blossomInterior,
      caption: 'Welcome into our warm sanctuary of scent and color 🌸🪴',
      likes: '935'
    },
    {
      id: 'insta-4',
      image: floristArranging,
      caption: 'Tying each silk ribbon with handwritten calligraphy cards 💌',
      likes: '394'
    },
    {
      id: 'insta-5',
      image: peonyPhoto,
      caption: 'Peak peony season is here! Luscious Sarah Bernhardt blooms 🌺',
      likes: '811'
    },
    {
      id: 'insta-6',
      image: blossomExterior,
      caption: 'Our storefront in full bloom. Step inside and let your heart bloom 🌷✨',
      likes: '1.2k'
    }
  ];

  return (
    <div className="relative pt-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section id="home-hero-section" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FCECEE] text-[#8C3B4E] border border-[#F5D3D9] text-xs font-semibold tracking-wider uppercase w-fit shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C05B6F]" />
              <span>FLOWER BOUTIQUE • JODHPUR</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#2D2123] leading-[1.08] tracking-tight">
              Where Every Bloom <br />
              <span className="font-normal italic text-[#B45367]">Tells a Story</span>
            </h1>

            <p className="text-base sm:text-lg text-[#5E4D4F] leading-relaxed max-w-2xl font-light">
              Welcome to Blossom, where flowers become beautiful expressions of love, joy, friendship, and every special moment. Hand-tied daily with morning-fresh garden stems.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-flower-boutique-btn"
                onClick={() => onNavigate('boutique')}
                className="px-7 py-3.5 rounded-full bg-[#8C3B4E] hover:bg-[#722F3E] text-white font-medium text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2 group"
              >
                <span>Flower Boutique</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-explore-collection-btn"
                onClick={() => onNavigate('collection')}
                className="px-6 py-3.5 rounded-full bg-white hover:bg-[#F9ECEF]/60 text-[#3E2F32] border border-[#E0D0CC] font-medium text-sm tracking-wide shadow-2xs transition-all duration-300 flex items-center space-x-2"
              >
                <span>Our Collection</span>
              </button>

              <button
                id="hero-visit-gallery-btn"
                onClick={() => onNavigate('gallery')}
                className="px-6 py-3.5 rounded-full bg-[#FAF5F2] hover:bg-[#F5EAE6] text-[#7A3644] border border-[#ECD9D5] font-medium text-sm tracking-wide shadow-2xs transition-all duration-300 flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-[#8C3B4E]" />
                <span>Gallery</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#EFE4E0]/80">
              <div>
                <div className="font-serif text-2xl font-semibold text-[#8C3B4E]">100%</div>
                <div className="text-xs text-[#7B6765]">Fresh Daily Blooms</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-semibold text-[#8C3B4E]">Same-Day</div>
                <div className="text-xs text-[#7B6765]">Jodhpur Delivery</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-semibold text-[#8C3B4E]">Eco-Friendly</div>
                <div className="text-xs text-[#7B6765]">Sustainable Linen Wrap</div>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Showcase: Large Bouquet + Boutique Atmosphere */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-4 bg-linear-to-tr from-[#FBE5E8] to-[#E8EFE9] rounded-3xl -rotate-2 transform opacity-70 blur-xs" />

              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white aspect-4/5">
                <SafeImage
                  src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=900&q=80"
                  alt="Blossom Flower Boutique fresh romantic bouquet"
                  className="w-full h-full object-cover"
                />

                {/* Floating romantic badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-[#F2DEE1] flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#FCECEE] flex items-center justify-center text-lg shrink-0">
                    🌹
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#3E2F32] truncate">
                      The Morning Romance Bouquet
                    </p>
                    <p className="text-[11px] text-[#8C3B4E] italic font-serif">
                      “Every petal arranged with tender intention”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BOUTIQUE INTRODUCTION SECTION */}
      <section id="home-intro-section" className="bg-[#FAF4F2] py-20 px-4 sm:px-6 lg:px-8 border-y border-[#EDE0DC] mb-24">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C3B4E] flex items-center justify-center space-x-1.5">
            <span>✦</span>
            <span>Welcome to Blossom</span>
            <span>✦</span>
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#2D2123] leading-tight">
            A Sanctuary of Color, Scent & Quiet Romance
          </h2>

          <p className="text-base sm:text-lg text-[#5C4D4E] leading-relaxed max-w-3xl mx-auto font-light">
            Founded with a heartfelt love for nature’s poetry, <strong>Blossom Flower Boutique</strong> is a sanctuary nestled in the royal heart of Jodhpur, Rajasthan. We curate rare garden roses, graceful tulips, luminous sunflowers, and velvety peonies. Here, floral design is an art of translating silent human feelings into breathtaking living arrangements.
          </p>

          <div className="pt-4 flex justify-center">
            <button
              onClick={() => onNavigate('about')}
              className="text-xs font-semibold uppercase tracking-widest text-[#8C3B4E] hover:text-[#5B2E35] flex items-center space-x-1.5 group border-b border-[#B45367]/40 pb-1"
            >
              <span>Read Our Full Story</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. FEATURED FLOWERS SECTION */}
      <section id="home-featured-flowers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-widest text-[#8C3B4E] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C05B6F]" />
            <span>FEATURED FLOWERS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#2D2123]">
            Our Pretty Collection
          </h2>
          <div className="flex items-center justify-center space-x-2 my-2 text-[#C49463]">
            <span>❀</span>
            <div className="w-12 h-px bg-[#D8B490]" />
            <span>❀</span>
          </div>
          <p className="text-sm text-[#705D5E] max-w-xl mx-auto font-light">
            Each flower is freshly selected each sunrise and accompanied by its timeless symbolism and sentimental note.
          </p>
        </div>

        {/* Featured Grid (5-6 featured flowers) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredFlowers.map((flower) => (
            <FlowerCard
              key={flower.id}
              flower={flower}
              onAddToBouquet={onAddToBouquet}
              onEnquire={onEnquire}
              onOrderNow={onOrderFlower}
              isInBouquet={bouquetItemIds.has(flower.id)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('collection')}
            className="px-8 py-3.5 rounded-full bg-[#FAF4F2] hover:bg-[#F2E5E2] text-[#8C3B4E] border border-[#E7D6D1] text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center space-x-2"
          >
            <span>View All 15 Flowers in Our Pretty Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. FEATURED BOUQUET SECTION: "Made With Love" */}
      <section id="made-with-love-section" className="bg-[#FAF4F2] py-24 px-4 sm:px-6 lg:px-8 border-y border-[#EDE0DC] mb-28">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8C3B4E]">
              ARTISAN ARRANGEMENTS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#2D2123] mt-2">
              Made With Love
            </h2>
            <div className="flex items-center justify-center space-x-2 my-3 text-[#C49463]">
              <span>❀</span>
              <div className="w-12 h-px bg-[#D8B490]" />
              <span>❀</span>
            </div>
            <p className="text-sm text-[#6C5B5D] font-light">
              Signature handcrafted bouquets, composed with morning-harvested stems and bound in raw silk ribbons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBouquets.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#EBE0DC] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-[#F6EEEC]">
                  <SafeImage
                    src={b.image}
                    alt={b.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#8C3B4E] text-xs font-semibold tracking-wide">
                    {b.tag}
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-[#2E2123] mb-1 group-hover:text-[#B45367] transition-colors">
                      {b.name}
                    </h3>
                    <p className="text-xs font-medium text-[#8C3B4E] italic mb-3">
                      {b.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-[#6A585A] font-light leading-relaxed mb-6">
                      {b.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F0E6E3] flex items-center justify-between">
                    <button
                      onClick={() => onNavigate('boutique')}
                      className="text-xs font-semibold uppercase tracking-wider text-[#8C3B4E] hover:text-[#5E2733] flex items-center space-x-1.5 group-hover:translate-x-1 transition-transform cursor-pointer"
                    >
                      <span>View in Boutique →</span>
                    </button>
                    <button
                      id={`home-order-bouquet-${b.id}`}
                      onClick={() => {
                        const matching = READY_BOUQUETS.find((r) => r.id === b.id);
                        if (onOrderNow && matching) {
                          onOrderNow(matching);
                        } else if (onOrderNow) {
                          onOrderNow({
                            id: b.id,
                            name: b.name,
                            subtitle: b.subtitle,
                            description: b.description,
                            price: '$68.00',
                            priceNum: 68,
                            image: b.image,
                            occasions: ['Romantic'],
                            tag: b.tag,
                            stemCount: '18 premium stems',
                            includes: ['Damask Roses', 'Blush Peonies'],
                          });
                        } else {
                          onNavigate('boutique');
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-[#8C3B4E] hover:bg-[#722F3E] text-white text-xs font-semibold uppercase tracking-wider shadow-xs transition-colors cursor-pointer"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. "STEP INTO BLOSSOM" (Boutique Interior Section) */}
      <section id="step-into-blossom" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#EDE0DC] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FCECEE] text-[#8C3B4E] text-xs font-semibold uppercase tracking-wider">
                <Store className="w-3.5 h-3.5 text-[#B45367]" />
                <span>BOUTIQUE INTERIOR</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#2D2123] leading-tight">
                Step Into <span className="italic font-normal text-[#B45367]">Blossom</span>
              </h2>

              <p className="text-sm sm:text-base text-[#615052] font-light leading-relaxed">
                Step through our glass doors into a sun-drenched flower atelier filled with the fragrance of garden roses, fresh French lavender, and delicate peonies.
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-[#5A4B4D]">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5D7052] shrink-0" />
                  <span>Fresh daily flower buckets & handcrafted ceramic vases</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5D7052] shrink-0" />
                  <span>Artisanal wrapping station with silk ribbons & calligraphy</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5D7052] shrink-0" />
                  <span>Warm decorative lighting, wooden shelves & lush greenery</span>
                </li>
              </ul>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('gallery')}
                  className="px-6 py-3.5 rounded-full bg-[#8C3B4E] hover:bg-[#722F3E] text-white text-xs font-semibold uppercase tracking-wider shadow-md transition-all flex items-center space-x-2"
                >
                  <span>Explore Boutique Visuals</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Large Interior Photograph */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-16/10 border-4 border-white bg-[#F6EEEC] group">
                <SafeImage
                  src={blossomInterior}
                  alt="Inside Blossom Flower Boutique with fresh bouquets, wooden shelves, roses, lavender and BLOSSOM sign"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-black/40 backdrop-blur-md text-white text-xs flex items-center justify-between">
                  <span className="font-serif italic">Blossom Boutique Interior • Jodhpur Atelier</span>
                  <span className="text-[11px] text-[#DFBA73] uppercase tracking-wider font-semibold">Open Daily 9am - 8pm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. "FLOWER OF THE DAY 🌸" SECTION */}
      <section id="flower-of-the-day" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="bg-linear-to-br from-[#FFF9FA] via-[#FCF5F3] to-[#F5ECE8] rounded-3xl p-8 sm:p-12 border border-[#EBDCD7] shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Flower Photo */}
            <div className="md:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-square border-4 border-white bg-white group">
                <SafeImage
                  src={flowerOfTheDay.image}
                  alt={`${flowerOfTheDay.name} - Flower of the Day`}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#8C3B4E] text-xs font-semibold uppercase tracking-wider shadow-xs">
                  Today’s Bloom
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#8C3B4E]">
                <span>Flower of the Day 🌸</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#2E2123]">
                Today’s Bloom: {flowerOfTheDay.name}
              </h3>

              <div className="p-3.5 bg-white/80 rounded-xl border border-[#EFE2DF] text-xs sm:text-sm text-[#5C4B4D]">
                <strong className="text-[#8C3B4E] font-semibold">Symbolizes:</strong>{' '}
                <span className="italic">{flowerOfTheDay.symbolizes}</span>
              </div>

              <blockquote className="font-serif text-lg sm:text-xl italic text-[#723F4B] border-l-2 border-[#D8A776] pl-3 py-1">
                {flowerOfTheDay.message}
              </blockquote>

              <p className="text-xs sm:text-sm text-[#6C5B5D] leading-relaxed font-light">
                {flowerOfTheDay.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('collection')}
                  className="px-6 py-3 rounded-full bg-[#8C3B4E] hover:bg-[#722F3E] text-white text-xs font-semibold uppercase tracking-wider shadow-md transition-all flex items-center space-x-2"
                >
                  <span>Explore More Flowers →</span>
                </button>
                <button
                  onClick={() => onAddToBouquet(flowerOfTheDay)}
                  className="px-5 py-3 rounded-full bg-white hover:bg-[#FBECEF] text-[#8C3B4E] border border-[#E5D2CD] text-xs font-semibold transition-all"
                >
                  + Add to Custom Bouquet
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BLOSSOM SHOP EXTERIOR SECTION */}
      <section id="blossom-storefront" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#EDE0DC] bg-[#FAF4F2]">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Storefront Image */}
            <div className="lg:col-span-7 aspect-16/10 lg:aspect-auto h-72 sm:h-96 lg:h-full relative overflow-hidden group">
              <SafeImage
                src={blossomExterior}
                alt="Charming exterior storefront of Blossom Flower Boutique in Jodhpur"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#DFBA73] block mb-0.5">
                  Artisan Floral Atelier
                </span>
                <p className="font-serif text-lg font-light">
                  BLOSSOM FLOWER BOUTIQUE
                </p>
              </div>
            </div>

            {/* Storefront Details */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#8C3B4E]">
                <MapPin className="w-3.5 h-3.5 text-[#B45367]" />
                <span>Visit Us in Person</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#2E2123] leading-snug">
                A Warm, Welcoming Boutique Storefront
              </h2>

              <p className="text-xs sm:text-sm text-[#665457] leading-relaxed font-light">
                Our charming boutique entrance is surrounded by cascading florals and potted botanical wonders. Come browse stems in person, inhale the morning fragrances, or sit while we hand-wrap your bespoke creation.
              </p>

              <div className="space-y-2 text-xs text-[#705E60] pt-1">
                <p>📍 <strong>Location:</strong> Heritage Floral District, Jodhpur, Rajasthan</p>
                <p>⏰ <strong>Hours:</strong> Mon – Sat: 9:00 AM – 8:00 PM | Sun: 10:00 AM – 6:00 PM</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('gallery')}
                  className="px-7 py-3.5 rounded-full bg-[#8C3B4E] hover:bg-[#722F3E] text-white text-xs font-semibold uppercase tracking-wider shadow-md transition-all inline-flex items-center space-x-2"
                >
                  <span>Visit Our Gallery →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHY BLOSSOM? SECTION */}
      <section id="why-blossom-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8C3B4E]">
            The Blossom Difference
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#2D2123] mt-2">
            Why Blossom Flower Boutique?
          </h2>
          <p className="text-sm text-[#6C5B5D] mt-2">
            We hold ourselves to a gentle standard of grace, freshness, and personal touch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Heart className="w-6 h-6 text-[#B45367]" />,
              title: 'Handcrafted With Emotion',
              desc: 'Every bouquet is individually designed by artisans who treat flowers as brushstrokes of empathy and love.',
            },
            {
              icon: <Leaf className="w-6 h-6 text-[#5D7052]" />,
              title: 'Fresh Morning Harvest',
              desc: 'Direct partnerships with ethical heritage growers ensure long-lasting blooms with maximum fragrance.',
            },
            {
              icon: <Sparkles className="w-6 h-6 text-[#C5A059]" />,
              title: 'Meaning in Every Petal',
              desc: 'We incorporate Victorian floriography into every card, matching the bloom to your personal sentiment.',
            },
            {
              icon: <Gift className="w-6 h-6 text-[#8C3B4E]" />,
              title: 'Artisanal Silk & Paper Wrap',
              desc: 'Compostable botanical wraps, pure silk ribbons, and complimentary calligraphy cards with every order.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl border border-[#EDE0DC] shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FBF1F3] flex items-center justify-center mb-2">
                {item.icon}
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#3E2F32]">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#6A5A5C] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. INSTAGRAM-STYLE GALLERY: "Follow the Bloom" */}
      <section id="instagram-feed-section" className="bg-[#FAF4F2] py-20 px-4 sm:px-6 lg:px-8 border-y border-[#EDE0DC] mb-28">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8C3B4E] flex items-center justify-center space-x-1.5">
              <Instagram className="w-3.5 h-3.5 text-[#B45367]" />
              <span>FOLLOW THE BLOOM</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#2D2123] mt-2">
              @blossom.boutique
            </h2>
            <p className="text-xs sm:text-sm text-[#6E5B5D] mt-1 font-light">
              Follow our daily studio life, morning harvests, and custom floral stories on Instagram.
            </p>
          </div>

          {/* 6 Square Photographs Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {instagramPhotos.map((photo) => (
              <a
                key={photo.id}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-2xl overflow-hidden border border-[#E9DDD9] bg-white shadow-xs block"
              >
                <SafeImage
                  src={photo.image}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-3 text-center">
                  <Instagram className="w-5 h-5 mb-1 text-white" />
                  <span className="text-[10px] text-pink-200 font-medium">♥ {photo.likes}</span>
                  <p className="text-[10px] line-clamp-2 mt-1 font-light">
                    {photo.caption}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <a
              id="instagram-follow-btn"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-[#8C3B4E] hover:bg-[#722F3E] text-white text-xs font-semibold uppercase tracking-wider shadow-md transition-all"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow Us on Instagram →</span>
            </a>
          </div>
        </div>
      </section>

      {/* 10. CALL TO ACTION SECTION: "Make Someone’s Day Bloom" */}
      <section id="home-cta-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-linear-to-r from-[#3B292C] via-[#4D3338] to-[#362629] text-white p-8 sm:p-14 lg:p-16 shadow-2xl">
          <div 
            className="absolute -right-10 -bottom-10 opacity-10 text-9xl pointer-events-none select-none"
            aria-hidden="true"
          >
            💐
          </div>

          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="px-3.5 py-1 rounded-full bg-[#DFBA73]/20 text-[#F5DEB3] border border-[#DFBA73]/30 text-xs font-semibold uppercase tracking-wider">
              Special Moments & Daily Delights
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#FAF3EF]">
              Make Someone’s Day Bloom
            </h2>

            <p className="text-base sm:text-lg text-[#DFD0CD] font-light leading-relaxed">
              Whether it’s a surprise anniversary rose, a comforting bunch of lavender, or a joyful sunflower to brighten a friend’s desk, let our florists craft a memory that lingers long after the petals settle.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="cta-explore-collection"
                onClick={() => onNavigate('collection')}
                className="px-8 py-3.5 rounded-full bg-[#FAF4F2] text-[#3E2F32] hover:bg-white font-medium text-xs sm:text-sm uppercase tracking-wider shadow-md transition-colors"
              >
                Browse All Flowers
              </button>

              <button
                id="cta-contact-florist"
                onClick={() => onNavigate('contact')}
                className="px-8 py-3.5 rounded-full bg-transparent hover:bg-white/10 text-white border border-white/40 font-medium text-xs sm:text-sm uppercase tracking-wider transition-colors"
              >
                Enquire for Bespoke Event
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
