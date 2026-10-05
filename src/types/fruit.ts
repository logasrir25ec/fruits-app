export type FruitCategory = 
  | 'all'
  | 'stone'
  | 'citrus'
  | 'berries'
  | 'apples-pears'
  | 'tropical'
  | 'curated-crates';

export interface PackagingOption {
  id: string;
  name: string;
  weightLbs: number;
  price: number;
  unitLabel: string;
}

export interface FruitItem {
  id: string;
  name: string;
  scientificName: string;
  category: FruitCategory;
  pricePerUnit: number;
  unit: string; // e.g. "3 lb basket", "2 lb clamshell", "12 pc crate"
  image: string;
  fallbackColor: string;
  farm: string;
  origin: string;
  brixRating: number; // sugar sweetness index (e.g. 14.5)
  seasonStatus: 'Peak Season' | 'Limited Harvest' | 'First Pick' | 'Late Harvest';
  organic: boolean;
  tastingNotes: string[];
  description: string;
  harvestDate: string;
  storageTip: string;
  nutrition: {
    caloriesPer100g: number;
    vitaminCPercentDaily: number;
    fiberGrams: number;
    potassiumMg: number;
  };
  packagingOptions: PackagingOption[];
}

export interface CartItem {
  cartItemId: string;
  fruit: FruitItem;
  quantity: number;
  selectedPackaging: PackagingOption;
  ripenessPreference: 'ready-now' | 'firm-ripen-at-home';
  customCrateItems?: { fruitName: string; count: number }[];
}

export interface SeasonalCrateTier {
  id: string;
  name: string;
  capacity: number;
  basePrice: number;
  description: string;
  bestFor: string;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customerName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryDate: string;
  deliverySlot: string;
  paymentMethod: string;
  createdAt: string;
}
