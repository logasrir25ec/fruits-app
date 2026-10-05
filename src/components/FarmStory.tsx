import React from 'react';
import { MapPin, Sparkles, Sprout, Award } from 'lucide-react';
import { citrusImg, stoneFruitImg, berriesImg } from '../data/fruits';

export const FarmStory: React.FC = () => {
  return (
    <section id="farm-story" className="py-16 bg-stone-900 text-stone-100 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <span>Direct Orchard Provenance</span>
            <span aria-hidden="true">·</span>
            <span>Generational Stewards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white">
            Meet the Generational Growers Behind Your Fruit
          </h2>
          <p className="text-sm sm:text-base text-stone-400 leading-relaxed">
            We bypass industrial terminal auctions and corporate middlemen. 100% of our fruit is contracted directly with master arborists who cultivate heritage rootstock on organic mineral-rich soils.
          </p>
        </div>

        {/* 3 Orchard Spotlights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Farm 1 */}
          <div className="bg-stone-800/80 rounded-2xl overflow-hidden border border-stone-700/80 flex flex-col justify-between">
            <div className="aspect-4/3 overflow-hidden bg-stone-900">
              <img
                src={stoneFruitImg}
                alt="Capay Valley Heritage Orchards"
                className="w-full h-full object-cover hover:scale-103 transition-transform duration-300"
              />
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  Capay Valley, CA
                </span>
                <span>Est. 1928</span>
              </div>
              <h3 className="text-lg font-serif font-medium text-white">
                Capay Valley Heritage Orchards
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                4th generation stone fruit stewards. Their alluvial clay soils and Mediterranean hot days and breezy nights give Blenheim apricots their legendary honey aroma.
              </p>
              <div className="pt-2 text-xs text-amber-300 font-medium">
                Specialty: Heirloom Apricots & Velvet Nectarines
              </div>
            </div>
          </div>

          {/* Farm 2 */}
          <div className="bg-stone-800/80 rounded-2xl overflow-hidden border border-stone-700/80 flex flex-col justify-between">
            <div className="aspect-4/3 overflow-hidden bg-stone-900">
              <img
                src={citrusImg}
                alt="Sundance Citrus Grove"
                className="w-full h-full object-cover hover:scale-103 transition-transform duration-300"
              />
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  Ojai Valley, CA
                </span>
                <span>Est. 1964</span>
              </div>
              <h3 className="text-lg font-serif font-medium text-white">
                Sundance Citrus Grove
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Nestled within the Topatopa mountain ring, the rare east-west mountain orientation traps warm maritime air, producing thin-skinned Meyer lemons with zero bitterness.
              </p>
              <div className="pt-2 text-xs text-amber-300 font-medium">
                Specialty: Heritage Meyer Lemons & Pink Navels
              </div>
            </div>
          </div>

          {/* Farm 3 */}
          <div className="bg-stone-800/80 rounded-2xl overflow-hidden border border-stone-700/80 flex flex-col justify-between">
            <div className="aspect-4/3 overflow-hidden bg-stone-900">
              <img
                src={berriesImg}
                alt="High Ridge Berry Cooperative"
                className="w-full h-full object-cover hover:scale-103 transition-transform duration-300"
              />
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  Auburn Foothills, CA
                </span>
                <span>Est. 1982</span>
              </div>
              <h3 className="text-lg font-serif font-medium text-white">
                High Ridge Berry Cooperative
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Perched at 2,400 feet, winter frost chill hours concentrate natural fruit sugars into high-altitude blackberries and blueberries that taste like wild mountain nectar.
              </p>
              <div className="pt-2 text-xs text-amber-300 font-medium">
                Specialty: Wild Mountain Marionberries & Blueberries
              </div>
            </div>
          </div>

        </div>

        {/* Regenerative Soil Commitments */}
        <div className="mt-12 pt-8 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-stone-400">
          <div className="flex items-start gap-3">
            <Sprout className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-200 block text-sm mb-1">Living Cover Crops</strong>
              Crimson clover and hairy vetch planted between tree rows naturally fix nitrogen without synthetic petroleum fertilizers.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-200 block text-sm mb-1">Fair Tree Pricing</strong>
              We pay growers an average of 42% above spot commodity market rates to support long-term arborist livelihoods.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sprout className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-200 block text-sm mb-1">100% Water Micro-Drip</strong>
              Precision underground root drip sensors reduce agricultural irrigation consumption by 35% compared to broadcast sprayers.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
