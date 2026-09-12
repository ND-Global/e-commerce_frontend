import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface WhatsAppButtonProps {
  productName: string;
  price: number;
  quantity?: number;
  size?: string;
  color?: string;
  variant?: 'full' | 'inline' | 'floating';
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  productName,
  price,
  quantity = 1,
  size,
  color,
  variant = 'full'
}) => {
  const whatsappUrl = SITE_CONFIG.whatsapp.createOrderMessage(
    productName,
    quantity,
    price,
    size,
    color
  );

  if (variant === 'floating') {
    return (
      <a
        id="whatsapp-floating-button"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order via WhatsApp Concierge"
        className="fixed bottom-6 left-6 z-40 bg-[#25D366] hover:bg-[#20BA5A] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 text-xs font-bold tracking-wide">
          Order via WhatsApp
        </span>
      </a>
    );
  }

  if (variant === 'inline') {
    return (
      <a
        id={`whatsapp-inline-order-${productName.toLowerCase().replace(/\s+/g, '-')}`}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center space-x-1.5 text-xs text-[#2A6E3F] hover:text-[#1E522E] font-medium transition-colors"
      >
        <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
        <span>Instant WhatsApp Order</span>
      </a>
    );
  }

  return (
    <a
      id={`whatsapp-full-order-${productName.toLowerCase().replace(/\s+/g, '-')}`}
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full py-3.5 px-4 bg-[#E8F3EB] hover:bg-[#DDF0E2] text-[#1E522E] border border-[#CDE5D3] rounded-lg text-xs uppercase tracking-[0.15em] font-semibold flex items-center justify-center space-x-2 transition-all duration-200 hover:shadow-xs"
    >
      <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
      <span>Order via WhatsApp Concierge</span>
    </a>
  );
};
