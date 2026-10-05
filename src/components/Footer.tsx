import React, { useState } from 'react';
import { ArrowRight, Check, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-stone-800">
          
          {/* Brand & Mission Column */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-2xl font-serif font-medium text-white tracking-tight block">
              Pomona Harvest
            </span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Connecting conscientious fruit lovers directly to 34 heritage family orchards across the Pacific coast and sun-drenched Mediterranean microclimates. Tree-ripened, scientifically tested for Brix sweetness, and cold-packed with zero plastics.
            </p>
            <div className="text-xs text-stone-500 font-mono">
              Cold Chain Standard: 42°F Unbroken
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs font-semibold text-white uppercase tracking-wider">
              Marketplace
            </p>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Stone Fruits & Figs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Ojai Citrus Groves
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Wild Mountain Berries
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('crate-builder')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Build a Custom Crate
                </button>
              </li>
            </ul>
          </div>

          {/* Sourcing & Transparency Column */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs font-semibold text-white uppercase tracking-wider">
              Transparency
            </p>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('ripeness-guide')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Brix Refractometer Scale
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('farm-story')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Partner Orchard Guild
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ripeness-guide')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Mycelium Packaging
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  100% Organic Standards
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-semibold text-white uppercase tracking-wider">
              Weekly Dawn Harvest Alerts
            </p>
            <p className="text-xs text-stone-400">
              Receive notifications when rare limited-harvest fruit varieties (like Royal Blenheim apricots and Black Mission figs) drop each Tuesday.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2 pt-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@domain.com"
                className="flex-1 bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-stone-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-stone-100 text-stone-900 text-xs font-semibold rounded-lg hover:bg-white transition-colors cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>You're on the priority harvest release list!</span>
              </p>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Pomona Harvest Inc. All rights reserved. Sourced with honor.</p>
          <div className="flex items-center gap-6 text-stone-400">
            <span>USDA Organic Compliant</span>
            <span>·</span>
            <span>Non-GMO Certified</span>
            <span>·</span>
            <span>Zero Plastic Packing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
