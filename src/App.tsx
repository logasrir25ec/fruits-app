import React, { useState } from 'react';
import { FRUITS_DATA } from './data/fruits';
import { FruitItem, CartItem, PackagingOption, OrderDetails } from './types/fruit';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FruitCatalog } from './components/FruitCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CrateBuilder } from './components/CrateBuilder';
import { RipenessGuide } from './components/RipenessGuide';
import { FarmStory } from './components/FarmStory';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation / section focus
  const [activeSection, setActiveSection] = useState('hero');

  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Selected fruit for detail modal
  const [selectedFruit, setSelectedFruit] = useState<FruitItem | null>(null);

  // Cart state: seeded with one sample item so user immediately sees a populated realistic store
  const [cart, setCart] = useState<CartItem[]>([
    {
      cartItemId: 'seed-citrus',
      fruit: FRUITS_DATA[0],
      quantity: 1,
      selectedPackaging: FRUITS_DATA[0].packagingOptions[1], // 4 lb basket
      ripenessPreference: 'ready-now',
    },
  ]);

  // Drawer & Checkout modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Promo code
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discountPercent: number;
    discountDollars: number;
  } | null>({
    code: 'HARVEST10',
    discountPercent: 0,
    discountDollars: 10,
  });

  // Recent order state
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);

  // Quick add from catalog card
  const handleQuickAdd = (fruit: FruitItem) => {
    const defaultPack = fruit.packagingOptions[0];
    const existingIndex = cart.findIndex(
      (item) => item.fruit.id === fruit.id && item.selectedPackaging.id === defaultPack.id
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart([
        ...cart,
        {
          cartItemId: `${fruit.id}-${Date.now()}`,
          fruit,
          quantity: 1,
          selectedPackaging: defaultPack,
          ripenessPreference: 'ready-now',
        },
      ]);
    }
  };

  // Add from detailed modal
  const handleAddToCartDetailed = (
    fruit: FruitItem,
    packaging: PackagingOption,
    ripeness: 'ready-now' | 'firm-ripen-at-home',
    quantity: number
  ) => {
    const existingIndex = cart.findIndex(
      (item) =>
        item.fruit.id === fruit.id &&
        item.selectedPackaging.id === packaging.id &&
        item.ripenessPreference === ripeness
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      setCart(updated);
    } else {
      setCart([
        ...cart,
        {
          cartItemId: `${fruit.id}-${packaging.id}-${Date.now()}`,
          fruit,
          quantity,
          selectedPackaging: packaging,
          ripenessPreference: ripeness,
        },
      ]);
    }
  };

  // Add custom crate from Crate Builder
  const handleAddCrateToCart = (crateItem: CartItem) => {
    setCart([...cart, crateItem]);
    setIsCartOpen(true);
  };

  // Cart quantity changes
  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCart(
      cart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCart(cart.filter((item) => item.cartItemId !== cartItemId));
  };

  // Calculate pricing for checkout
  const rawSubtotal = cart.reduce((acc, item) => {
    return acc + item.selectedPackaging.price * item.quantity;
  }, 0);

  const isFreeShipping = rawSubtotal >= 45;
  const shippingCost = isFreeShipping || cart.length === 0 ? 0 : 7.5;

  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPercent > 0) {
      discountAmount = (rawSubtotal * appliedPromo.discountPercent) / 100;
    } else if (appliedPromo.discountDollars > 0) {
      discountAmount = Math.min(rawSubtotal, appliedPromo.discountDollars);
    }
  }

  const finalTotal = Math.max(0, rawSubtotal - discountAmount + shippingCost);

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenSearch = () => {
    handleNavigate('catalog');
    const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 flex flex-col">
      {/* Top Navigation Bar */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={handleOpenSearch}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Storefront Hero Section */}
        <Hero
          onExploreClick={() => handleNavigate('catalog')}
          onCustomCrateClick={() => handleNavigate('crate-builder')}
        />

        {/* Fruit Catalog Section */}
        <FruitCatalog
          fruits={FRUITS_DATA}
          onSelectFruit={(fruit) => setSelectedFruit(fruit)}
          onQuickAdd={handleQuickAdd}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Interactive Custom Crate Builder Section */}
        <CrateBuilder
          fruits={FRUITS_DATA}
          onAddCrateToCart={handleAddCrateToCart}
        />

        {/* Scientific Brix & Ripeness Standard Section */}
        <RipenessGuide />

        {/* Generational Orchard Stories Section */}
        <FarmStory />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Product Detail Modal */}
      <ProductDetailModal
        fruit={selectedFruit}
        onClose={() => setSelectedFruit(null)}
        onAddToCart={handleAddToCartDetailed}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedPromo={appliedPromo}
        onApplyPromo={setAppliedPromo}
      />

      {/* Multi-Step Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        subtotal={rawSubtotal}
        discount={discountAmount}
        shipping={shippingCost}
        total={finalTotal}
        onOrderSuccess={(order) => {
          setLastOrder(order);
          setCart([]); // Clear cart once placed
        }}
      />
    </div>
  );
}
