import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, ThermometerSnowflake } from 'lucide-react';
import { heroImg } from '../data/fruits';

interface HeroProps {
  onExploreClick: () => void;
  onCustomCrateClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onCustomCrateClick }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Proposition */}
          <div className="lg:col-span-6 space-y-6">
            {/* Quiet unboxed kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 tracking-wider uppercase">
              <span>Artisanal Tree-Ripened Fruit</span>
              <span aria-hidden="true">·</span>
              <span>2026 Spring Harvest</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-stone-950 leading-[1.15] text-balance">
              Sun-ripened orchard fruits, harvested within 18 hours of your delivery.
            </h1>

            {/* Body Prose */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              Commercial fruit is picked weeks early to survive warehouse shelves. Pomona partners directly with 34 generational family orchards to pick at peak sugar ripeness, cold-packed in compostable cushioned crates.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors shadow-sm flex items-center gap-2.5 cursor-pointer whitespace-nowrap"
              >
                <span>Shop Today's Pickings</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onCustomCrateClick}
                className="px-6 py-3.5 bg-white border border-stone-300 text-stone-800 text-sm font-semibold rounded-lg hover:bg-stone-50 hover:border-stone-400 transition-colors cursor-pointer whitespace-nowrap"
              >
                Curate a Seasonal Box
              </button>
            </div>

            {/* Quantitative Claim-to-Proof Adjacency */}
            <div className="pt-8 border-t border-stone-200 grid grid-cols-3 gap-6">
              <div>
                <p className="font-mono text-2xl lg:text-3xl font-semibold text-stone-900 tabular-nums">
                  18h
                </p>
                <p className="text-xs text-stone-500 mt-0.5 leading-snug">
                  Max time from tree branch to insulated pack
                </p>
              </div>

              <div>
                <p className="font-mono text-2xl lg:text-3xl font-semibold text-amber-800 tabular-nums">
                  16.2°
                </p>
                <p className="text-xs text-stone-500 mt-0.5 leading-snug">
                  Average Brix sweetness (vs 10° in grocery stores)
                </p>
              </div>

              <div>
                <p className="font-mono text-2xl lg:text-3xl font-semibold text-stone-900 tabular-nums">
                  34
                </p>
                <p className="text-xs text-stone-500 mt-0.5 leading-snug">
                  Heritage family-owned orchards partner farms
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Image with caption */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-stone-100 aspect-16/9 sm:aspect-4/3 lg:aspect-16/10">
              <img
                src={heroImg}
                alt="Artisanal wooden harvest crate brimming with freshly picked vibrant fruits including blood oranges, peaches, figs, and cherries"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              {/* Measured Scrim for Editorial Caption */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/85 via-stone-950/40 to-transparent p-5 text-white flex items-end justify-between">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-amber-300">
                    Capay Valley Harvest Reserve
                  </p>
                  <p className="text-sm font-medium text-stone-100">
                    Hand-picked at dawn, cushioned in botanical wood-wool
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-stone-300 bg-stone-900/60 backdrop-blur-xs px-2.5 py-1 rounded">
                  <ThermometerSnowflake className="w-3.5 h-3.5 text-sky-300" />
                  <span className="font-mono tabular-nums">42°F Cold Chain</span>
                </div>
              </div>
            </div>

            {/* Three key trust pillars */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600 px-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                100% Pesticide residue tested
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Zero-bruise mycelium packaging
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Sweetness guarantee or refund
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
