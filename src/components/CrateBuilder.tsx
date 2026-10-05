import React, { useState } from 'react';
import { FruitItem, SeasonalCrateTier, CartItem } from '../types/fruit';
import { CRATE_TIERS } from '../data/fruits';
import { Check, Plus, Minus, Package, Sparkles, AlertCircle } from 'lucide-react';

interface CrateBuilderProps {
  fruits: FruitItem[];
  onAddCrateToCart: (customCartItem: CartItem) => void;
}

export const CrateBuilder: React.FC<CrateBuilderProps> = ({
  fruits,
  onAddCrateToCart,
}) => {
  const [selectedTier, setSelectedTier] = useState<SeasonalCrateTier>(CRATE_TIERS[1]); // default to Family
  const [fruitCounts, setFruitCounts] = useState<Record<string, number>>({
    'citrus-ojai-grove': 3,
    'wild-sierra-berries': 2,
    'blenheim-apricots-nectarines': 3,
    'hood-river-honeycrisp': 2,
    'black-mission-figs': 2,
  });
  const [frequency, setFrequency] = useState<'one-time' | 'weekly' | 'bi-weekly'>('weekly');
  const [addedNotice, setAddedNotice] = useState(false);

  // Available single fruit varieties for crate
  const availableFruits = fruits.filter((f) => f.category !== 'curated-crates');

  const totalSelectedPortions = Object.values(fruitCounts).reduce(
    (acc, val) => acc + (val || 0),
    0
  );

  const capacity = selectedTier.capacity;
  const remainingSlots = capacity - totalSelectedPortions;

  const handleIncrement = (id: string) => {
    if (totalSelectedPortions < capacity) {
      setFruitCounts((prev) => ({
        ...prev,
        [id]: (prev[id] || 0) + 1,
      }));
    }
  };

  const handleDecrement = (id: string) => {
    if ((fruitCounts[id] || 0) > 0) {
      setFruitCounts((prev) => ({
        ...prev,
        [id]: prev[id] - 1,
      }));
    }
  };

  // Calculate pricing with frequency discount
  const basePrice = selectedTier.basePrice;
  const discountMultiplier = frequency === 'weekly' ? 0.9 : frequency === 'bi-weekly' ? 0.95 : 1.0;
  const finalPrice = basePrice * discountMultiplier;

  const handleAddToCart = () => {
    if (totalSelectedPortions !== capacity) return;

    const customItems = Object.entries(fruitCounts)
      .filter(([_, count]) => count > 0)
      .map(([fruitId, count]) => {
        const fruit = fruits.find((f) => f.id === fruitId);
        return {
          fruitName: fruit ? fruit.name : fruitId,
          count,
        };
      });

    // Generate cart item representation
    const crateItem: CartItem = {
      cartItemId: `custom-crate-${Date.now()}`,
      fruit: {
        id: `crate-${selectedTier.id}-${Date.now()}`,
        name: `Custom ${selectedTier.name}`,
        scientificName: 'Custom Orchard Blend',
        category: 'curated-crates',
        pricePerUnit: finalPrice,
        unit: `${capacity} portions crate`,
        image: fruits[0].image,
        fallbackColor: 'bg-emerald-100',
        farm: 'Curated Orchard Collective',
        origin: 'California & Oregon partner orchards',
        brixRating: 16.0,
        seasonStatus: 'Peak Season',
        organic: true,
        tastingNotes: ['Hand-curated custom box', `${frequency} delivery`],
        description: `Customized crate with: ${customItems.map((i) => `${i.count}x ${i.fruitName}`).join(', ')}`,
        harvestDate: 'Harvested fresh on order',
        storageTip: 'Follow included ripeness guide',
        nutrition: {
          caloriesPer100g: 52,
          vitaminCPercentDaily: 60,
          fiberGrams: 3.2,
          potassiumMg: 200,
        },
        packagingOptions: [
          {
            id: 'custom-crate-pack',
            name: selectedTier.name,
            weightLbs: capacity * 1.5,
            price: finalPrice,
            unitLabel: `${capacity} items crate`,
          },
        ],
      },
      quantity: 1,
      selectedPackaging: {
        id: 'custom-crate-pack',
        name: selectedTier.name,
        weightLbs: capacity * 1.5,
        price: finalPrice,
        unitLabel: `${capacity} items crate`,
      },
      ripenessPreference: 'ready-now',
      customCrateItems: customItems,
    };

    onAddCrateToCart(crateItem);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <section id="crate-builder" className="py-16 bg-[#F4F1EA]/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
            <span>Tailored To Your Kitchen</span>
            <span aria-hidden="true">·</span>
            <span>Zero Unwanted Waste</span>
          </div>
          <h2 className="text-3xl font-serif font-medium text-stone-950">
            Curate Your Own Seasonal Harvest Crate
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Pick your box size, select your favorite fresh orchard varieties, and receive them cold-packed at tree-ripened perfection.
          </p>
        </div>

        {/* 3 Step Interactive Flow */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 7 Columns: Step 1 Tier Selection + Step 2 Fruit Picking */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Box Size Selection */}
            <div>
              <p className="text-xs font-semibold text-stone-900 mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px] font-mono">1</span>
                <span>Select Your Harvest Box Capacity:</span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CRATE_TIERS.map((tier) => {
                  const isSelected = selectedTier.id === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => {
                        setSelectedTier(tier);
                        // reset or clamp selections if changing
                        setFruitCounts({
                          'citrus-ojai-grove': Math.min(tier.capacity, 2),
                          'wild-sierra-berries': Math.min(tier.capacity, 2),
                          'blenheim-apricots-nectarines': Math.min(tier.capacity, tier.capacity - 4 > 0 ? tier.capacity - 4 : 2),
                        });
                      }}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white border-stone-900 shadow-sm ring-1 ring-stone-900'
                          : 'bg-white/80 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-stone-900">{tier.name}</span>
                        <span className="text-xs font-mono font-semibold text-stone-900 tabular-nums">
                          ${tier.basePrice}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 font-medium">{tier.capacity} Fruit Portions</p>
                      <p className="text-[11px] text-stone-400 mt-2 line-clamp-2 leading-tight">
                        {tier.bestFor}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Choose Your Fruit Mix */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px] font-mono">2</span>
                  <span>Allocate Your {capacity} Portions:</span>
                </p>
                <span className="text-xs font-mono text-stone-500 tabular-nums">
                  {totalSelectedPortions} / {capacity} portions chosen
                </span>
              </div>

              {/* Capacity Progress Bar */}
              <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden mb-4">
                <div
                  className={`h-full transition-all duration-300 ${
                    totalSelectedPortions === capacity ? 'bg-emerald-600' : 'bg-amber-600'
                  }`}
                  style={{ width: `${Math.min(100, (totalSelectedPortions / capacity) * 100)}%` }}
                />
              </div>

              {/* Fruit Portion Selector Rows */}
              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-2">
                {availableFruits.map((fruit) => {
                  const count = fruitCounts[fruit.id] || 0;
                  return (
                    <div
                      key={fruit.id}
                      className="bg-white p-3 rounded-xl border border-stone-200/90 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={fruit.image}
                          alt={fruit.name}
                          className="w-12 h-12 rounded-lg object-cover bg-stone-100"
                        />
                        <div>
                          <p className="text-xs font-semibold text-stone-900 line-clamp-1">{fruit.name}</p>
                          <p className="text-[11px] text-stone-500">
                            {fruit.farm} · <span className="font-mono text-amber-700">{fruit.brixRating}° Brix</span>
                          </p>
                        </div>
                      </div>

                      {/* Stepper Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleDecrement(fruit.id)}
                          disabled={count === 0}
                          className="w-7 h-7 rounded-lg border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-stone-100 disabled:opacity-30 cursor-pointer"
                          aria-label={`Decrease ${fruit.name}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-semibold tabular-nums">
                          {count}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleIncrement(fruit.id)}
                          disabled={totalSelectedPortions >= capacity}
                          className="w-7 h-7 rounded-lg border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-stone-100 disabled:opacity-30 cursor-pointer"
                          aria-label={`Increase ${fruit.name}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right 5 Columns: Step 3 Schedule & Summary Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-4">
              <Package className="w-5 h-5 text-amber-800" />
              <div>
                <h3 className="text-base font-semibold text-stone-900">Crate Summary</h3>
                <p className="text-xs text-stone-500">{selectedTier.name}</p>
              </div>
            </div>

            {/* Step 3: Frequency */}
            <div>
              <p className="text-xs font-semibold text-stone-900 mb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px] font-mono">3</span>
                <span>Choose Delivery Cadence:</span>
              </p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setFrequency('one-time')}
                  className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                    frequency === 'one-time'
                      ? 'border-stone-900 bg-stone-50 font-semibold text-stone-900'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <span>One-Time</span>
                  <span className="block text-[10px] text-stone-400 mt-0.5">Standard</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFrequency('weekly')}
                  className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                    frequency === 'weekly'
                      ? 'border-stone-900 bg-stone-50 font-semibold text-stone-900'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <span>Weekly</span>
                  <span className="block text-[10px] text-emerald-700 font-medium mt-0.5">Save 10%</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFrequency('bi-weekly')}
                  className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                    frequency === 'bi-weekly'
                      ? 'border-stone-900 bg-stone-50 font-semibold text-stone-900'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <span>Bi-Weekly</span>
                  <span className="block text-[10px] text-emerald-700 font-medium mt-0.5">Save 5%</span>
                </button>
              </div>
            </div>

            {/* Selected Fruits Itemized breakdown */}
            <div className="space-y-2 text-xs border-t border-stone-100 pt-4">
              <span className="text-stone-500 font-medium block">Allocated Harvest Portions:</span>
              <div className="space-y-1.5 max-h-40 overflow-y-auto">
                {Object.entries(fruitCounts)
                  .filter(([_, count]) => count > 0)
                  .map(([fruitId, count]) => {
                    const fruit = fruits.find((f) => f.id === fruitId);
                    return (
                      <div key={fruitId} className="flex justify-between text-stone-700">
                        <span>{fruit?.name}</span>
                        <span className="font-mono tabular-nums text-stone-900">{count}x</span>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Remaining Slots Warning if any */}
            {remainingSlots > 0 ? (
              <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg text-xs text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Please select {remainingSlots} more portion{remainingSlots > 1 ? 's' : ''} to fill your box.</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg text-xs text-emerald-800">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Harvest box complete! 100% ready for cold-packing.</span>
              </div>
            )}

            {/* Price Breakdown */}
            <div className="border-t border-stone-200 pt-4 space-y-2">
              <div className="flex justify-between text-xs text-stone-500">
                <span>Box Base Value</span>
                <span className="font-mono tabular-nums">${basePrice.toFixed(2)}</span>
              </div>
              {frequency !== 'one-time' && (
                <div className="flex justify-between text-xs text-emerald-700 font-medium">
                  <span>Subscription Savings</span>
                  <span className="font-mono tabular-nums">
                    -${(basePrice - finalPrice).toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-base font-semibold text-stone-900 pt-1">
                <span>Total per Shipment</span>
                <span className="font-mono tabular-nums">${finalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={remainingSlots > 0}
              className={`w-full py-3.5 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                remainingSlots > 0
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : addedNotice
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-900 text-white hover:bg-stone-800 active:scale-98 shadow-sm'
              }`}
            >
              {addedNotice ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Custom Crate Added!</span>
                </>
              ) : (
                <span>
                  {remainingSlots > 0
                    ? `Pick ${remainingSlots} More to Finish Crate`
                    : `Add Custom Crate to Bag · $${finalPrice.toFixed(2)}`}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
