import React, { useState } from 'react';
import { Flower } from '../types';
import { Heart, Plus, Check, Sparkles } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface FlowerCardProps {
  flower: Flower;
  onAddToBouquet: (flower: Flower) => void;
  onEnquire: (flower: Flower) => void;
  onOrderNow?: (flower: Flower) => void;
  isInBouquet?: boolean;
}

export const FlowerCard: React.FC<FlowerCardProps> = ({
  flower,
  onAddToBouquet,
  onEnquire,
  onOrderNow,
  isInBouquet = false,
}) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAddToBouquet(flower);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article
      id={`flower-card-${flower.id}`}
      className="group relative bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#EFE5E2] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full"
    >
      {/* Flower Image Container with subtle zoom on hover */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#F6EEEC]">
        <SafeImage
          src={flower.image}
          alt={`${flower.name} bloom - ${flower.symbolizes}`}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Gradient Overlay for subtle depth */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-30 group-hover:opacity-50 transition-opacity pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#733B45] text-xs font-semibold tracking-wide shadow-xs flex items-center space-x-1">
            <span>{flower.emoji}</span>
            <span>{flower.categories[0]}</span>
          </span>

          {flower.price && (
            <span className="px-2.5 py-1 rounded-full bg-[#2D2325]/85 backdrop-blur-xs text-[#F5EDE8] text-xs font-medium tracking-tight">
              {flower.price}
            </span>
          )}
        </div>

        {/* Floating Heart / In-Bouquet Indicator */}
        {isInBouquet && (
          <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-[#B45367] text-white flex items-center justify-center shadow-md animate-in zoom-in-50">
            <Heart className="w-4 h-4 fill-white" />
          </div>
        )}
      </div>

      {/* Card Content Body: Image → Flower Name → Symbolism → Cute Message */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Header with Emoji and Name */}
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="font-serif text-2xl font-semibold text-[#3A2D2F] tracking-tight group-hover:text-[#B45367] transition-colors flex items-center space-x-1.5">
              <span>{flower.emoji}</span>
              <span>{flower.name}</span>
            </h3>
            {flower.season && (
              <span className="text-[11px] font-medium text-[#8F7D7B] uppercase tracking-wider">
                {flower.season}
              </span>
            )}
          </div>
          
          {flower.botanicalName && (
            <p className="text-xs italic text-[#998280] mb-3">
              {flower.botanicalName}
            </p>
          )}

          {/* Symbolism Pill */}
          <div className="mb-3 flex items-start space-x-2 bg-[#FBF3F4] rounded-lg px-3 py-2 border border-[#F2DEE1]">
            <Sparkles className="w-3.5 h-3.5 text-[#B45367] shrink-0 mt-0.5" />
            <div className="text-xs text-[#5D3F43] leading-snug">
              <strong className="font-semibold text-[#8C3B4E]">Symbolism:</strong>{' '}
              <span className="italic">{flower.symbolizes}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#5C4D4E] leading-relaxed mb-4">
            {flower.description}
          </p>
        </div>

        <div>
          {/* Cute Little Message / Quote Box */}
          <div className="relative mb-5 bg-[#FAF6F4] rounded-xl p-3 border-l-3 border-[#D8A776] text-xs text-[#63504A] italic font-serif leading-relaxed">
            <span>{flower.message}</span>
          </div>

          {/* Interactive Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F2E8E5]">
            <button
              id={`add-bouquet-btn-${flower.id}`}
              onClick={handleAdd}
              className={`flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                justAdded
                  ? 'bg-[#5D7052] text-white shadow-xs scale-98'
                  : 'bg-[#F9ECEF] text-[#8C3B4E] hover:bg-[#F2D7DC] active:scale-97'
              }`}
              title="Add this flower to your custom bouquet"
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Bouquet</span>
                </>
              )}
            </button>

            <button
              id={`order-now-btn-${flower.id}`}
              onClick={() => (onOrderNow ? onOrderNow(flower) : onEnquire(flower))}
              className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wide bg-[#2D2325] hover:bg-[#433538] text-white active:scale-97 transition-all duration-200 cursor-pointer"
            >
              <span>Order Now</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
