export type Gender = 'men' | 'women' | 'kids' | 'unisex';

export type Category = 
  | 'T-Shirts' 
  | 'Shirts' 
  | 'Jeans' 
  | 'Pants' 
  | 'Jackets' 
  | 'Hoodies' 
  | 'Blazers' 
  | 'Dresses' 
  | 'Sweaters' 
  | 'Co-ords' 
  | 'Joggers' 
  | 'Tops';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  userLocation?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category | string;
  gender: Gender;
  price: number;
  originalPrice: number;
  discount: number; // percentage (e.g. 20 for 20% off)
  images: string[];
  description: string;
  details?: string[];
  sizes: string[];
  colors: ProductColor[];
  rating: number;
  reviewsCount: number;
  reviews?: Review[];
  stock: number;
  sku: string;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isSale?: boolean;
  material?: string;
  fit?: string;
  careInstructions?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  size?: string;
  selectedSize?: string;
  color?: ProductColor;
  selectedColor?: ProductColor;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt?: string;
}

export type OrderStatus = 
  | 'ORDER PLACED' 
  | 'CONFIRMED' 
  | 'SHIPPED' 
  | 'OUT FOR DELIVERY' 
  | 'DELIVERED' 
  | 'CANCELLED'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export interface Address {
  fullName: string;
  email?: string;
  phone: string;
  street?: string;
  apartment?: string;
  addressLine?: string;
  city: string;
  state: string;
  postalCode?: string;
  pincode?: string;
  country?: string;
  isDefault?: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  product?: Product;
  category?: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  size?: string;
  selectedSize?: string;
  color?: string;
  selectedColor?: ProductColor;
  image?: string;
}

export interface Order {
  id: string; // e.g. "VL-2026-8921" or "VEL-8921"
  date?: string;
  createdAt?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  shippingAddress: Address;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  shippingFee?: number;
  shippingCost?: number;
  total: number;
  appliedCoupon?: string;
  couponCode?: string;
  paymentMethod: 'UPI' | 'COD' | 'card' | 'cod' | 'upi' | string;
  paymentStatus?: 'PAID' | 'PENDING';
  status: OrderStatus;
  estimatedDelivery: string;
  timeline?: {
    status: OrderStatus;
    timestamp: string;
    description: string;
    completed: boolean;
  }[];
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountPercentage?: number;
  minSpend?: number;
  usageCount?: number;
  usedCount?: number;
  expiry?: string;
  expiryDate?: string;
  isActive?: boolean;
  description?: string;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  membershipTier?: string;
  memberSince?: string;
  address?: Address;
  savedAddresses?: Address[];
}

export interface FilterState {
  gender: string[];
  category: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  minRating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  searchQuery: string;
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating' | 'discount';
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

// interface
addNewProduct: (
  product: Omit<Product, 'id' | 'images'>,
  files: File[]
) => Promise<boolean>;