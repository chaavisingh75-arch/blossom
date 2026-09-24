export type Page = 'home' | 'about' | 'collection' | 'boutique' | 'gallery' | 'contact' | 'checkout';

export type FlowerCategory = 'All Flowers' | 'Romantic' | 'Happiness' | 'Friendship' | 'New Beginnings' | 'Peace & Calm';

export interface Flower {
  id: string;
  name: string;
  botanicalName?: string;
  emoji: string;
  categories: FlowerCategory[];
  symbolizes: string;
  message: string;
  description: string;
  image: string;
  palette: string[];
  price?: string;
  season?: string;
  featured?: boolean;
}

export type GalleryCategory =
  | 'All'
  | 'Boutique & Interior'
  | 'Bouquets & Gifts'
  | 'Romantic Moments'
  | 'Weddings & Events';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Boutique & Interior' | 'Bouquets & Gifts' | 'Romantic Moments' | 'Weddings & Events';
  description: string;
  image: string;
  aspect?: string;
}

export interface BouquetItem {
  flower: Flower;
  quantity: number;
}

export type BouquetOccasionFilter = 'All' | 'Romantic' | 'Birthday' | 'Anniversary' | 'Celebration' | 'Premium';

export interface ReadyBouquet {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: string;
  priceNum: number;
  image: string;
  occasions: BouquetOccasionFilter[];
  tag: string;
  stemCount: string;
  includes: string[];
  featured?: boolean;
}

export type OrderStatus = 'Order Confirmed' | 'Preparing Bouquet' | 'Out for Delivery' | 'Delivered';

export interface DeliveryDetails {
  fullName: string;
  mobileNumber: string;
  emailAddress: string;
  houseFlat: string;
  streetArea: string;
  city: string;
  state: string;
  pincode: string;
  deliveryDate: string;
  deliveryTime: string;
  deliveryDateFormatted?: string;
  deliverySlotId?: string;
  isExactTime?: boolean;
  exactTimeStr?: string;
  occasion?: string;
  giftCardNote?: string;
  senderName?: string;
  isAnonymous?: boolean;
  specialInstructions?: string;
  latitude?: number;
  longitude?: number;
  selectedLocationName?: string;
}

export interface BookedOrder {
  orderId: string;
  items: BouquetItem[];
  primaryBouquetName: string;
  primaryBouquetImage: string;
  totalQuantity: number;
  totalPrice: string;
  totalPriceNum: number;
  delivery: DeliveryDetails;
  status: OrderStatus;
  createdAt: string;
  ribbon?: string;
  giftNote?: string;
}
