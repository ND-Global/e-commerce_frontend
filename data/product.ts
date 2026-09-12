import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // ==================== MEN ====================
  {
    id: 'men-oversized-tee',
    slug: 'oversized-heavyweight-t-shirt',
    name: 'Oversized Heavyweight T-Shirt',
    category: 'T-Shirts',
    gender: 'men',
    price: 48,
    originalPrice: 65,
    discount: 26,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Crafted from 280 GSM organic combed cotton, this oversized silhouette delivers a structured drape with unmatched breathability. Features drop-shoulder construction and reinforced ribbed crewneck.',
    details: [
      '100% Organic heavyweight combed cotton (280 GSM)',
      'Relaxed drop-shoulder fit with boxy silhouette',
      'Pre-shrunk fabric to maintain tailored shape',
      'Double-stitched hems for lasting durability'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Onyx Black', hex: '#1A1A1A' },
      { name: 'Sand Taupe', hex: '#C2B69D' },
      { name: 'Pure Chalk', hex: '#F3F2EE' },
      { name: 'Muted Olive', hex: '#4A5543' }
    ],
    rating: 4.9,
    reviewsCount: 128,
    stock: 45,
    sku: 'VEL-M-TS01',
    isNewArrival: true,
    isTrending: true,
    material: '100% Organic Combed Cotton',
    fit: 'Oversized Boxy Fit',
    careInstructions: 'Machine wash cold inside out. Hang dry for best longevity.',
    reviews: [
      {
        id: 'r1',
        userName: 'Alexander Wright',
        rating: 5,
        date: '2 days ago',
        comment: 'The drape and weight of this t-shirt are extraordinary. Exactly what high-end streetwear should feel like.',
        verifiedPurchase: true,
        userLocation: 'New York, USA'
      },
      {
        id: 'r2',
        userName: 'Julian Vance',
        rating: 5,
        date: '1 week ago',
        comment: 'Held its shape perfectly after three washes. Truly luxurious fabric.',
        verifiedPurchase: true,
        userLocation: 'London, UK'
      }
    ]
  },
  {
    id: 'men-premium-shirt',
    slug: 'oxford-tailored-premium-shirt',
    name: 'Oxford Tailored Premium Shirt',
    category: 'Shirts',
    gender: 'men',
    price: 88,
    originalPrice: 110,
    discount: 20,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'An essential tailored shirt woven from fine Egyptian cotton with mother-of-pearl buttons. Perfectly bridges the gap between formal boardroom poise and smart-casual evenings.',
    details: [
      '100% Long-staple Egyptian cotton',
      'Semi-spread collar with removable collar stays',
      'Genuine mother-of-pearl engraved buttons',
      'Slightly tapered modern silhouette'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Sky Blue', hex: '#BFD7EA' },
      { name: 'Crisp White', hex: '#FFFFFF' },
      { name: 'Charcoal Pinstripe', hex: '#333333' }
    ],
    rating: 4.8,
    reviewsCount: 84,
    stock: 28,
    sku: 'VEL-M-SH02',
    isNewArrival: true,
    isTrending: false,
    material: '100% Egyptian Cotton',
    fit: 'Modern Tailored Fit',
    careInstructions: 'Warm machine wash. Warm iron while slightly damp.'
  },
  {
    id: 'men-linen-shirt',
    slug: 'relaxed-french-linen-shirt',
    name: 'Relaxed French Linen Shirt',
    category: 'Shirts',
    gender: 'men',
    price: 92,
    originalPrice: 115,
    discount: 20,
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Breezy luxury woven from harvested French flax. Natural temperature-regulating qualities ensure effortless comfort across warm climates and summer getaways.',
    details: [
      '100% Normandy French Linen',
      'Camp collar design with casual patch pocket',
      'Garment-dyed for depth of color and soft hand feel',
      'Curved hem for untucked versatility'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Natural Sand', hex: '#D8CAB8' },
      { name: 'Olive Green', hex: '#556B2F' },
      { name: 'Clean White', hex: '#FAFAFA' }
    ],
    rating: 4.7,
    reviewsCount: 62,
    stock: 19,
    sku: 'VEL-M-LN03',
    isNewArrival: false,
    isTrending: true,
    isSale: true
  },
  {
    id: 'men-relaxed-jeans',
    slug: 'selvedge-relaxed-denim-jeans',
    name: 'Selvedge Relaxed Denim Jeans',
    category: 'Jeans',
    gender: 'men',
    price: 118,
    originalPrice: 145,
    discount: 18,
    images: [
      '/tshirt(2).png',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Woven on vintage shuttle looms using 13.5 oz Japanese selvedge denim. Designed with an easy straight-leg taper and subtle vintage stone wash.',
    details: [
      '13.5 oz Japanese Selvedge Cotton',
      'Relaxed straight fit with a slight taper',
      'Antique copper hardware and button fly',
      'Chain-stitched hem with signature red selvedge ID line'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Vintage Indigo', hex: '#2A4D69' },
      { name: 'Washed Black', hex: '#2B2B2B' }
    ],
    rating: 4.9,
    reviewsCount: 95,
    stock: 32,
    sku: 'VEL-M-JN04',
    isNewArrival: true,
    isTrending: true
  },
  {
    id: 'men-cargo-pants',
    slug: 'utilitarian-tailored-cargo-pants',
    name: 'Utilitarian Tailored Cargo Pants',
    category: 'Pants',
    gender: 'men',
    price: 105,
    originalPrice: 130,
    discount: 19,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Elevated streetwear utility featuring discrete pleats, low-profile magnetic pocket flaps, and an adjustable ankle bungee system for versatile styling.',
    details: [
      'Water-repellent stretch cotton twill blend',
      'Concealed flush-fit cargo pockets with magnetic closures',
      'Elasticated waistband with hidden internal drawstring',
      'Reinforced knee gussets'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Dark Khaki', hex: '#706B52' },
      { name: 'Stealth Black', hex: '#1C1C1C' },
      { name: 'Cement Grey', hex: '#8E929D' }
    ],
    rating: 4.8,
    reviewsCount: 71,
    stock: 24,
    sku: 'VEL-M-CG05',
    isNewArrival: false,
    isTrending: true
  },
  {
    id: 'men-bomber-jacket',
    slug: 'minimalist-wool-bomber-jacket',
    name: 'Minimalist Wool Bomber Jacket',
    category: 'Jackets',
    gender: 'men',
    price: 175,
    originalPrice: 220,
    discount: 20,
    images: [
      'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'A luxurious reinterpretation of the aviation classic in double-faced Italian boiled wool. Clean gunmetal hardware and tonal ribbed trims offer an understated executive polish.',
    details: [
      '80% Italian Wool, 20% Cashmere blend',
      'Two-way matte gunmetal YKK zipper',
      'Silky cupro lining for smooth layering',
      'Internal passport and phone pockets'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Midnight Charcoal', hex: '#23272A' },
      { name: 'Warm Camel', hex: '#B58D5C' }
    ],
    rating: 5.0,
    reviewsCount: 43,
    stock: 14,
    sku: 'VEL-M-JK06',
    isNewArrival: true,
    isTrending: true,
    isSale: false
  },
  {
    id: 'men-polo-t-shirt',
    slug: 'mercerized-cotton-knit-polo',
    name: 'Mercerized Cotton Knit Polo',
    category: 'T-Shirts',
    gender: 'men',
    price: 68,
    originalPrice: 85,
    discount: 20,
    images: [
      '/sh.png',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Fine 14-gauge knit polo featuring a lustrous mercerized cotton yarn. Minimalist open placket without buttons for an effortless Mediterranean aesthetic.',
    details: [
      '100% Mercerized Cotton Yarn',
      'Johnny-style buttonless open polo collar',
      'Ribbed cuffs and hem that retain form',
      'Breathable honeycomb knit structure'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Espresso Brown', hex: '#362B28' },
      { name: 'Ecru', hex: '#F0ECE1' },
      { name: 'Navy Blue', hex: '#1B263B' }
    ],
    rating: 4.6,
    reviewsCount: 52,
    stock: 30,
    sku: 'VEL-M-PL07',
    isNewArrival: false,
    isTrending: false
  },
  {
    id: 'men-classic-hoodie',
    slug: 'heavyweight-fleece-hoodie',
    name: 'Heavyweight Luxe Fleece Hoodie',
    category: 'Hoodies',
    gender: 'men',
    price: 85,
    originalPrice: 110,
    discount: 22,
    images: [
      '/hoodie.png',
      '/hoodie(2).png'
    ],
    description: 'Custom 450 GSM brushed French terry cotton. Generous double-layered hood without drawstrings for a clean architectural profile.',
    details: [
      '450 GSM Heavyweight Brushed French Terry',
      'Seamless kangaroo pocket with reinforced bartacks',
      'Double-lined structured hood',
      'Heavy-rib side panels for ergonomic movement'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Heather Smoke', hex: '#9E9D9B' },
      { name: 'Washed Pitch', hex: '#222222' },
      { name: 'Oatmeal Milk', hex: '#EBE5D8' }
    ],
    rating: 4.9,
    reviewsCount: 160,
    stock: 50,
    sku: 'VEL-M-HD08',
    isNewArrival: true,
    isTrending: true
  },

  // ==================== WOMEN ====================
  {
    id: 'women-oversized-blazer',
    slug: 'oversized-wool-blend-blazer',
    name: 'Oversized Tailored Wool Blazer',
    category: 'Blazers',
    gender: 'women',
    price: 165,
    originalPrice: 210,
    discount: 21,
    images: [
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Sharp, menswear-inspired power dressing reimagined in lightweight tropical wool. Structured shoulders and a relaxed single-breasted silhouette exude effortless modern luxury.',
    details: [
      'Wool-blend weave with crease-resistant stretch',
      'Structured padded shoulders and peak lapels',
      'Tortoiseshell horn buttons',
      'Dual jet flap pockets and deep interior pocket'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Warm Cream', hex: '#EAE6DF' },
      { name: 'Charcoal Black', hex: '#202020' },
      { name: 'Camel Tan', hex: '#C19A6B' }
    ],
    rating: 5.0,
    reviewsCount: 145,
    stock: 35,
    sku: 'VEL-W-BZ01',
    isNewArrival: true,
    isTrending: true,
    reviews: [
      {
        id: 'rw1',
        userName: 'Eleanor Vance',
        rating: 5,
        date: '3 days ago',
        comment: 'The tailoring on this blazer rivals bespoke luxury houses. Sits impeccably over dresses and denim alike.',
        verifiedPurchase: true,
        userLocation: 'Paris, France'
      }
    ]
  },
  {
    id: 'women-satin-dress',
    slug: 'silk-touch-bias-cut-satin-dress',
    name: 'Bias-Cut Silk Touch Satin Dress',
    category: 'Dresses',
    gender: 'women',
    price: 135,
    originalPrice: 175,
    discount: 22,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Expertly cut on the bias to hug contours fluidly. Features delicate adjustable spaghetti straps, a soft cowl neckline, and a sweeping midi hem with a subtle side slit.',
    details: [
      'Heavyweight liquid silk-feel satin with gentle sheen',
      'Bias cut for natural ergonomic stretch and drape',
      'Adjustable gold-accented shoulder straps',
      'Concealed invisible side zipper'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Champagne Gold', hex: '#E6D7B9' },
      { name: 'Emerald Forest', hex: '#1E3F20' },
      { name: 'Midnight Noir', hex: '#111111' }
    ],
    rating: 4.9,
    reviewsCount: 88,
    stock: 22,
    sku: 'VEL-W-SD02',
    isNewArrival: true,
    isTrending: true,
    isSale: true
  },
  {
    id: 'women-wide-leg-trousers',
    slug: 'pleated-high-waist-wide-leg-trousers',
    name: 'High-Waist Pleated Wide Leg Trousers',
    category: 'Pants',
    gender: 'women',
    price: 98,
    originalPrice: 125,
    discount: 21,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Impeccably tailored trousers with twin knife pleats at the high-rise waistband. The fluid drape flows into a dramatic wide leg designed to elongate the silhouette.',
    details: [
      'Premium fluid twill blend that resists wrinkling',
      'Double front pleats with crisp center press',
      'Hook-and-bar closure with internal anchor button',
      'Deep functional slash pockets'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sandstone Beige', hex: '#D7CBBA' },
      { name: 'Pitch Black', hex: '#1A1A1A' },
      { name: 'Sage Mist', hex: '#9EAA98' }
    ],
    rating: 4.8,
    reviewsCount: 110,
    stock: 40,
    sku: 'VEL-W-TR03',
    isNewArrival: false,
    isTrending: true
  },
  {
    id: 'women-premium-top',
    slug: 'ribbed-asymmetric-draped-top',
    name: 'Ribbed Asymmetric Draped Top',
    category: 'Tops',
    gender: 'women',
    price: 54,
    originalPrice: 70,
    discount: 22,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Sculptural asymmetric neckline in a compact micro-rib knit. Creates a clean, minimalist focal point that pairs effortlessly with tailored trousers or denim.',
    details: [
      'Ultra-soft modal and elastane micro-rib knit',
      'One-shoulder folded drape neckline',
      'Double-layered front for full opacity',
      'Seamless body contouring fit'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Alabaster White', hex: '#F7F5F0' },
      { name: 'Dark Mocha', hex: '#3E2F2B' },
      { name: 'Obsidian', hex: '#121212' }
    ],
    rating: 4.7,
    reviewsCount: 65,
    stock: 35,
    sku: 'VEL-W-TP04',
    isNewArrival: true,
    isTrending: false
  },
  {
    id: 'women-denim-jacket',
    slug: 'vintage-washed-oversized-denim-jacket',
    name: 'Vintage Washed Denim Trucker Jacket',
    category: 'Jackets',
    gender: 'women',
    price: 110,
    originalPrice: 140,
    discount: 21,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Crafted from 100% rigid non-stretch cotton denim with intentional subtle distressing along seams. The boyfriend silhouette layers effortlessly over thick knits.',
    details: [
      '100% Sustainable organic cotton denim (12 oz)',
      'Custom stamped antiqued brass buttons',
      'Button-flap chest pockets and side welt pockets',
      'Adjustable waist tabs at back hem'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Washed Medium Blue', hex: '#4B739B' },
      { name: 'Bleached Salt', hex: '#D2DBE2' }
    ],
    rating: 4.9,
    reviewsCount: 78,
    stock: 25,
    sku: 'VEL-W-DJ05',
    isNewArrival: false,
    isTrending: true
  },
  {
    id: 'women-midi-dress',
    slug: 'pleated-belted-linen-midi-dress',
    name: 'Pleated Belted Linen Midi Dress',
    category: 'Dresses',
    gender: 'women',
    price: 125,
    originalPrice: 160,
    discount: 21,
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'A timeless summer silhouette crafted in pure European linen. Features a self-tie matching fabric belt, structured notch lapels, and practical side seam pockets.',
    details: [
      '100% European Certified Flax Linen',
      'Detachable sash belt with wood-accented D-rings',
      'A-line flared skirt with generous hem sweep',
      'Real shell button front'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Terracotta Rust', hex: '#A85A3C' },
      { name: 'Soft Cream', hex: '#F5F1E9' },
      { name: 'Navy Blue', hex: '#1C2833' }
    ],
    rating: 4.8,
    reviewsCount: 92,
    stock: 29,
    sku: 'VEL-W-MD06',
    isNewArrival: true,
    isTrending: true,
    isSale: true
  },
  {
    id: 'women-knit-sweater',
    slug: 'chunky-cashmere-blend-knit-sweater',
    name: 'Chunky Cashmere Blend Knit Sweater',
    category: 'Sweaters',
    gender: 'women',
    price: 140,
    originalPrice: 180,
    discount: 22,
    images: [
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Indulgently soft 7-gauge ribbed knit blending ethically sourced cashmere and superfine merino wool. High funnel neck offers cosy warmth without constriction.',
    details: [
      '30% Cashmere, 70% Superfine Merino Wool',
      'Foldable ribbed mock neckline',
      'Raglan sleeve construction for relaxed shoulder fit',
      'Side split hem detail for half-tuck styling'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Oatmeal Melange', hex: '#DDD6CC' },
      { name: 'Charcoal Grey', hex: '#3A3A3C' },
      { name: 'Butter Buttercup', hex: '#EBE2C8' }
    ],
    rating: 5.0,
    reviewsCount: 134,
    stock: 18,
    sku: 'VEL-W-SW07',
    isNewArrival: false,
    isTrending: true
  },
  {
    id: 'women-relaxed-shirt',
    slug: 'poplin-oversized-weekend-shirt',
    name: 'Poplin Oversized Weekend Shirt',
    category: 'Shirts',
    gender: 'women',
    price: 78,
    originalPrice: 95,
    discount: 17,
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Crisp organic cotton poplin tailored with an exaggerated rounded hem and box pleat at the back. Wear unbuttoned over a bikini or buttoned with tailored trousers.',
    details: [
      '100% Crisp Organic Cotton Poplin',
      'Mother-of-pearl buttons along front placket and cuff',
      'Single oversized breast pocket',
      'Deep curved shirttail hem'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Optic White', hex: '#FFFFFF' },
      { name: 'Breton Stripe', hex: '#3B4D61' },
      { name: 'Sage Green', hex: '#879782' }
    ],
    rating: 4.8,
    reviewsCount: 67,
    stock: 44,
    sku: 'VEL-W-SH08',
    isNewArrival: true,
    isTrending: false
  },

  // ==================== KIDS ====================
  {
    id: 'kids-hoodie',
    slug: 'kids-organic-fleece-comfort-hoodie',
    name: 'Kids Organic Cozy Fleece Hoodie',
    category: 'Hoodies',
    gender: 'kids',
    price: 42,
    originalPrice: 55,
    discount: 23,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Hypoallergenic organic cotton fleece gentle on sensitive young skin. Tagless comfort design with durable ribbed cuffs engineered for playground adventures.',
    details: [
      '100% GOTS Certified Organic Cotton Fleece',
      'Tagless neck label for scratch-free comfort',
      'Roomy kangaroo pocket for keeping treasures',
      'Stain-resistant fabric finish'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Oatmeal Melange', hex: '#E2DCD1' },
      { name: 'Dusty Rose', hex: '#D4A5A5' },
      { name: 'Ocean Teal', hex: '#3D7E80' }
    ],
    rating: 4.9,
    reviewsCount: 56,
    stock: 60,
    sku: 'VEL-K-HD01',
    isNewArrival: true,
    isTrending: true,
    reviews: [
      {
        id: 'rk1',
        userName: 'Sarah Jenkins',
        rating: 5,
        date: '5 days ago',
        comment: 'So soft and holds up wonderfully after messy days at kindergarten. Buying another color!',
        verifiedPurchase: true,
        userLocation: 'Toronto, Canada'
      }
    ]
  },
  {
    id: 'kids-tshirt',
    slug: 'kids-everyday-crew-cotton-tshirt',
    name: 'Kids Everyday Supima Cotton Tee',
    category: 'T-Shirts',
    gender: 'kids',
    price: 24,
    originalPrice: 30,
    discount: 20,
    images: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=1000',
      '/shirt.png',
    ],
    description: 'Ultra-soft Supima cotton designed for active youngsters. Vibrant non-toxic dye and flatlock seams prevent chafing.',
    details: [
      '100% American Supima Cotton',
      'Reinforced stretch neckline that won’t sag',
      'Pre-washed for instant lived-in softness',
      'Eco-friendly low-impact dye'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Sun Yellow', hex: '#F6C343' },
      { name: 'Sky Cyan', hex: '#87CEEB' },
      { name: 'Snow White', hex: '#FFFFFF' }
    ],
    rating: 4.8,
    reviewsCount: 42,
    stock: 80,
    sku: 'VEL-K-TS02',
    isNewArrival: false,
    isTrending: true
  },
  {
    id: 'kids-denim',
    slug: 'kids-comfort-stretch-denim-jeans',
    name: 'Kids Comfort Stretch Denim Jeans',
    category: 'Jeans',
    gender: 'kids',
    price: 46,
    originalPrice: 58,
    discount: 20,
    images: [
      '/kids.png',
      'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'High-stretch cotton denim with an internal adjustable button waistband that grows with your child. Reinforced knee fabric prevents tear-through.',
    details: [
      '98% Cotton, 2% High-Flex Elastane',
      'Internal button-hole elastic adjustable waistband',
      'Double-layer reinforced knees',
      'Snap button closure for easy dressing'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Mid Indigo Wash', hex: '#3B597B' },
      { name: 'Carbon Black', hex: '#262626' }
    ],
    rating: 4.9,
    reviewsCount: 38,
    stock: 45,
    sku: 'VEL-K-JN03',
    isNewArrival: true,
    isTrending: false
  },
  {
    id: 'kids-dress',
    slug: 'kids-tiered-floral-cotton-dress',
    name: 'Kids Tiered Cotton Twirl Dress',
    category: 'Dresses',
    gender: 'kids',
    price: 48,
    originalPrice: 62,
    discount: 22,
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1607453998774-d533f65dac99?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Whimsical tiered silhouette crafted in breathable organic cotton voile. Full twirl potential with elasticated puff sleeves and a gentle keyhole button back.',
    details: [
      '100% Breathable Organic Cotton Voile',
      'Fully lined in soft cotton lawn',
      'Gentle elasticated cuffs on puff sleeves',
      'Mother-of-pearl back neck button'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Peach Meadow', hex: '#F7C6B2' },
      { name: 'Lavender Mist', hex: '#D6C7E2' }
    ],
    rating: 5.0,
    reviewsCount: 64,
    stock: 35,
    sku: 'VEL-K-DR04',
    isNewArrival: true,
    isTrending: true,
    isSale: true
  },
  {
    id: 'kids-jacket',
    slug: 'kids-lightweight-quilted-bomber-jacket',
    name: 'Kids Lightweight Quilted Jacket',
    category: 'Jackets',
    gender: 'kids',
    price: 64,
    originalPrice: 80,
    discount: 20,
    images: [
      'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1514845505178-849cebf1a91d?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Weatherproof quilted jacket with lightweight recycled thermal insulation. Smooth front zipper with chin guard for safety and easy self-dressing.',
    details: [
      'Recycled water-resistant shell & insulation',
      'Soft chin guard to prevent zipper pinches',
      'Name tag label printed inside for school',
      'Reflective piping for dusk visibility'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Forest Olive', hex: '#44513E' },
      { name: 'Navy Blue', hex: '#1C2938' }
    ],
    rating: 4.8,
    reviewsCount: 31,
    stock: 26,
    sku: 'VEL-K-JK05',
    isNewArrival: false,
    isTrending: true
  },
  {
    id: 'kids-joggers',
    slug: 'kids-organic-terry-comfort-joggers',
    name: 'Kids Organic Terry Cozy Joggers',
    category: 'Joggers',
    gender: 'kids',
    price: 36,
    originalPrice: 45,
    discount: 20,
    images: [
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Relaxed fit joggers crafted in French terry with an elastic drawstring waist and ribbed ankle cuffs that prevent dragging on shoes.',
    details: [
      '100% Organic French Terry Cotton',
      'Functional cotton drawstring with safety knots',
      'Deep slash pockets for playground finds',
      'Elastic ribbed ankle cuffs'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Charcoal Heather', hex: '#4F5052' },
      { name: 'Sand Khaki', hex: '#C7BBA5' }
    ],
    rating: 4.7,
    reviewsCount: 49,
    stock: 55,
    sku: 'VEL-K-JG06',
    isNewArrival: false,
    isTrending: false
  },
  {
    id: 'kids-shirt',
    slug: 'kids-linen-blend-mandarin-shirt',
    name: 'Kids Linen-Blend Mandarin Collar Shirt',
    category: 'Shirts',
    gender: 'kids',
    price: 38,
    originalPrice: 48,
    discount: 20,
    images: [
      '/nilan.png',
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Dressed-up comfort with a relaxed mandarin band collar in a breezy linen-cotton blend. Ideal for family celebrations and sunny holidays.',
    details: [
      '55% Linen, 45% Organic Cotton',
      'Band collar with smooth covered inner seam',
      'Wood-effect buttons',
      'Roll-up sleeve tabs with button secure'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Crisp White', hex: '#FFFFFF' },
      { name: 'Sky Chambray', hex: '#A2BDD5' }
    ],
    rating: 4.8,
    reviewsCount: 29,
    stock: 30,
    sku: 'VEL-K-SH07',
    isNewArrival: true,
    isTrending: false
  },
  {
    id: 'kids-co-ord',
    slug: 'kids-waffle-knit-lounge-co-ord-set',
    name: 'Kids Waffle Knit 2-Piece Co-ord Set',
    category: 'Co-ords',
    gender: 'kids',
    price: 52,
    originalPrice: 68,
    discount: 23,
    images: [
      '/kids.png',
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Matching two-piece lounge set in rich thermal waffle knit. Includes an oversized crewneck sweatshirt and coordinating relaxed elastic-waist shorts.',
    details: [
      '100% Breathable Waffle Textured Cotton',
      'Matching top & bottom set for quick dressing',
      'Elastic waist with soft mock drawstring',
      'Resistant to pilling and stretching'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Sage Clay', hex: '#A3A897' },
      { name: 'Warm Cream', hex: '#EDE8DD' },
      { name: 'Caramel Toffee', hex: '#B88656' }
    ],
    rating: 4.9,
    reviewsCount: 45,
    stock: 40,
    sku: 'VEL-K-CD08',
    isNewArrival: true,
    isTrending: true,
    isSale: true
  }
];
