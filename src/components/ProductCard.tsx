import React, { useState } from 'react';
import { FruitItem } from '../types/fruit';
import { Plus, Check, Eye } from 'lucide-react';

interface ProductCardProps {
  fruit: FruitItem;
  onSelect: (fruit: FruitItem) => void;
  onQuickAdd: (fruit: FruitItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  fruit,
  onSelect,
  onQuickAdd,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(fruit);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article
      onClick={() => onSelect(fruit)}
      className="group flex flex-col bg-white rounded-xl border border-stone-200/90 overflow-hidden hover:border-stone-400 hover:shadow-md transition-all duration-200 cursor-pointer text-left"
    >
      {/* Product Image Slot: ~68% of visual presence */}
      <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
        {/* Styled Fallback Container */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-300 ${
            imageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          } ${fruit.fallbackColor}`}
        >
          <span className="text-xs font-mono uppercase tracking-wider text-stone-600">
            {fruit.category}
          </span>
          <span className="text-sm font-serif font-medium text-stone-800 text-center mt-1">
            {fruit.name}
          </span>
        </div>

        <img
          src={fruit.image}
          alt={fruit.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300 ease-out"
        />

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 bg-white/95 text-stone-900 text-xs font-medium px-3 py-1.5 rounded-md shadow-sm backdrop-blur-xs">
            <Eye className="w-3.5 h-3.5" />
            Quick Inspect
          </span>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div className="space-y-2">
          {/* Unboxed metadata line with typographic bullet separators (No pills!) */}
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <span>{fruit.farm}</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-700 font-mono tabular-nums">{fruit.brixRating}° Brix</span>
            <span aria-hidden="true">·</span>
            <span>{fruit.seasonStatus}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-base font-semibold text-stone-900 leading-snug line-clamp-1 group-hover:text-amber-800 transition-colors">
            {fruit.name}
          </h3>

          {/* Tasting Note Summary */}
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {fruit.tastingNotes.join(' · ')}
          </p>
        </div>

        {/* Price Baseline & Quick-Add Affordance */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-stone-400 font-normal">Starting at</span>
            <span className="text-base font-semibold font-mono text-stone-900 tabular-nums">
              ${fruit.pricePerUnit.toFixed(2)}
              <span className="text-xs font-sans text-stone-500 font-normal ml-1">
                / {fruit.unit}
              </span>
            </span>
          </div>

          <button
            onClick={handleQuickAddClick}
            className={`h-9 px-3.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              justAdded
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-stone-900 text-white hover:bg-stone-800 active:scale-97'
            }`}
            aria-label={`Add ${fruit.name} to harvest bag`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
