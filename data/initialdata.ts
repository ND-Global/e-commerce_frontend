import { Order, User, Coupon } from '../types';
import { SITE_CONFIG } from '../config/site';

export const INITIAL_USER: User = {
  name: 'Sophia Laurent',
  email: 'sophia.laurent@velora.com',
  phone: '+1 (555) 234-5678',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  savedAddresses: [
    {
      fullName: 'Sophia Laurent',
      email: 'sophia.laurent@velora.com',
      phone: '+1 (555) 234-5678',
      addressLine: '742 Evergreen Terrace, Penthouse B',
      city: 'New York',
      state: 'NY',
      pincode: '10001',
      isDefault: true
    },
    {
      fullName: 'Sophia Laurent (Design Studio)',
      email: 'sophia.laurent@velora.com',
      phone: '+1 (555) 234-5678',
      addressLine: '450 West Broadway, Suite 400',
      city: 'New York',
      state: 'NY',
      pincode: '10012',
      isDefault: false
    }
  ]
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'VL-2026-8942',
    date: '2026-08-19',
    customerName: 'Sophia Laurent',
    customerEmail: 'sophia.laurent@velora.com',
    customerPhone: '+1 (555) 234-5678',
    shippingAddress: {
      fullName: 'Sophia Laurent',
      email: 'sophia.laurent@velora.com',
      phone: '+1 (555) 234-5678',
      addressLine: '742 Evergreen Terrace, Penthouse B',
      city: 'New York',
      state: 'NY',
      pincode: '10001'
    },
    items: [
      {
        productId: 'women-oversized-blazer',
        productName: 'Oversized Tailored Wool Blazer',
        category: 'Blazers',
        price: 165,
        originalPrice: 210,
        quantity: 1,
        size: 'S',
        color: 'Warm Cream',
        image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&q=80&w=600'
      },
      {
        productId: 'women-wide-leg-trousers',
        productName: 'High-Waist Pleated Wide Leg Trousers',
        category: 'Pants',
        price: 98,
        originalPrice: 125,
        quantity: 1,
        size: 'M',
        color: 'Sandstone Beige',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600'
      }
    ],
    subtotal: 263,
    discountAmount: 26.30,
    shippingFee: 0,
    total: 236.70,
    couponCode: 'VELORA10',
    paymentMethod: 'UPI',
    paymentStatus: 'PAID',
    status: 'SHIPPED',
    estimatedDelivery: '2026-08-23',
    timeline: [
      {
        status: 'ORDER PLACED',
        timestamp: 'Aug 19, 2026 - 10:24 AM',
        description: 'Order placed and authenticated via Demo UPI.',
        completed: true
      },
      {
        status: 'CONFIRMED',
        timestamp: 'Aug 19, 2026 - 11:15 AM',
        description: 'Order verified and sent to fulfillment center.',
        completed: true
      },
      {
        status: 'SHIPPED',
        timestamp: 'Aug 20, 2026 - 03:40 PM',
        description: 'Package in transit with express carrier #VEL-EXP-8942.',
        completed: true
      },
      {
        status: 'OUT FOR DELIVERY',
        timestamp: 'Pending',
        description: 'Courier assigned for same-day delivery route.',
        completed: false
      },
      {
        status: 'DELIVERED',
        timestamp: 'Expected Aug 23, 2026',
        description: 'Delivered securely to your address.',
        completed: false
      }
    ]
  },
  {
    id: 'VL-2026-7215',
    date: '2026-08-12',
    customerName: 'Sophia Laurent',
    customerEmail: 'sophia.laurent@velora.com',
    customerPhone: '+1 (555) 234-5678',
    shippingAddress: {
      fullName: 'Sophia Laurent',
      email: 'sophia.laurent@velora.com',
      phone: '+1 (555) 234-5678',
      addressLine: '742 Evergreen Terrace, Penthouse B',
      city: 'New York',
      state: 'NY',
      pincode: '10001'
    },
    items: [
      {
        productId: 'men-oversized-tee',
        productName: 'Oversized Heavyweight T-Shirt',
        category: 'T-Shirts',
        price: 48,
        originalPrice: 65,
        quantity: 2,
        size: 'L',
        color: 'Onyx Black',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600'
      }
    ],
    subtotal: 96,
    discountAmount: 0,
    shippingFee: 12,
    total: 108,
    paymentMethod: 'COD',
    paymentStatus: 'PAID',
    status: 'DELIVERED',
    estimatedDelivery: '2026-08-15',
    timeline: [
      {
        status: 'ORDER PLACED',
        timestamp: 'Aug 12, 2026 - 02:10 PM',
        description: 'Order placed via Cash on Delivery.',
        completed: true
      },
      {
        status: 'CONFIRMED',
        timestamp: 'Aug 12, 2026 - 02:45 PM',
        description: 'Order verified by VELORA concierge.',
        completed: true
      },
      {
        status: 'SHIPPED',
        timestamp: 'Aug 13, 2026 - 09:30 AM',
        description: 'Dispatched from atelier warehouse.',
        completed: true
      },
      {
        status: 'OUT FOR DELIVERY',
        timestamp: 'Aug 15, 2026 - 08:15 AM',
        description: 'Out for delivery with courier.',
        completed: true
      },
      {
        status: 'DELIVERED',
        timestamp: 'Aug 15, 2026 - 01:22 PM',
        description: 'Handed to recipient. Cash collected.',
        completed: true
      }
    ]
  }
];

export const INITIAL_COUPONS: Coupon[] = SITE_CONFIG.coupons;

export const HOME_REVIEWS = [
  {
    id: 'hr1',
    customerName: 'Camille Dubois',
    city: 'Paris, France',
    rating: 5,
    review: 'The quality of the French Linen and tailoring exceeded every expectation. VELORA has become my go-to for effortless everyday elegance.',
    productName: 'Relaxed French Linen Shirt',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'hr2',
    customerName: 'Marcus Sterling',
    city: 'London, UK',
    rating: 5,
    review: 'Finally found an oversized tee with substantial GSM weight and architectural drape that doesn’t lose shape in the wash. Exceptional craftsmanship.',
    productName: 'Oversized Heavyweight T-Shirt',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'hr3',
    customerName: 'Elena Rostova',
    city: 'Milan, Italy',
    rating: 5,
    review: 'The bias-cut satin dress is breathtaking. Fluid, comfortable, and commands attention in the most understated, chic way possible.',
    productName: 'Bias-Cut Silk Touch Satin Dress',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'hr4',
    customerName: 'David Chen',
    city: 'San Francisco, USA',
    rating: 5,
    review: 'Purchased the wool bomber and tailored cargo pants. The construction, matte hardware, and tactile luxury feel are second to none.',
    productName: 'Minimalist Wool Bomber Jacket',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  }
];
