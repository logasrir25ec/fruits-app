import React, { useState, useMemo } from 'react';
import { FruitCategory, FruitItem } from '../types/fruit';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, Sparkles, X, RotateCcw } from 'lucide-react';

interface FruitCatalogProps {
  fruits: FruitItem[];
  onSelectFruit: (fruit: FruitItem) => void;
  onQuickAdd: (fruit: FruitItem) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const CATEGORIES: { id: FruitCategory; label: string }[] = [
  { id: 'all', label: 'All Harvests' },
  { id: 'citrus', label: 'Citrus & Sun' },
  { id: 'berries', label: 'Wild Berries' },
  { id: 'stone', label: 'Heirloom Stone' },
  { id: 'apples-pears', label: 'Crisp Apples & Pears' },
  { id: 'tropical', label: 'Exotic & Tropical' },
  { id: 'curated-crates', label: 'Curated Crates' },
];

export const FruitCatalog: React.FC<FruitCatalogProps> = ({
  fruits,
  onSelectFruit,
  onQuickAdd,
  searchQuery,
  onSearchChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FruitCategory>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'brix' | 'price-asc' | 'price-desc'>('featured');
  const [organicOnly, setOrganicOnly] = useState(false);

  // Filter & Sort logic
  const filteredFruits = useMemo(() => {
    return fruits
      .filter((fruit) => {
        const matchesCategory =
          selectedCategory === 'all' || fruit.category === selectedCategory;
        const matchesSearch =
          fruit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fruit.farm.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fruit.tastingNotes.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
          fruit.origin.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesOrganic = !organicOnly || fruit.organic;

        return matchesCategory && matchesSearch && matchesOrganic;
      })
      .sort((a, b) => {
        if (sortBy === 'brix') return b.brixRating - a.brixRating;
        if (sortBy === 'price-asc') return a.pricePerUnit - b.pricePerUnit;
        if (sortBy === 'price-desc') return b.pricePerUnit - a.pricePerUnit;
        return 0; // featured order in dataset
      });
  }, [fruits, selectedCategory, searchQuery, organicOnly, sortBy]);

  return (
    <section id="catalog" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">
            <span>Direct Orchard Sourcing</span>
            <span aria-hidden="true">·</span>
            <span>Cold-Chain Delivered</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-stone-950 mt-1">
            Today's Fresh Harvest Catalog
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Filtered by tree-ripeness and hand-tested natural sugar content.
          </p>
        </div>

        {/* Live Counter */}
        <div className="text-xs text-stone-500 font-mono">
          Showing <span className="text-stone-900 font-semibold tabular-nums">{filteredFruits.length}</span> varieties available for harvest
        </div>
      </div>

      {/* Controls Bar: Category Tabs, Search, Sort & Filter */}
      <div className="mt-8 space-y-4">
        {/* Interactive Segmented Filter Controls (Rule 1.A DO: clean segmented backgrounds) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search, Sort, Organic Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          {/* Search Field */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by variety, flavor notes, or orchard location..."
              className="w-full pl-9 pr-9 py-2 bg-white border border-stone-200 rounded-lg text-xs placeholder:text-stone-400 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 transition-all text-stone-900"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Organic Switch */}
            <label className="flex items-center gap-2 text-xs font-medium text-stone-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={organicOnly}
                onChange={(e) => setOrganicOnly(e.target.checked)}
                className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-400 cursor-pointer accent-stone-900"
              />
              <span>100% Certified Organic Only</span>
            </label>

            <span className="text-stone-300 hidden sm:inline">|</span>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-stone-600">
              <span className="whitespace-nowrap">Sort:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-white border border-stone-200 text-stone-800 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-stone-400 cursor-pointer"
              >
                <option value="featured">Orchard Featured</option>
                <option value="brix">Sweetest Brix Index First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid: 3-column desktop baseline */}
      {filteredFruits.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredFruits.map((fruit) => (
            <ProductCard
              key={fruit.id}
              fruit={fruit}
              onSelect={onSelectFruit}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="mt-12 py-16 px-6 bg-stone-50 border border-stone-200 rounded-xl text-center max-w-lg mx-auto">
          <p className="font-serif text-lg font-medium text-stone-900">
            No fruits match this specific harvest query
          </p>
          <p className="text-xs text-stone-500 mt-2 max-w-xs mx-auto leading-relaxed">
            Try resetting your search filters or browse across all varieties for today's pickings.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              onSearchChange('');
              setOrganicOnly(false);
            }}
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All Filters
          </button>
        </div>
      )}
    </section>
  );
};
