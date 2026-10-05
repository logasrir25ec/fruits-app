import React, { useState } from 'react';
import { ShoppingBag, Search, Sparkles, X, Menu } from 'lucide-react';
import { CartItem } from '../types/fruit';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenSearch: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  onOpenSearch,
  onNavigate,
}) => {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-stone-200">
      {/* Slim Promotional/Freshness Bar */}
      {!bannerDismissed && (
        <aside 
          aria-label="Fresh harvest notification"
          className="bg-stone-900 text-stone-200 text-xs py-2 px-4 transition-all"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <p className="flex items-center gap-2 truncate text-xs font-normal">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
              <span className="text-stone-300">Today's Harvest Shipping:</span>
              <span className="text-stone-100 font-medium">Blenheim Apricots & Meyer Lemons tested at peak 16.5° Brix</span>
              <span className="hidden md:inline text-stone-400">· Free chilled delivery over $45</span>
            </p>
            <button
              onClick={() => setBannerDismissed(true)}
              className="text-stone-400 hover:text-white transition-colors p-1 cursor-pointer shrink-0"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* Top Bar Contract: 3 zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single element wordmark */}
        <button
          onClick={() => onNavigate('hero')}
          className="text-2xl font-serif tracking-tight text-stone-900 hover:text-stone-700 transition-colors text-left shrink-0 cursor-pointer"
        >
          Pomona Harvest
        </button>

        {/* Zone 2: Clean text navigation links with subtle hover underlines */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <button
            onClick={() => onNavigate('catalog')}
            className="hover:text-stone-950 transition-colors cursor-pointer relative py-1"
          >
            Seasonal Fruits
          </button>
          <button
            onClick={() => onNavigate('crate-builder')}
            className="hover:text-stone-950 transition-colors cursor-pointer relative py-1"
          >
            Curate a Crate
          </button>
          <button
            onClick={() => onNavigate('ripeness-guide')}
            className="hover:text-stone-950 transition-colors cursor-pointer relative py-1"
          >
            Brix & Ripeness
          </button>
          <button
            onClick={() => onNavigate('farm-story')}
            className="hover:text-stone-950 transition-colors cursor-pointer relative py-1"
          >
            Our Family Orchards
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSearch}
            className="p-2 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer rounded-lg hover:bg-stone-100"
            aria-label="Search fruits"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenCart}
            className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Harvest Bag</span>
            <span className="bg-amber-600 text-white text-[11px] font-mono tabular-nums px-1.5 py-0.5 rounded-sm">
              {totalItemsCount}
            </span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FAF9F5] px-6 py-4 space-y-3">
          <button
            onClick={() => {
              onNavigate('catalog');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-base font-medium text-stone-800 hover:text-stone-950"
          >
            Seasonal Fruits
          </button>
          <button
            onClick={() => {
              onNavigate('crate-builder');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-base font-medium text-stone-800 hover:text-stone-950"
          >
            Curate a Crate
          </button>
          <button
            onClick={() => {
              onNavigate('ripeness-guide');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-base font-medium text-stone-800 hover:text-stone-950"
          >
            Brix & Ripeness Standard
          </button>
          <button
            onClick={() => {
              onNavigate('farm-story');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-base font-medium text-stone-800 hover:text-stone-950"
          >
            Our Family Orchards
          </button>
        </div>
      )}
    </header>
  );
};
