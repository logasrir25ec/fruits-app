import React from 'react';
import { ThermometerSnowflake, Sun, Sparkles, Scale, HeartHandshake } from 'lucide-react';

export const RipenessGuide: React.FC = () => {
  return (
    <section id="ripeness-guide" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="max-w-2xl mx-auto text-center space-y-2 mb-12">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">
          <span>The Orchard Standard</span>
          <span aria-hidden="true">·</span>
          <span>Scientific Sweetness Index</span>
        </div>
        <h2 className="text-3xl font-serif font-medium text-stone-950">
          Why Tree-Ripened Fruit Tastes Radically Different
        </h2>
        <p className="text-sm text-stone-600 leading-relaxed">
          Supermarkets force farmers to pick fruit 2 to 3 weeks before full maturity so it survives 20-day distribution loops. We don't harvest until the sun has developed true floral sugars.
        </p>
      </div>

      {/* Brix Comparison Bar Graph */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 mb-12 shadow-sm">
        <h3 className="text-base font-semibold text-stone-900 mb-6 flex items-center justify-between">
          <span>The Refractometer Brix Comparison Scale</span>
          <span className="text-xs font-normal text-stone-500 font-mono">Degrees Brix (°Bx) = % Dissolved Fruit Sugars</span>
        </h3>

        <div className="space-y-6">
          {/* Peaches / Stone Fruit */}
          <div>
            <div className="flex justify-between text-xs mb-1.5 font-medium">
              <span className="text-stone-800">Heritage Apricots & Peaches</span>
              <span className="text-stone-500">Commercial: 9.5°Bx vs <strong className="text-amber-800 font-mono">Pomona: 17.5°Bx</strong></span>
            </div>
            <div className="relative h-6 bg-stone-100 rounded-lg overflow-hidden flex items-center">
              {/* Commercial indicator */}
              <div 
                className="h-full bg-stone-300 flex items-center justify-end pr-2 text-[10px] font-mono text-stone-600"
                style={{ width: '45%' }}
              >
                Supermarket (9.5°)
              </div>
              {/* Pomona indicator */}
              <div 
                className="h-full bg-amber-600 flex items-center justify-end pr-2 text-[10px] font-mono text-white font-semibold"
                style={{ width: '40%' }}
              >
                Pomona Tree-Ripened (17.5°)
              </div>
            </div>
          </div>

          {/* Citrus / Blood Oranges */}
          <div>
            <div className="flex justify-between text-xs mb-1.5 font-medium">
              <span className="text-stone-800">Meyer Lemons & Cara Cara Oranges</span>
              <span className="text-stone-500">Commercial: 10.0°Bx vs <strong className="text-amber-800 font-mono">Pomona: 14.8°Bx</strong></span>
            </div>
            <div className="relative h-6 bg-stone-100 rounded-lg overflow-hidden flex items-center">
              <div 
                className="h-full bg-stone-300 flex items-center justify-end pr-2 text-[10px] font-mono text-stone-600"
                style={{ width: '48%' }}
              >
                Supermarket (10.0°)
              </div>
              <div 
                className="h-full bg-amber-600 flex items-center justify-end pr-2 text-[10px] font-mono text-white font-semibold"
                style={{ width: '28%' }}
              >
                Pomona Sun-Sweetened (14.8°)
              </div>
            </div>
          </div>

          {/* Black Mission Figs */}
          <div>
            <div className="flex justify-between text-xs mb-1.5 font-medium">
              <span className="text-stone-800">Black Mission Late-Summer Figs</span>
              <span className="text-stone-500">Commercial: 12.0°Bx vs <strong className="text-amber-800 font-mono">Pomona: 21.4°Bx</strong></span>
            </div>
            <div className="relative h-6 bg-stone-100 rounded-lg overflow-hidden flex items-center">
              <div 
                className="h-full bg-stone-300 flex items-center justify-end pr-2 text-[10px] font-mono text-stone-600"
                style={{ width: '55%' }}
              >
                Supermarket (12.0°)
              </div>
              <div 
                className="h-full bg-amber-600 flex items-center justify-end pr-2 text-[10px] font-mono text-white font-semibold"
                style={{ width: '40%' }}
              >
                Pomona Confection Ripeness (21.4°)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Pillars of Freshness */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#FAF9F5] border border-stone-200 p-6 rounded-xl space-y-3">
          <Sun className="w-6 h-6 text-amber-700" />
          <h4 className="text-base font-semibold text-stone-900">Tree-Ripened Integrity</h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Fruits accumulate essential aromatic terpene compounds and fructose during their final 72 hours on the branch. We refuse premature harvesting.
          </p>
        </div>

        <div className="bg-[#FAF9F5] border border-stone-200 p-6 rounded-xl space-y-3">
          <ThermometerSnowflake className="w-6 h-6 text-sky-700" />
          <h4 className="text-base font-semibold text-stone-900">42°F Cold-Chain Transit</h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Insulated in biodegradable mycelium trays with frozen organic water packs. Keeps moisture locked and cell respiration paused until your kitchen.
          </p>
        </div>

        <div className="bg-[#FAF9F5] border border-stone-200 p-6 rounded-xl space-y-3">
          <HeartHandshake className="w-6 h-6 text-emerald-700" />
          <h4 className="text-base font-semibold text-stone-900">The 100% Flavor Pledge</h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            If any single fruit arrives bruised, under-sweet, or damaged in transit, tap one button in your receipt for an instant automatic replacement.
          </p>
        </div>
      </div>
    </section>
  );
};
