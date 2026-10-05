import React, { useState } from 'react';
import { CartItem, OrderDetails } from '../types/fruit';
import { X, CheckCircle2, ShieldCheck, ThermometerSnowflake, Truck, Calendar, CreditCard, Banknote, Sparkles } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  onOrderSuccess: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  subtotal,
  discount,
  shipping,
  total,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: 'Elena Rostova',
    email: 'elena.rostova@harvestclub.com',
    phone: '(415) 555-0194',
    address: '458 Orchard Vista Way',
    city: 'San Francisco',
    postalCode: '94114',
    deliverySlot: 'Morning Chilled (8:00 AM - 12:00 PM)',
    deliveryDate: 'Tomorrow Morning',
    paymentMethod: 'card',
    specialInstructions: 'Please leave in shaded porch cooler box.',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = `POM-${Math.floor(10000 + Math.random() * 90000)}`;
      const completedOrder: OrderDetails = {
        orderId: orderNumber,
        items: [...cart],
        subtotal,
        discount,
        shipping,
        total,
        customerName: formData.name,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        deliveryDate: formData.deliveryDate,
        deliverySlot: formData.deliverySlot,
        paymentMethod: formData.paymentMethod === 'card' ? 'Credit Card (Ending in 4242)' : 'Pay on Delivery / Fresh Inspection',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setConfirmedOrder(completedOrder);
      setStep('confirmed');
      setIsSubmitting(false);
      onOrderSuccess(completedOrder);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-stone-200 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div>
            <h2 className="text-xl font-serif font-medium text-stone-900">
              {step === 'form' ? 'Delivery & Chilled Transit Details' : 'Order Successfully Placed'}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {step === 'form' ? 'Packed fresh in compostable insulated coolers' : 'Cold-pack fulfillment initiated'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            
            {/* Contact & Address Information */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                1. Recipient & Delivery Address
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:bg-white focus:border-stone-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 mb-1">Email for Harvest Tracking</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:bg-white focus:border-stone-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-600 mb-1">Delivery Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:bg-white focus:border-stone-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 mb-1">City / Region</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:bg-white focus:border-stone-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:bg-white focus:border-stone-500"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Slot Choice */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider flex items-center justify-between">
                <span>2. Cold-Chain Delivery Slot</span>
                <span className="text-[11px] font-normal text-emerald-800 font-medium">Next-Day Arrival Guaranteed</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, deliverySlot: 'Morning Chilled (8:00 AM - 12:00 PM)' })}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    formData.deliverySlot.startsWith('Morning')
                      ? 'border-stone-900 bg-stone-50 font-medium'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-900">Morning Chilled</span>
                    <span className="text-[11px] font-mono text-stone-500">8AM - 12PM</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    First dispatch after dawn sorting. Best for stone fruits.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, deliverySlot: 'Afternoon Fresh (2:00 PM - 6:00 PM)' })}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    formData.deliverySlot.startsWith('Afternoon')
                      ? 'border-stone-900 bg-stone-50 font-medium'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-900">Afternoon Delivery</span>
                    <span className="text-[11px] font-mono text-stone-500">2PM - 6PM</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Delivered straight to home cooler or shaded porch.
                  </p>
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                3. Secure Payment Method
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center gap-3 ${
                    formData.paymentMethod === 'card'
                      ? 'border-stone-900 bg-stone-50 font-medium'
                      : 'border-stone-200 text-stone-600'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-stone-800" />
                  <div>
                    <span className="font-semibold text-stone-900 block">Credit / Debit Card</span>
                    <span className="text-[10px] text-stone-500">Visa, Mastercard, Amex</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center gap-3 ${
                    formData.paymentMethod === 'cod'
                      ? 'border-stone-900 bg-stone-50 font-medium'
                      : 'border-stone-200 text-stone-600'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-stone-800" />
                  <div>
                    <span className="font-semibold text-stone-900 block">Pay on Fresh Delivery</span>
                    <span className="text-[10px] text-stone-500">Inspect fruit upon arrival</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Order Summary & Submit Button */}
            <div className="border-t border-stone-200 pt-4 space-y-3">
              <div className="flex justify-between text-xs text-stone-600">
                <span>Items Subtotal</span>
                <span className="font-mono tabular-nums text-stone-900">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-xs text-emerald-700 font-medium">
                  <span>Harvest Discount</span>
                  <span className="font-mono tabular-nums">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-xs text-stone-600">
                <span>Cold-Chain Insulated Shipping</span>
                <span className="font-mono tabular-nums text-stone-900">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-stone-900 pt-1 border-t border-stone-100">
                <span>Total Due</span>
                <span className="font-mono tabular-nums">${total.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Reserving Orchard Harvest...</span>
                ) : (
                  <span>Confirm Harvest Order · ${total.toFixed(2)}</span>
                )}
              </button>
            </div>

          </form>
        ) : (
          /* Confirmation State */
          <div className="mt-6 space-y-6 animate-fadeIn">
            <div className="p-6 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
              <h3 className="text-xl font-serif font-medium text-emerald-950">
                Harvest Reserved & Order Confirmed!
              </h3>
              <p className="text-xs text-emerald-800">
                Order <strong className="font-mono">{confirmedOrder?.orderId}</strong> has been transmitted to our packing cellar.
              </p>
            </div>

            {/* Details Summary */}
            <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 text-xs space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-stone-400 block text-[11px]">Delivery Slot</span>
                  <span className="font-medium text-stone-900">{confirmedOrder?.deliverySlot}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Destination</span>
                  <span className="font-medium text-stone-900">{confirmedOrder?.address}, {confirmedOrder?.city}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Payment</span>
                  <span className="font-medium text-stone-900">{confirmedOrder?.paymentMethod}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Total Billed</span>
                  <span className="font-mono font-semibold text-stone-900 tabular-nums">
                    ${confirmedOrder?.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Itemized List */}
              <div className="pt-3 border-t border-stone-200 space-y-2">
                <span className="text-stone-500 font-semibold block text-[11px] uppercase tracking-wide">
                  Reserved Produce:
                </span>
                {confirmedOrder?.items.map((it) => (
                  <div key={it.cartItemId} className="flex justify-between text-stone-700">
                    <span>
                      {it.quantity}x {it.fruit.name} ({it.selectedPackaging.name})
                    </span>
                    <span className="font-mono tabular-nums">
                      ${(it.selectedPackaging.price * it.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cold Chain Guarantee Card */}
            <div className="flex items-center gap-3 p-4 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-900">
              <ThermometerSnowflake className="w-5 h-5 text-sky-700 shrink-0" />
              <p>
                Your crate will be kept at an uninterrupted <strong>42°F</strong> with temperature-logging indicator tags. Confirmation sent to <strong>{confirmedOrder?.email}</strong>.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Back to Orchard Catalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
