import React, { useState } from 'react';
import { CartItem } from '../types/fruit';
import { X, Trash2, ArrowRight, ShieldCheck, ThermometerSnowflake, Tag, Check } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  appliedPromo: { code: string; discountPercent: number; discountDollars: number } | null;
  onApplyPromo: (promo: { code: string; discountPercent: number; discountDollars: number } | null) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromo,
  onApplyPromo,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = cart.reduce((acc, item) => {
    return acc + item.selectedPackaging.price * item.quantity;
  }, 0);

  // Free shipping threshold at $45
  const freeShippingThreshold = 45;
  const isFreeShipping = rawSubtotal >= freeShippingThreshold;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - rawSubtotal);

  // Calculate discount
  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPercent > 0) {
      discountAmount = (rawSubtotal * appliedPromo.discountPercent) / 100;
    } else if (appliedPromo.discountDollars > 0) {
      discountAmount = Math.min(rawSubtotal, appliedPromo.discountDollars);
    }
  }

  const shippingCost = isFreeShipping || cart.length === 0 ? 0 : 7.5;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + shippingCost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const clean = promoInput.trim().toUpperCase();

    if (clean === 'HARVEST10') {
      onApplyPromo({ code: 'HARVEST10', discountPercent: 0, discountDollars: 10 });
      setPromoSuccess('$10 discount applied!');
      setPromoInput('');
    } else if (clean === 'FIRSTBRIX' || clean === 'SPRING15') {
      onApplyPromo({ code: clean, discountPercent: 15, discountDollars: 0 });
      setPromoSuccess('15% orchard discount applied!');
      setPromoInput('');
    } else {
      setPromoError('Invalid coupon. Try HARVEST10 or SPRING15');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/50 backdrop-blur-xs flex justify-end animate-fadeIn">
      {/* Drawer Container */}
      <div 
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl border-l border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-stone-900">Your Harvest Bag</h2>
            <span className="text-xs font-mono bg-stone-100 px-2 py-0.5 rounded text-stone-700 tabular-nums">
              {cart.reduce((a, b) => a + b.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3 bg-stone-50 border-b border-stone-100 text-xs">
          {isFreeShipping ? (
            <p className="text-emerald-800 font-medium flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>You've unlocked <strong>Free Refrigerated Cold-Pack Shipping!</strong></span>
            </p>
          ) : (
            <div>
              <p className="text-stone-600">
                Add <strong className="text-stone-900 font-mono">${amountToFreeShipping.toFixed(2)}</strong> more for free cold-chain transit.
              </p>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden mt-2">
                <div
                  className="bg-amber-600 h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (rawSubtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Itemized List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
              <p className="font-serif text-lg text-stone-800 font-medium mb-1">
                Your harvest bag is currently empty
              </p>
              <p className="text-xs max-w-xs text-stone-500 mb-6">
                Explore today's hand-picked tree-ripened stone fruit, citrus crates, or wild berries.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Browse Seasonal Harvest
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const itemTotal = (item.selectedPackaging.price * item.quantity).toFixed(2);
              return (
                <div
                  key={item.cartItemId}
                  className="flex gap-3 pb-4 border-b border-stone-100 last:border-0"
                >
                  <img
                    src={item.fruit.image}
                    alt={item.fruit.name}
                    className="w-18 h-18 rounded-lg object-cover bg-stone-100 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-semibold text-stone-900 leading-snug line-clamp-1">
                          {item.fruit.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-stone-400 hover:text-red-600 p-0.5 cursor-pointer transition-colors"
                          aria-label={`Remove ${item.fruit.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-stone-500 mt-0.5">
                        {item.selectedPackaging.name}
                      </p>

                      {/* Custom Crate itemization if custom crate */}
                      {item.customCrateItems && (
                        <p className="text-[10px] text-stone-500 line-clamp-2 mt-0.5 italic">
                          Mix: {item.customCrateItems.map((c) => `${c.count}x ${c.fruitName.split(' ')[0]}`).join(', ')}
                        </p>
                      )}

                      <p className="text-[10px] text-amber-800 font-medium mt-0.5">
                        {item.ripenessPreference === 'ready-now' ? 'Peak Ready (Eat Today)' : 'Firm Pick (Ripens in 2-3 days)'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-200 disabled:opacity-30 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2.5 text-xs font-mono font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-200 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-mono text-xs font-semibold text-stone-900 tabular-nums">
                        ${itemTotal}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Checkout Module */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Promo (HARVEST10)"
                  className="w-full pl-8 pr-2 py-1.5 text-xs bg-white border border-stone-300 rounded-lg uppercase placeholder:normal-case focus:outline-none focus:border-stone-500"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 bg-stone-800 text-white text-xs font-medium rounded-lg hover:bg-stone-700 transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {promoError && (
              <p className="text-[11px] text-red-600">{promoError}</p>
            )}
            {promoSuccess && (
              <p className="text-[11px] text-emerald-700 font-medium">{promoSuccess}</p>
            )}
            {appliedPromo && !promoSuccess && (
              <div className="flex items-center justify-between text-[11px] text-emerald-800 bg-emerald-50 px-2 py-1 rounded">
                <span>Code {appliedPromo.code} Active</span>
                <button
                  onClick={() => onApplyPromo(null)}
                  className="text-stone-500 hover:text-stone-900 text-[10px] underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs pt-1">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-stone-900">${rawSubtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Harvest Discount</span>
                  <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-600">
                <span>Cold-Chain Insulated Shipping</span>
                <span className="font-mono tabular-nums text-stone-900">
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-sm font-semibold text-stone-950 pt-2 border-t border-stone-200">
                <span>Estimated Total</span>
                <span className="font-mono tabular-nums">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
            >
              <span>Proceed to Delivery & Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
