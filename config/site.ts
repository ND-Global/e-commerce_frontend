export const SITE_CONFIG = {
  name: 'VELORA',
  tagline: 'Modern Fashion. Everyday Luxury.',
  description: 'Discover curated modern fashion essentials for Men, Women, and Kids. Everyday luxury crafted with precision and sustainable craftsmanship.',
  
  // WhatsApp Ordering Configuration (central config value as required)
  whatsapp: {
    phoneNumber: '15550198374', // Replace with client's actual WhatsApp business number
    displayPhone: '+1 (555) 019-8374',
    createOrderMessage: (productName: string, quantity: number, price: number, size?: string, color?: string) => {
      const details = [
        `Hello VELORA Concierge! 👋`,
        `I would like to order the following item:`,
        `• Product: *${productName}*`,
        size ? `• Size: *${size}*` : '',
        color ? `• Color: *${color}*` : '',
        `• Quantity: *${quantity}*`,
        `• Total: *$${(price * quantity).toFixed(2)}*`,
        `Please confirm availability and help me complete this order. Thank you!`
      ].filter(Boolean).join('\n');

      return `https://wa.me/15550198374?text=${encodeURIComponent(details)}`;
    }
  },

  coupons: [
    {
      code: 'VELORA10',
      discountPercent: 10,
      minSpend: 0,
      usageCount: 142,
      expiry: '2026-12-31',
      isActive: true,
      description: '10% off on all orders'
    },
    {
      code: 'SAVE20',
      discountPercent: 20,
      minSpend: 150,
      usageCount: 89,
      expiry: '2026-12-31',
      isActive: true,
      description: '20% off on orders over $150'
    },
    {
      code: 'WELCOME15',
      discountPercent: 15,
      minSpend: 50,
      usageCount: 310,
      expiry: '2026-12-31',
      isActive: true,
      description: '15% off for new members'
    }
  ],

  shipping: {
    freeShippingThreshold: 100,
    standardShippingFee: 12,
    estimatedDays: '3–5 Business Days'
  }
};
