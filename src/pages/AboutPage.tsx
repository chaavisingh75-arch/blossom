import React from 'react';
import { Page } from '../types';
import { Sparkles, Heart, Award, Leaf, Flower2, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { SafeImage } from '../components/SafeImage';

// Generated boutique assets
import floristArranging from '../assets/images/florist_arranging_1790099432954.jpg';
import blossomInterior from '../assets/images/blossom_interior_1790099402755.jpg';
import customerBouquet from '../assets/images/customer_bouquet_1790099452312.jpg';

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-24 pb-20 overflow-hidden">
      {/* Page Header */}
      <section id="about-header" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FCECEE] text-[#8C3B4E] border border-[#F2CAD1] text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#B45367]" />
          <span>Warmth & Craftsmanship</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#2E2123] tracking-tight mb-4">
          The Heart Behind <span className="italic font-normal text-[#B45367]">Blossom</span>
        </h1>
        <p className="text-base sm:text-lg text-[#615052] font-light max-w-2xl mx-auto leading-relaxed">
          Rooted in a reverence for life’s delicate moments, we curate nature’s most tender creations to celebrate love, solace, gratitude, and joyous beginnings.
        </p>
      </section>

      {/* Featured Quote Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-20">
        <div className="relative bg-[#FAF4F1] border-y-2 border-[#E7D6D0] py-10 px-8 text-center rounded-2xl shadow-2xs">
          <span className="text-4xl text-[#C5A059] font-serif select-none" aria-hidden="true">“</span>
          <blockquote className="font-serif text-2xl sm:text-3xl italic font-normal text-[#3E2F32] -mt-3 mb-3 leading-snug">
            Flowers are the little smiles nature gives us.
          </blockquote>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C3B4E]">
            — Our Guiding Boutique Philosophy
          </p>
        </div>
      </section>

      {/* SECTION 1: OUR STORY (Shop Interior visual) */}
      <section id="our-story" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Story Narrative */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#8C3B4E]">
              <Flower2 className="w-4 h-4 text-[#B45367]" />
              <span>Chapter I</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#2E2123]">
              Our Story
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#5D4E50] leading-relaxed font-light">
              <p>
                Blossom began not as a commercial floral shop, but as a quiet, humble passion in a sunlit corner of our courtyard in Jodhpur, Rajasthan. It was born from the timeless habit of placing a small vase of freshly harvested tea roses on the morning breakfast table to welcome family and friends.
              </p>
              <p>
                As neighboring families began asking for small bunches to celebrate newborn babies, festivals, quiet apologies, and heartfelt wedding vows, we realized something profound: <em>flowers speak where words falter</em>.
              </p>
              <p>
                Over the years, that small courtyard hobby grew into Blossom Flower Boutique — an intimate floral atelier dedicated to crafting bespoke bouquets where every single stem is chosen not for mere decoration, but to faithfully convey genuine human emotions.
              </p>
            </div>

            <div className="pt-2 flex items-center space-x-6 text-[#7E6967] text-xs">
              <div>
                <span className="font-serif text-2xl font-bold text-[#8C3B4E] block">2014</span>
                <span>Courtyard Beginnings</span>
              </div>
              <div className="w-px h-8 bg-[#E2D2CD]" />
              <div>
                <span className="font-serif text-2xl font-bold text-[#8C3B4E] block">15,000+</span>
                <span>Bouquets Hand-Tied</span>
              </div>
              <div className="w-px h-8 bg-[#E2D2CD]" />
              <div>
                <span className="font-serif text-2xl font-bold text-[#8C3B4E] block">100%</span>
                <span>Ethically Sourced</span>
              </div>
            </div>
          </div>

          {/* Story Image: Boutique Interior */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/3 border-4 border-white bg-[#F7EFEF] group">
              <SafeImage
                src={blossomInterior}
                alt="Inside Blossom Flower Boutique cozy studio with fresh bouquets and BLOSSOM sign"
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 sm:left-6 max-w-xs bg-white p-4 rounded-xl border border-[#EDE0DC] shadow-lg hidden sm:block">
              <p className="text-xs text-[#6A5759] italic">
                “We hand-select blooms at sunrise while the morning mist still rests gently on their petals.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: OUR PASSION (Florist arranging flowers visual) */}
      <section id="our-passion" className="bg-[#FAF4F2] py-20 px-4 sm:px-6 lg:px-8 border-y border-[#EDE0DC] mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Visual: Florist arranging flowers */}
            <div className="order-2 lg:order-1 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/3 border-4 border-white bg-white group">
                <SafeImage
                  src={floristArranging}
                  alt="Florist arranging delicate peonies and roses at Blossom workbench"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="absolute -bottom-6 right-6 bg-[#2D2123] text-white p-4 rounded-xl shadow-lg max-w-xs hidden sm:block">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#DFBA73] block mb-1">
                  Artisanal Craft
                </span>
                <p className="text-xs text-[#D8CAC8]">
                  From botanical balance to color graduation, each arrangement is hand-composed with patience.
                </p>
              </div>
            </div>

            {/* Passion Narrative */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#8C3B4E]">
                <Heart className="w-4 h-4 text-[#B45367]" />
                <span>Chapter II</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#2E2123]">
                Our Passion
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#5D4E50] leading-relaxed font-light">
                <p>
                  To us, floral design is poetry in botanical form. We are captivated by the subtle curvature of a garden tulip as it reaches toward ambient light, the velvety scent of Damask roses, and the airy lightness of baby’s breath framing a wild meadow bouquet.
                </p>
                <p>
                  Our team of florists studies traditional Victorian floriography alongside contemporary organic styling. We never force stiff, artificial symmetry into a bouquet. Instead, we allow each stem to retain its organic posture and natural grace — celebrating imperfections just as nature intended.
                </p>
                <p>
                  Every color palette is intentionally selected: calming sage and lilac for comfort, warm sunflower golds for congratulations, and tender blush-cream hues for whispered romance.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-[#EDE0DC]">
                  <h4 className="font-serif text-base font-semibold text-[#3E2F32] mb-1">Organic Geometry</h4>
                  <p className="text-xs text-[#7B6869]">Natural stems allowed to curve and breathe freely.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#EDE0DC]">
                  <h4 className="font-serif text-base font-semibold text-[#3E2F32] mb-1">Artisan Wraps</h4>
                  <p className="text-xs text-[#7B6869]">Hand-torn chiffon and raw cotton ribbons.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: OUR PROMISE */}
      <section id="our-promise" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#8C3B4E] mb-2">
            <Award className="w-4 h-4 text-[#B45367]" />
            <span>Chapter III</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#2E2123]">
            Our Promise to You
          </h2>
          <p className="text-sm text-[#6C5B5D] mt-2 font-light">
            When you send flowers with Blossom, you place your trust in our hands. Here is what we pledge with every order.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Peak Bloom Guarantee',
              desc: 'We never send tired or past-peak blooms. Every arrangement arrives at the ideal moment — either in bud ready to unfold or in radiant, fragrant bloom.',
              tag: 'Vase-Life Freshness',
            },
            {
              title: 'Meaningful Personalization',
              desc: 'Every bouquet comes with your personal message carefully handwritten on luxury textured paper, sealed in an envelope with botanical wax stamp upon request.',
              tag: 'Personal Sentiment',
            },
            {
              title: 'Eco-Minded Stewardship',
              desc: 'We reject single-use plastic cellophane and toxic floral foams. We wrap in compostable Kraft paper and re-usable natural fiber vessels.',
              tag: 'Conscious Floristry',
            },
          ].map((promise, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-[#EBE0DC] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-[#EBF2EC] text-[#5D7052] flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C3B4E] block mb-1">
                  {promise.tag}
                </span>
                <h3 className="font-serif text-2xl font-semibold text-[#3E2F32] mb-3">
                  {promise.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#675759] leading-relaxed font-light">
                  {promise.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to Explore Flowers */}
        <div className="mt-16 text-center">
          <button
            onClick={() => onNavigate('collection')}
            className="px-8 py-3.5 rounded-full bg-[#8C3B4E] hover:bg-[#722F3E] text-white text-xs font-semibold uppercase tracking-wider shadow-md transition-colors inline-flex items-center space-x-2"
          >
            <span>Explore Our Pretty Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
