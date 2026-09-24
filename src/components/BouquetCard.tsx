import React, { useState } from 'react';
import { ReadyBouquet } from '../types';
import { Heart, Sparkles, Check, ArrowRight, Tag, Gift } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface BouquetCardProps {
  bouquet: ReadyBouquet;
  onOrderNow: (bouquet: ReadyBouquet) => void;
  onAddToBouquet: (bouquet: ReadyBouquet) => void;
  isAdded?: boolean;
}

export const BouquetCard: React.FC<BouquetCardProps> = ({
  bouquet,
  onOrderNow,
  onAddToBouquet,
  isAdded = false,
}) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAddToBouquet(bouquet);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <article
      id={`bouquet-card-${bouquet.id}`}
      className="group relative bg-white rounded-3xl overflow-hidden border border-[#EDE2DF] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full"
    >
      {/* Bouquet Image Container with realistic presentation */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#F7F2EF]">
        <SafeImage
          src={bouquet.image}
          alt={`${bouquet.name} - Hand-tied complete flower bouquet`}
          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Gradient shadow overlay for contrast */}
        <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none" />

        {/* Floating Occasion Tag Badge */}
        <div className="absolute top-3.5 left-3.5 flex items-center space-x-1.5 pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#783643] text-xs font-semibold tracking-wide shadow-xs flex items-center space-x-1 border border-[#F2CAD1]">
            <Sparkles className="w-3 h-3 text-[#B45367]" />
            <span>{bouquet.tag}</span>
          </span>
        </div>

        {/* Price Tag Floating Top Right */}
        <div className="absolute top-3.5 right-3.5 pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-[#2B1D20]/90 backdrop-blur-md text-[#FFF5F6] text-xs font-bold tracking-tight shadow-xs">
            {bouquet.price}
          </span>
        </div>

        {/* Stem Count badge floating bottom left */}
        <div className="absolute bottom-3 left-3 pointer-events-none">
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-medium text-white/95">
            <Gift className="w-3 h-3 text-[#F2CAD1]" />
            <span>{bouquet.stemCount}</span>
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Bouquet Name */}
          <div className="mb-1">
            <h3 className="font-serif text-2xl font-semibold text-[#2F2124] group-hover:text-[#8C3B4E] transition-colors leading-snug">
              {bouquet.name}
            </h3>
            <p className="text-xs text-[#8A7477] font-medium mt-0.5 italic">
              {bouquet.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#615053] font-light leading-relaxed my-3.5">
            {bouquet.description}
          </p>

          {/* Included Botanical Stems Chips */}
          <div className="mb-5 flex flex-wrap gap-1.5">
            {bouquet.includes.slice(0, 3).map((item) => (
              <span
                key={item}
                className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#FAF4F2] text-[#695457] border border-[#EFE2DE]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-[#F2E8E5] grid grid-cols-2 gap-2.5">
          <button
            id={`add-bouquet-${bouquet.id}`}
            onClick={handleAdd}
            className={`flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
              justAdded
                ? 'bg-[#5D7052] text-white shadow-xs'
                : 'bg-[#F9ECEF] text-[#8C3B4E] hover:bg-[#F2D7DC] active:scale-97'
            }`}
            title="Add this ready bouquet to your selection"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <Heart className="w-3.5 h-3.5 fill-[#8C3B4E]/20" />
                <span>Add to Bouquet</span>
              </>
            )}
          </button>

          <button
            id={`order-now-${bouquet.id}`}
            onClick={() => onOrderNow(bouquet)}
            className="flex items-center justify-center space-x-1 py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wide bg-[#2D2123] hover:bg-[#453437] text-white shadow-xs active:scale-97 transition-all duration-200 group/btn cursor-pointer"
          >
            <span>Order Now</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
};
