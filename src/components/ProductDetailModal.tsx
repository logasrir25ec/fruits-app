import React, { useState, useEffect } from 'react';
import { FruitItem, PackagingOption } from '../types/fruit';
import { X, Check, ShieldCheck, ThermometerSnowflake, Sparkles, MapPin, Calendar, Info } from 'lucide-react';

interface ProductDetailModalProps {
  fruit: FruitItem | null;
  onClose: () => void;
  onAddToCart: (
    fruit: FruitItem,
    packaging: PackagingOption,
    ripeness: 'ready-now' | 'firm-ripen-at-home',
    quantity: number
  ) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  fruit,
  onClose,
  onAddToCart,
}) => {
  if (!fruit) return null;

  const [selectedPackaging, setSelectedPackaging] = useState<PackagingOption>(
    fruit.packagingOptions[0]
  );
  const [ripeness, setRipeness] = useState<'ready-now' | 'firm-ripen-at-home'>('ready-now');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Update packaging when fruit changes
  useEffect(() => {
    if (fruit) {
      setSelectedPackaging(fruit.packagingOptions[0]);
      setQuantity(1);
      setRipeness('ready-now');
    }
  }, [fruit]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const totalPrice = (selectedPackaging.price * quantity).toFixed(2);

  const handleAdd = () => {
    onAddToCart(fruit, selectedPackaging, ripeness, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Modal Dialog Container */}
      <div 
        className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-stone-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close Button */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-xs px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <span>{fruit.category.toUpperCase()}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{fruit.brixRating}° Brix Sweetness</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: PDP Split Structure */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Visual & Botanical Notes */}
          <div className="md:col-span-6 space-y-6">
            <div className="relative rounded-xl overflow-hidden aspect-4/3 bg-stone-100 border border-stone-200">
              <img
                src={fruit.image}
                alt={fruit.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-mono px-2.5 py-1 rounded">
                {fruit.seasonStatus}
              </div>
            </div>

            {/* Farm Origin & Sourcing Block */}
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-900">
                <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Harvest Provenance</span>
              </div>
              <div className="text-xs text-stone-600 space-y-1.5 pl-6">
                <p>
                  <strong className="text-stone-800">Orchard:</strong> {fruit.farm}
                </p>
                <p>
                  <strong className="text-stone-800">Location:</strong> {fruit.origin}
                </p>
                <p>
                  <strong className="text-stone-800">Harvest Status:</strong> {fruit.harvestDate}
                </p>
                <p>
                  <strong className="text-stone-800">Storage Tip:</strong> {fruit.storageTip}
                </p>
              </div>
            </div>

            {/* Nutrition & Brix Analysis */}
            <div className="border border-stone-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-stone-900 mb-3 flex items-center justify-between">
                <span>Botanical & Nutrition Breakdown</span>
                <span className="font-mono text-stone-500 font-normal">Per 100g portion</span>
              </p>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-stone-50 p-2 rounded-lg">
                  <span className="font-mono font-semibold text-stone-900 block tabular-nums">
                    {fruit.nutrition.caloriesPer100g}
                  </span>
                  <span className="text-[10px] text-stone-500">Calories</span>
                </div>
                <div className="bg-stone-50 p-2 rounded-lg">
                  <span className="font-mono font-semibold text-stone-900 block tabular-nums">
                    {fruit.nutrition.vitaminCPercentDaily}%
                  </span>
                  <span className="text-[10px] text-stone-500">Vitamin C</span>
                </div>
                <div className="bg-stone-50 p-2 rounded-lg">
                  <span className="font-mono font-semibold text-stone-900 block tabular-nums">
                    {fruit.nutrition.fiberGrams}g
                  </span>
                  <span className="text-[10px] text-stone-500">Dietary Fiber</span>
                </div>
                <div className="bg-stone-50 p-2 rounded-lg">
                  <span className="font-mono font-semibold text-stone-900 block tabular-nums">
                    {fruit.brixRating}°
                  </span>
                  <span className="text-[10px] text-stone-500">Natural Brix</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Scientific name kicker */}
              <p className="text-xs font-mono italic text-stone-500">
                {fruit.scientificName}
              </p>

              <h2 className="text-2xl font-serif font-medium text-stone-950 leading-tight">
                {fruit.name}
              </h2>

              <p className="text-sm text-stone-600 leading-relaxed">
                {fruit.description}
              </p>

              {/* Tasting Notes */}
              <div>
                <p className="text-xs font-semibold text-stone-700 mb-2">Flavor Profile & Aromatics:</p>
                <div className="flex flex-wrap gap-1.5 text-xs text-stone-600">
                  {fruit.tastingNotes.map((note, idx) => (
                    <span 
                      key={idx}
                      className="bg-stone-100 text-stone-800 px-2.5 py-1 rounded text-xs"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Variant Selector: Packaging / Size */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-stone-900 mb-2">
                  Select Pack Size / Harvest Format:
                </label>
                <div className="space-y-2">
                  {fruit.packagingOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedPackaging(opt)}
                      className={`w-full text-left p-3 rounded-xl border flex items-center justify-between text-xs transition-all cursor-pointer ${
                        selectedPackaging.id === opt.id
                          ? 'border-stone-900 bg-stone-50/80 shadow-xs'
                          : 'border-stone-200 hover:border-stone-400 bg-white'
                      }`}
                    >
                      <div>
                        <span className="font-semibold text-stone-900 block">{opt.name}</span>
                        <span className="text-stone-500 text-[11px]">{opt.unitLabel}</span>
                      </div>
                      <span className="font-mono font-semibold text-stone-900 tabular-nums">
                        ${opt.price.toFixed(2)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ripeness Preference */}
              <div>
                <label className="block text-xs font-semibold text-stone-900 mb-2">
                  Ripeness on Delivery Preference:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRipeness('ready-now')}
                    className={`p-2.5 text-left rounded-lg border text-xs cursor-pointer transition-all ${
                      ripeness === 'ready-now'
                        ? 'border-amber-800 bg-amber-50/50 text-stone-950 font-medium'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <span className="block font-semibold">Peak Ready</span>
                    <span className="text-[11px] text-stone-500">Enjoy immediately</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRipeness('firm-ripen-at-home')}
                    className={`p-2.5 text-left rounded-lg border text-xs cursor-pointer transition-all ${
                      ripeness === 'firm-ripen-at-home'
                        ? 'border-amber-800 bg-amber-50/50 text-stone-950 font-medium'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <span className="block font-semibold">Firm Pick</span>
                    <span className="text-[11px] text-stone-500">Ripens in 2-3 days</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Contiguous Buy Module: Quantity Stepper + Add CTA */}
            <div className="pt-6 border-t border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500">Quantity</span>
                <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 disabled:opacity-30 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-mono font-semibold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total and Action Button */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-[11px] text-stone-400">Total Price</span>
                  <span className="text-xl font-mono font-semibold text-stone-950 tabular-nums">
                    ${totalPrice}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 py-3.5 px-6 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    addedAnimation
                      ? 'bg-emerald-700 text-white'
                      : 'bg-stone-900 text-white hover:bg-stone-800 active:scale-98 shadow-sm'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Harvest Bag</span>
                    </>
                  ) : (
                    <span>Add to Harvest Bag · ${totalPrice}</span>
                  )}
                </button>
              </div>

              {/* Cold-Chain Guarantee Note */}
              <p className="text-[11px] text-stone-500 text-center flex items-center justify-center gap-1.5">
                <ThermometerSnowflake className="w-3.5 h-3.5 text-sky-600" />
                <span>Cold-packed with temperature monitoring tag. Arrives fresh or refunded.</span>
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
