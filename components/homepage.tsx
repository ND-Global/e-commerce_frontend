// import React from 'react';
// import { 
//   ArrowRight, 
//   Sparkles, 
//   Star, 
//   ShieldCheck, 
//   Truck, 
//   RotateCcw, 
//   Check, 
//   ArrowUpRight,
//   TrendingUp,
//   Clock,
//   Compass
// } from 'lucide-react';
// import { useShop } from '../context/shopcontext';
// import { ProductCard } from './productcard';
// import { HOME_REVIEWS } from '../data/initialdata';
// import { motion } from 'motion/react';



// export const HomePage: React.FC = () => {
//   const { products, navigate } = useShop();

//   // Filter products for homepage sections
//   const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 8);
//   const trendingProducts = products.filter((p) => p.isTrending).slice(0, 6);

//   const categories = [
//     {
//       name: 'MEN',
//       title: 'Men’s Travel & Capsule',
//       subtitle: 'Sharp tailoring, Japanese selvedge denim & heavyweight organic cottons',
//       image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=1000',
//       path: '/men',
//       itemCount: '8 Essential Styles'
//     },
//     {
//       name: 'WOMEN',
//       title: 'Women’s Atelier & Resort',
//       subtitle: 'Silk-touch satin drape, fluid tailored trousers & Italian wool blazers',
//       image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000',
//       path: '/women',
//       itemCount: '8 Timeless Pieces'
//     },
//     {
//       name: 'KIDS',
//       title: 'Junior Voyage Edition',
//       subtitle: 'Organic hypoallergenic fleece, durable twill & breathable daywear',
//       image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=1000',
//       path: '/kids',
//       itemCount: '8 Playful Essentials'
//     }
//   ];

//   return (
//     <div className="space-y-16 sm:space-y-24 pb-20 overflow-hidden bg-[#FDFCFB]">
      
//       {/* =========================================================================
//           SECTION 1 — SPLIT EDITORIAL HERO (DARK LUXURY / TRAVEL)
//          ========================================================================= */}
//    <section
//   id="home-hero-section"
//   className="w-full border-b border-[#0A0A0A]/10 bg-[#0A0A0A] text-white relative overflow-hidden"
// >
//   <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[82vh] lg:min-h-[88vh]">

//     {/* Main Hero Visual Side */}
//     <div className="lg:col-span-7 relative min-h-[480px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-[#0A0A0A]/10 overflow-hidden group">

//       <motion.img
//         src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
//         alt="VELORA New Season Editorial"
//         referrerPolicy="no-referrer"
//         initial={{ scale: 1.18 }}
//         animate={{ scale: 1 }}
//         transition={{
//           duration: 2.2,
//           ease: [0.22, 1, 0.36, 1],
//         }}
//         whileHover={{ scale: 1.04 }}
//         className="absolute inset-0 w-full h-full object-cover contrast-[1.05]"
//       />
      
//         {/* CINEMATIC DARK OVERLAY */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1.5 }}
//         className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
//       />

//       {/* HERO CONTENT */}
//       <motion.div
//         variants={fadeUp}
//         className="absolute bottom-10 sm:bottom-14 left-6 sm:left-12 right-6 max-w-lg text-white"
//       ></motion.div>
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
//          <motion.div
//           initial={{ opacity: 0, x: -25 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.8, duration: 0.8 }}
//           className="flex items-center space-x-2 text-[10px] tracking-[0.4em] mb-3 text-[#C4A484] uppercase font-medium"
//         >
//           <Compass className="w-3.5 h-3.5" />
//           <span>COLLECTION 2026 · VOYAGE ATELIER</span>
//         </motion.div>

//         <motion.h2
//           initial={{ opacity: 0, y: 35 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{
//             delay: 1,
//             duration: 1,
//             ease: [0.22, 1, 0.36, 1],
//           }}
//           className="text-4xl sm:text-5xl lg:text-6xl font-serif italic font-light leading-tight mb-6 text-white"
//         >
//           The New Season.
//         </motion.h2>

//         <motion.p
//           initial={{ opacity: 0, y: 25 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{
//             delay: 1.2,
//             duration: 0.8,
//           }}
//           className="text-xs sm:text-sm text-white/80 font-light mb-8 max-w-md leading-relaxed"
//         >
//           Quiet luxury meets architectural drape. Designed for globe-trotters
//           and refined everyday living.
//         </motion.p>

//       {/* Hero Text */}
//       <motion.div
//         initial={{ opacity: 0, y: 35 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{
//           duration: 0.9,
//           delay: 0.4,
//           ease: [0.22, 1, 0.36, 1]
//         }}
//         className="absolute bottom-10 sm:bottom-14 left-6 sm:left-12 right-6 max-w-lg text-white"
//       >

//         <div className="flex items-center space-x-2 text-[10px] tracking-[0.4em] mb-3 text-[#C4A484] uppercase font-medium">
//           <Compass className="w-3.5 h-3.5" />
//           <span>COLLECTION 2026 · VOYAGE ATELIER</span>
//         </div>
//   <motion.div
//           initial={{ opacity: 0, y: 25 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{
//             delay: 1.4,
//             duration: 0.8,
//           }}
//           className="flex flex-wrap gap-4"
//         ></motion.div>

//         <p className="text-xs sm:text-sm text-white/80 font-light mb-8 max-w-md leading-relaxed">
//           Quiet luxury meets architectural drape. Designed for globe-trotters and refined everyday living.
//         </p>

//         <motion.div
//           initial={{ opacity: 0, y: 25 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{
//             delay: 1.4,
//             duration: 0.8,
//           }}
//           className="flex flex-wrap gap-4"
//         >
//           <motion.button
//             whileHover={{
//               scale: 1.06,
//               y: -2,
//             }}
//             whileTap={{ scale: 0.97 }}
//             onClick={() => navigate("/women")}
//             className="px-7 py-3.5 bg-white text-[#0A0A0A] text-[10px] tracking-widest font-bold uppercase shadow-md"
//           >
//             SHOP WOMEN
//           </motion.button>

//           <motion.button
//             whileHover={{
//               scale: 1.06,
//               y: -2,
//             }}
//             whileTap={{ scale: 0.97 }}
//             onClick={() => navigate("/men")}
//             className="px-7 py-3.5 border border-white/80 text-white hover:bg-white hover:text-[#0A0A0A] text-[10px] tracking-widest font-bold uppercase backdrop-blur-sm"
//           >
//             SHOP MEN
//           </motion.button>
//         </motion.div>

//       </motion.div>
//     </div>

//     {/* RIGHT SIDE */}
//     <motion.div
//       initial={{ opacity: 0, x: 40 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{
//         delay: 0.4,
//         duration: 1,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       className="lg:col-span-5 flex flex-col bg-[#F9F8F6] text-[#0A0A0A] justify-between"
//     ></motion.div>

//     {/* Right Side Editorial Showcase */}
//     <div className="lg:col-span-5 flex flex-col bg-[#F9F8F6] text-[#0A0A0A] justify-between">

//       <div className="p-6 sm:p-10 flex-1 flex flex-col justify-between">

//         {/* Header */}
//         <div className="flex justify-between items-end mb-6 pb-3 border-b border-[#0A0A0A]/10">
//           <div>
//             <h3 className="text-[10px] tracking-[0.3em] font-bold opacity-40 uppercase">
//               New Arrivals
//             </h3>

//             <p className="text-xl font-serif italic text-[#0A0A0A] mt-0.5">
//               Modern Essentials
//             </p>
//           </div>

//           <button
//             onClick={() => navigate('/shop?filter=new')}
//             className="text-[10px] border-b border-[#0A0A0A] pb-0.5 tracking-widest uppercase font-bold hover:opacity-60 transition-opacity"
//           >
//             View All
//           </button>
//         </div>

//         {/* Products */}
//         <div className="grid grid-cols-2 gap-4 sm:gap-6">

//           {newArrivals.slice(0, 2).map((item) => (
//             <div
//               key={item.id}
//               onClick={() => navigate(`/product/${item.slug}`)}
//               className="space-y-2.5 cursor-pointer group"
//             >

//               <div className="aspect-[3/4] bg-white overflow-hidden relative border border-[#0A0A0A]/5">

//                 <motion.img
//                   src={item.images[0]}
//                   alt={item.name}
//                   referrerPolicy="no-referrer"
//                   whileHover={{ scale: 1.06 }}
//                   transition={{ duration: 0.5 }}
//                   className="w-full h-full object-cover"
//                 />

//                 <span className="absolute top-2.5 left-2.5 bg-white px-2 py-0.5 text-[8px] tracking-widest font-bold uppercase border border-[#0A0A0A]/10">
//                   New
//                 </span>

//               </div>

//               <div>
//                 <p className="text-[9px] opacity-50 uppercase tracking-widest">
//                   {item.category}
//                 </p>

//                 <p className="text-[12px] font-medium text-[#0A0A0A] line-clamp-1">
//                   {item.name}
//                 </p>

//                 <p className="text-[11px] font-serif italic mt-0.5 text-[#0A0A0A]">
//                   ${item.price}.00
//                 </p>
//               </div>

//             </div>
//           ))}

//         </div>

//         {/* Capsule */}
//         <div className="mt-8 bg-white p-5 border border-[#0A0A0A]/10 relative shadow-xs">

//           <div className="flex gap-4 items-center">

//             <div className="w-16 h-20 bg-[#F9F8F6] flex-shrink-0 overflow-hidden border border-[#0A0A0A]/10">
//               <img
//                 src="https://images.unsplash.com/photo-1554412930-e8476290076a?q=80&w=1887&auto=format&fit=crop"
//                 alt="Travel curation"
//                 referrerPolicy="no-referrer"
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             <div className="flex-1 min-w-0">

//               <div className="flex justify-between items-baseline">
//                 <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#0A0A0A]">
//                   TRAVEL ATELIER CAPSULE
//                 </p>

//                 <span className="text-[9px] text-[#C4A484] font-bold uppercase">
//                   SS26
//                 </span>
//               </div>

//               <p className="text-[10px] text-[#0A0A0A]/60 italic truncate mt-0.5">
//                 Linen Blend Overshirt & Silk Tailored Slacks
//               </p>

//               <div className="flex justify-between items-center mt-3 pt-2 border-t border-[#0A0A0A]/5">

//                 <p className="text-xs font-serif italic text-[#0A0A0A]">
//                   Curated 3-Piece Look
//                 </p>

//                 <button
//                   onClick={() => navigate('/shop')}
//                   className="bg-[#0A0A0A] hover:bg-black text-white px-3.5 py-1.5 text-[9px] tracking-widest uppercase font-bold transition-all"
//                 >
//                   EXPLORE
//                 </button>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* Bottom Status */}
//       <div className="h-16 sm:h-20 border-t border-[#0A0A0A]/10 bg-white px-6 sm:px-10 flex items-center justify-between">

//         <div className="flex items-center gap-3">

//           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />

//           <div>
//             <p className="text-[9px] uppercase tracking-widest font-bold text-[#0A0A0A]">
//               Global Atelier Online
//             </p>

//             <p className="text-[8px] text-[#0A0A0A]/50 tracking-wider">
//               Fast Courier Worldwide
//             </p>
//           </div>

//         </div>

//         <div className="flex gap-6 sm:gap-10">

//           <div className="text-center">
//             <p className="text-xs font-bold leading-none text-[#0A0A0A]">
//               $14.2k
//             </p>

//             <p className="text-[8px] uppercase tracking-widest opacity-50 mt-1">
//               Daily Orders
//             </p>
//           </div>

//           <div className="text-center">
//             <p className="text-xs font-bold leading-none text-[#0A0A0A]">
//               100%
//             </p>

//             <p className="text-[8px] uppercase tracking-widest opacity-50 mt-1">
//               Organic Fibers
//             </p>
//           </div>

//         </div>

//       </div>

//     </div>

//   </div>
// </section>

//       {/* =========================================================================
//           SECTION 2 — CATEGORY COLLECTIONS
//           MEN | WOMEN | KIDS with hover image zoom and dark luxury styling
//          ========================================================================= */}
//       <section id="home-categories-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#0A0A0A]/10">
//           <div>
//             <span className="text-[10px] tracking-[0.3em] font-bold opacity-40 uppercase">
//               Curated Departments
//             </span>
//             <h2 className="text-2xl sm:text-4xl font-serif italic text-[#0A0A0A] mt-1">
//               Shop by Collection
//             </h2>
//           </div>
//           <button
//             id="categories-explore-all-btn"
//             onClick={() => navigate('/shop')}
//             className="text-[10px] uppercase tracking-widest font-bold text-[#0A0A0A] hover:text-[#C4A484] flex items-center space-x-1.5 transition-colors mt-2 sm:mt-0 border-b border-black pb-0.5"
//           >
//             <span>Explore All Garments</span>
//             <ArrowRight className="w-3 h-3" />
//           </button>
//         </div>

//         {/* 3 Large Visual Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
//           {categories.map((cat) => (
//             <div
//               key={cat.name}
//               id={`category-card-${cat.name.toLowerCase()}`}
//               onClick={() => navigate(cat.path)}
//               className="group relative h-[480px] sm:h-[520px] overflow-hidden transition-all duration-500 cursor-pointer bg-[#0A0A0A] border border-[#0A0A0A]/10"
//             >
//               {/* Image with zoom and  on hover */}
//               <img
//                 src={cat.image}
//                 alt={cat.title}
//                 referrerPolicy="no-referrer"
//                 className="w-full h-full object-cover object-center  group-hover:-0 group-hover:scale-105 transition-all duration-700 ease-out"
//               />

//               {/* Scrim */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300" />

//               {/* Top Tag */}
//               <div className="absolute top-5 left-5 z-10">
//                 <span className="px-3 py-1 bg-white text-[#0A0A0A] text-[9px] font-bold tracking-[0.2em] uppercase border border-white/40">
//                   {cat.itemCount}
//                 </span>
//               </div>

//               {/* Bottom Details */}
//               <div className="absolute inset-x-6 bottom-6 z-10 text-white space-y-2">
//                 <span className="text-[10px] tracking-[0.3em] font-semibold text-[#C4A484] uppercase block">
//                   {cat.name}
//                 </span>
//                 <h3 className="font-serif italic text-2xl sm:text-3xl tracking-wide text-white">
//                   {cat.title}
//                 </h3>
//                 <p className="text-xs text-white/80 line-clamp-2 leading-relaxed font-light">
//                   {cat.subtitle}
//                 </p>

//                 <div className="pt-2 flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-white group-hover:text-[#C4A484] transition-colors">
//                   <span className="border-b border-white pb-0.5 group-hover:border-[#C4A484]">
//                     Explore Collection
//                   </span>
//                   <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* =========================================================================
//           SECTION 3 — NEW ARRIVALS (8 Products Grid)
//          ========================================================================= */}
//       <section id="home-new-arrivals-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#0A0A0A]/10">
//           <div>
//             <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C4A484]">
//               <Sparkles className="w-3 h-3" />
//               <span>JUST RELEASED · SS26</span>
//             </div>
//             <h2 className="font-serif italic text-2xl sm:text-4xl text-[#0A0A0A] mt-1">
//               New Arrivals
//             </h2>
//             <p className="text-xs text-[#0A0A0A]/50 mt-1 font-light tracking-wide">
//               Fresh silhouettes. Modern essentials crafted with architectural precision.
//             </p>
//           </div>

//           <button
//             id="new-arrivals-view-all-btn"
//             onClick={() => navigate('/shop?filter=new')}
//             className="text-[10px] uppercase tracking-widest font-bold text-[#0A0A0A] hover:text-[#C4A484] flex items-center space-x-1.5 transition-colors mt-2 sm:mt-0 border-b border-black pb-0.5"
//           >
//             <span>View All New Arrivals</span>
//             <ArrowRight className="w-3 h-3" />
//           </button>
//         </div>

//         {/* 8 Products Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
//           {newArrivals.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>

//       </section>

//       {/* =========================================================================
//           SECTION 4 — PROMOTIONAL BANNER (DARK LUXURY / TRAVEL)
//          ========================================================================= */}
//       <section id="home-promo-banner-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="relative overflow-hidden bg-[#0A0A0A] text-white shadow-xl min-h-[380px] flex items-center border border-[#0A0A0A]/20">
          
//           {/* Background image & overlay */}
//           <div className="absolute inset-0 z-0">
//             <img
//               src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1600"
//               alt="Promo Banner"
//               referrerPolicy="no-referrer"
//               className="w-full h-full object-cover object-center brightness-[0.35]  group-hover:-0 transition-all duration-700"
//             />
//             <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/85 to-transparent" />
//           </div>

//           {/* Banner Content */}
//           <div className="relative z-10 p-8 sm:p-14 max-w-xl space-y-4">
//             <span className="inline-block px-3 py-1 bg-[#C4A484] text-white text-[9px] font-bold uppercase tracking-[0.25em]">
//               LIMITED TIME OFFER
//             </span>

//             <h2 className="font-serif italic text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight">
//               UP TO 40% OFF
//             </h2>

//             <div className="space-y-1">
//               <h3 className="font-serif italic text-xl sm:text-2xl text-[#C4A484] font-light">
//                 Season Essentials
//               </h3>
//               <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
//                 Selected pieces crafted for transitional journeys. Elevate your wardrobe with fluid trenchcoats, tailored linen, and Italian wool.
//               </p>
//             </div>

//             <div className="pt-2">
//               <button
//                 id="promo-banner-shop-sale-btn"
//                 onClick={() => navigate('/shop?filter=sale')}
//                 className="py-3.5 px-8 bg-white text-[#0A0A0A] hover:bg-[#F9F8F6] text-[10px] uppercase tracking-[0.2em] font-bold transition-all shadow-lg hover:scale-105 flex items-center space-x-2"
//               >
//                 <span>SHOP SALE</span>
//                 <ArrowRight className="w-3.5 h-3.5" />
//               </button>
//             </div>
//           </div>

//         </div>
//       </section>

//       {/* =========================================================================
//           SECTION 5 — TRENDING COLLECTION (6 Products Grid)
//          ========================================================================= */}
//       <section id="home-trending-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#0A0A0A]/10">
//           <div>
//             <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C4A484]">
//               <TrendingUp className="w-3 h-3" />
//               <span>MOST COVETED</span>
//             </div>
//             <h2 className="font-serif italic text-2xl sm:text-4xl text-[#0A0A0A] mt-1">
//               Trending Now
//             </h2>
//             <p className="text-xs text-[#0A0A0A]/50 mt-1 font-light tracking-wide">
//               Selected by stylists and worn worldwide.
//             </p>
//           </div>

//           <button
//             id="trending-explore-all-btn"
//             onClick={() => navigate('/shop?filter=trending')}
//             className="text-[10px] uppercase tracking-widest font-bold text-[#0A0A0A] hover:text-[#C4A484] flex items-center space-x-1.5 transition-colors mt-2 sm:mt-0 border-b border-black pb-0.5"
//           >
//             <span>View All Trending</span>
//             <ArrowRight className="w-3 h-3" />
//           </button>
//         </div>

//         {/* 6 Trending Products Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
//           {trendingProducts.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>

//       </section>

//       {/* =========================================================================
//           SECTION 6 — EDITORIAL FASHION & TRAVEL SECTION
//          ========================================================================= */}
//       <section id="home-editorial-story-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F9F8F6] p-6 sm:p-12 border border-[#0A0A0A]/10">
          
//           {/* Asymmetrical Editorial Images Collage */}
//           <div className="lg:col-span-7 grid grid-cols-12 gap-4">
//             <div className="col-span-7 aspect-[3/4] overflow-hidden border border-[#0A0A0A]/10 shadow-xs">
//               <img
//                 src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
//                 alt="Editorial Look 1"
//                 referrerPolicy="no-referrer"
//                 className="w-full h-full object-cover object-center  hover:-0 hover:scale-105 transition-all duration-700"
//               />
//             </div>
//             <div className="col-span-5 flex flex-col justify-between space-y-4">
//               <div className="aspect-square overflow-hidden border border-[#0A0A0A]/10 shadow-xs">
//                 <img
//                   src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1000"
//                   alt="Editorial Look 2"
//                   referrerPolicy="no-referrer"
//                   className="w-full h-full object-cover object-center  hover:-0 hover:scale-105 transition-all duration-700"
//                 />
//               </div>
//               <div className="p-4 bg-white border border-[#0A0A0A]/10 shadow-xs">
//                 <span className="font-serif italic text-sm font-medium text-[#0A0A0A] block">
//                   "Architecture in fabric. The modern travel uniform."
//                 </span>
//                 <span className="text-[9px] text-[#0A0A0A]/50 uppercase tracking-[0.2em] mt-1.5 block">
//                   — Vogue Capsule Review 2026
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Storytelling Text */}
//           <div className="lg:col-span-5 space-y-6 lg:pl-6">
//             <div className="inline-block px-3 py-1 bg-[#0A0A0A] text-white text-[9px] font-bold uppercase tracking-[0.25em]">
//               THE VELORA PHILOSOPHY
//             </div>

//             <h2 className="font-serif italic text-3xl sm:text-5xl font-light text-[#0A0A0A] leading-tight">
//               Style Without Limits.
//             </h2>

//             <p className="text-xs sm:text-sm text-[#0A0A0A]/70 leading-relaxed font-light">
//               We believe luxury is not about excess, but intention. Every seam, collar ratio, and raw cotton fiber in our atelier is chosen to bring you comfort that looks regal and endures across time zones.
//             </p>

//             <div className="space-y-2.5 text-xs text-[#0A0A0A]">
//               <div className="flex items-center space-x-2 font-medium">
//                 <div className="w-1.5 h-1.5 bg-[#C4A484]" />
//                 <span className="text-[11px] tracking-wide">Zero-synthetic microfibers in core collections</span>
//               </div>
//               <div className="flex items-center space-x-2 font-medium">
//                 <div className="w-1.5 h-1.5 bg-[#C4A484]" />
//                 <span className="text-[11px] tracking-wide">Master-tailored silhouettes tested for travel ease</span>
//               </div>
//               <div className="flex items-center space-x-2 font-medium">
//                 <div className="w-1.5 h-1.5 bg-[#C4A484]" />
//                 <span className="text-[11px] tracking-wide">Fair-wage European and Japanese artisanal weaving mills</span>
//               </div>
//             </div>

//             <div className="pt-2">
//               <button
//                 id="editorial-explore-collection-btn"
//                 onClick={() => navigate('/shop')}
//                 className="py-3.5 px-8 bg-[#0A0A0A] text-white hover:bg-black text-[10px] uppercase tracking-[0.2em] font-bold transition-all shadow-md hover:scale-105 flex items-center space-x-2"
//               >
//                 <span>EXPLORE COLLECTION</span>
//                 <ArrowRight className="w-3.5 h-3.5" />
//               </button>
//             </div>
//           </div>

//         </div>
//       </section>

//       {/* =========================================================================
//           SECTION 7 — CUSTOMER REVIEWS
//          ========================================================================= */}
//       <section id="home-customer-reviews-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
//           <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C4A484]">
//             Verified Atelier Experiences
//           </span>
//           <h2 className="font-serif italic text-3xl sm:text-4xl text-[#0A0A0A]">
//             Words From Our Circle
//           </h2>
//           <p className="text-xs text-[#0A0A0A]/50 font-light">
//             Over 2,400+ discerning travelers trust VELORA for everyday luxury.
//           </p>
//         </div>

//         {/* 4 Reviews Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {HOME_REVIEWS.map((rev) => (
//             <div
//               key={rev.id}
//               id={`review-card-${rev.id}`}
//               className="p-6 bg-white border border-[#0A0A0A]/10 shadow-xs hover:border-[#0A0A0A]/30 transition-all flex flex-col justify-between space-y-4"
//             >
//               <div className="space-y-3">
//                 {/* Rating stars */}
//                 <div className="flex text-[#C4A484]">
//                   {[...Array(rev.rating)].map((_, i) => (
//                     <Star key={i} className="w-3.5 h-3.5 fill-current" />
//                   ))}
//                 </div>

//                 {/* Review comment */}
//                 <p className="text-xs text-[#0A0A0A]/80 leading-relaxed italic font-light">
//                   "{rev.review}"
//                 </p>
//               </div>

//               <div className="pt-4 border-t border-[#0A0A0A]/5 flex items-center space-x-3">
//                 <img
//                   src={rev.avatar}
//                   alt={rev.customerName}
//                   referrerPolicy="no-referrer"
//                   className="w-9 h-9 rounded-full object-cover "
//                 />
//                 <div>
//                   <h4 className="text-xs font-bold text-[#0A0A0A]">{rev.customerName}</h4>
//                   <p className="text-[9px] text-[#0A0A0A]/40 uppercase tracking-wider">{rev.city}</p>
//                   <p className="text-[9px] text-[#C4A484] font-medium truncate max-w-[140px]">
//                     {rev.productName}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//       </section>

//     </div>
//   );
// };

// export default HomePage;




import React from 'react';
import {
  ArrowRight,
  Sparkles,
  Star,
  ArrowUpRight,
  TrendingUp,
  Compass,
} from 'lucide-react';
import { useShop } from '../context/shopcontext';
import { ProductCard } from './productcard';
import { HOME_REVIEWS } from '../data/initialdata';
import { motion } from 'motion/react';
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:7000/api';

const BACKEND_URL = API_URL.replace(/\/api\/?$/, '');

export const HomePage: React.FC = () => {
  const { products, navigate } = useShop();

  // Filter products for homepage sections
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 8);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 6);

  const categories = [
    {
      name: 'MEN',
      title: 'Men’s Travel & Capsule',
      subtitle:
        'Sharp tailoring, Japanese selvedge denim & heavyweight organic cottons',
      image:
        'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=1000',
      path: '/men',
      itemCount: '8 Essential Styles',
    },
    {
      name: 'WOMEN',
      title: 'Women’s Atelier & Resort',
      subtitle:
        'Silk-touch satin drape, fluid tailored trousers & Italian wool blazers',
      image:
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000',
      path: '/women',
      itemCount: '8 Timeless Pieces',
    },
    {
      name: 'KIDS',
      title: 'Junior Voyage Edition',
      subtitle:
        'Organic hypoallergenic fleece, durable twill & breathable daywear',
      image:
        'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=1000',
      path: '/kids',
      itemCount: '8 Playful Essentials',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-hidden bg-[#FDFCFB]">

      {/* ================================================================
          SECTION 1 — HERO
         ================================================================ */}
      <section
        id="home-hero-section"
        className="w-full border-b border-[#0A0A0A]/10 bg-[#0A0A0A] text-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[82vh] lg:min-h-[88vh]">

          {/* ============================================================
              LEFT HERO IMAGE
             ============================================================ */}
          <div className="lg:col-span-7 relative min-h-[480px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-[#0A0A0A]/10 overflow-hidden group">

            {/* Cinematic Image Reveal */}
            <motion.img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
              alt="VELORA New Season Editorial"
              referrerPolicy="no-referrer"
              initial={{
                scale: 1.18,
                opacity: 0.7,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 2.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                scale: 1.04,
              }}
              className="absolute inset-0 w-full h-full object-cover contrast-[1.05]"
            />

            {/* Cinematic Dark Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1.8,
                delay: 0.2,
              }}
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
            />

            {/* ============================================================
                HERO CONTENT
               ============================================================ */}
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute bottom-10 sm:bottom-14 left-6 sm:left-12 right-6 max-w-lg text-white"
            >

              {/* Collection Label */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: -30,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-center space-x-2 text-[10px] tracking-[0.4em] mb-3 text-[#C4A484] uppercase font-medium"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>COLLECTION 2026 · VOYAGE ATELIER</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h2
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1,
                  delay: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-4xl sm:text-5xl lg:text-6xl font-serif italic font-light leading-tight mb-6 text-white"
              >
                The New Season.
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 1.2,
                }}
                className="text-xs sm:text-sm text-white/80 font-light mb-8 max-w-md leading-relaxed"
              >
                Quiet luxury meets architectural drape. Designed for
                globe-trotters and refined everyday living.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 1.4,
                }}
                className="flex flex-wrap gap-4"
              >

                <motion.button
                  whileHover={{
                    scale: 1.06,
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={() => navigate('/women')}
                  className="px-7 py-3.5 bg-white text-[#0A0A0A] hover:bg-[#F9F8F6] text-[10px] tracking-widest font-bold uppercase transition-all shadow-md"
                >
                  SHOP WOMEN
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.06,
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={() => navigate('/men')}
                  className="px-7 py-3.5 border border-white/80 text-white hover:bg-white hover:text-[#0A0A0A] text-[10px] tracking-widest font-bold uppercase backdrop-blur-sm transition-all shadow-md"
                >
                  SHOP MEN
                </motion.button>

              </motion.div>

            </motion.div>
          </div>

          {/* ============================================================
              RIGHT SIDE EDITORIAL
             ============================================================ */}
          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1.1,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-5 flex flex-col bg-[#F9F8F6] text-[#0A0A0A] justify-between"
          >

            <div className="p-6 sm:p-10 flex-1 flex flex-col justify-between">

              {/* Header */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: -20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.9,
                  duration: 0.7,
                }}
                className="flex justify-between items-end mb-6 pb-3 border-b border-[#0A0A0A]/10"
              >
                <div>
                  <h3 className="text-[10px] tracking-[0.3em] font-bold opacity-40 uppercase">
                    New Arrivals
                  </h3>

                  <p className="text-xl font-serif italic text-[#0A0A0A] mt-0.5">
                    Modern Essentials
                  </p>
                </div>

                <button
                  onClick={() => navigate('/shop?filter=new')}
                  className="text-[10px] border-b border-[#0A0A0A] pb-0.5 tracking-widest uppercase font-bold hover:opacity-60 transition-opacity"
                >
                  View All
                </button>
              </motion.div>

              {/* Products */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">

                {newArrivals.slice(0, 2).map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{
                      opacity: 0,
                      y: 35,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 1 + index * 0.15,
                      duration: 0.7,
                    }}
                    onClick={() =>
                      navigate(`/product/${item.slug}`)
                    }
                    className="space-y-2.5 cursor-pointer group"
                  >

                    <div className="aspect-[3/4] bg-white overflow-hidden relative border border-[#0A0A0A]/5">

                      <motion.img
                        src={`${BACKEND_URL}/${item.images[0]?.replace(/^\/+/, '')}`}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        whileHover={{
                          scale: 1.06,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: 'easeOut',
                        }}
                        className="w-full h-full object-cover"
                      />

                      <span className="absolute top-2.5 left-2.5 bg-white px-2 py-0.5 text-[8px] tracking-widest font-bold uppercase border border-[#0A0A0A]/10">
                        New
                      </span>
                    </div>

                    <div>
                      <p className="text-[9px] opacity-50 uppercase tracking-widest">
                        {item.category}
                      </p>

                      <p className="text-[12px] font-medium text-[#0A0A0A] line-clamp-1">
                        {item.name}
                      </p>

                      <p className="text-[11px] font-serif italic mt-0.5 text-[#0A0A0A]">
                        ${item.price}.00
                      </p>
                    </div>

                  </motion.div>
                ))}

              </div>

              {/* Capsule */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 1.35,
                  duration: 0.8,
                }}
                className="mt-8 bg-white p-5 border border-[#0A0A0A]/10 relative shadow-xs"
              >

                <div className="flex gap-4 items-center">

                  <div className="w-16 h-20 bg-[#F9F8F6] flex-shrink-0 overflow-hidden border border-[#0A0A0A]/10">
                    <motion.img
                      src="/travel.png"
                      alt="Travel curation"
                      referrerPolicy="no-referrer"
                      whileHover={{
                        scale: 1.08,
                      }}
                      transition={{
                        duration: 0.5,
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">

                    <div className="flex justify-between items-baseline">
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#0A0A0A]">
                        TRAVEL ATELIER CAPSULE
                      </p>

                      <span className="text-[9px] text-[#C4A484] font-bold uppercase">
                        SS26
                      </span>
                    </div>

                    <p className="text-[10px] text-[#0A0A0A]/60 italic truncate mt-0.5">
                      Linen Blend Overshirt & Silk Tailored Slacks
                    </p>

                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-[#0A0A0A]/5">

                      <p className="text-xs font-serif italic text-[#0A0A0A]">
                        Curated 3-Piece Look
                      </p>

                      <motion.button
                        whileHover={{
                          scale: 1.05,
                        }}
                        whileTap={{
                          scale: 0.97,
                        }}
                        onClick={() => navigate('/shop')}
                        className="bg-[#0A0A0A] hover:bg-black text-white px-3.5 py-1.5 text-[9px] tracking-widest uppercase font-bold transition-all"
                      >
                        EXPLORE
                      </motion.button>

                    </div>
                  </div>

                </div>
              </motion.div>

            </div>

            {/* Bottom Status */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1.5,
                duration: 0.7,
              }}
              className="h-16 sm:h-20 border-t border-[#0A0A0A]/10 bg-white px-6 sm:px-10 flex items-center justify-between"
            >

              <div className="flex items-center gap-3">

                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />

                <div>
                  <p className="text-[9px] uppercase tracking-widest font-bold text-[#0A0A0A]">
                    Global Atelier Online
                  </p>

                  <p className="text-[8px] text-[#0A0A0A]/50 tracking-wider">
                    Fast Courier Worldwide
                  </p>
                </div>

              </div>

              <div className="flex gap-6 sm:gap-10">

                <div className="text-center">
                  <p className="text-xs font-bold leading-none text-[#0A0A0A]">
                    $14.2k
                  </p>

                  <p className="text-[8px] uppercase tracking-widest opacity-50 mt-1">
                    Daily Orders
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-xs font-bold leading-none text-[#0A0A0A]">
                    100%
                  </p>

                  <p className="text-[8px] uppercase tracking-widest opacity-50 mt-1">
                    Organic Fibers
                  </p>
                </div>

              </div>

            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ================================================================
          SECTION 2 — CATEGORY COLLECTIONS
         ================================================================ */}
      <motion.section
        id="home-categories-section"
        initial={{
          opacity: 0,
          y: 60,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >

        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#0A0A0A]/10">

          <div>
            <span className="text-[10px] tracking-[0.3em] font-bold opacity-40 uppercase">
              Curated Departments
            </span>

            <h2 className="text-2xl sm:text-4xl font-serif italic text-[#0A0A0A] mt-1">
              Shop by Collection
            </h2>
          </div>

          <button
            id="categories-explore-all-btn"
            onClick={() => navigate('/shop')}
            className="text-[10px] uppercase tracking-widest font-bold text-[#0A0A0A] hover:text-[#C4A484] flex items-center space-x-1.5 transition-colors mt-2 sm:mt-0 border-b border-black pb-0.5"
          >
            <span>Explore All Garments</span>
            <ArrowRight className="w-3 h-3" />
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">

          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              id={`category-card-${cat.name.toLowerCase()}`}
              initial={{
                opacity: 0,
                y: 60,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => navigate(cat.path)}
              className="group relative h-[480px] sm:h-[520px] overflow-hidden transition-all duration-500 cursor-pointer bg-[#0A0A0A] border border-[#0A0A0A]/10"
            >

              <motion.img
                src={cat.image}
                alt={cat.title}
                referrerPolicy="no-referrer"
                whileHover={{
                  scale: 1.08,
                }}
                transition={{
                  duration: 0.8,
                  ease: 'easeOut',
                }}
                className="w-full h-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300" />

              <div className="absolute top-5 left-5 z-10">
                <span className="px-3 py-1 bg-white text-[#0A0A0A] text-[9px] font-bold tracking-[0.2em] uppercase border border-white/40">
                  {cat.itemCount}
                </span>
              </div>

              <div className="absolute inset-x-6 bottom-6 z-10 text-white space-y-2">

                <span className="text-[10px] tracking-[0.3em] font-semibold text-[#C4A484] uppercase block">
                  {cat.name}
                </span>

                <h3 className="font-serif italic text-2xl sm:text-3xl tracking-wide text-white">
                  {cat.title}
                </h3>

                <p className="text-xs text-white/80 line-clamp-2 leading-relaxed font-light">
                  {cat.subtitle}
                </p>

                <div className="pt-2 flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-white group-hover:text-[#C4A484] transition-colors">

                  <span className="border-b border-white pb-0.5 group-hover:border-[#C4A484]">
                    Explore Collection
                  </span>

                  <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />

                </div>

              </div>

            </motion.div>
          ))}

        </div>
      </motion.section>

      {/* ================================================================
          SECTION 3 — NEW ARRIVALS
         ================================================================ */}
      <motion.section
        id="home-new-arrivals-section"
        initial={{
          opacity: 0,
          y: 60,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 0.9,
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >

        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#0A0A0A]/10">

          <div>

            <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C4A484]">
              <Sparkles className="w-3 h-3" />
              <span>JUST RELEASED · SS26</span>
            </div>

            <h2 className="font-serif italic text-2xl sm:text-4xl text-[#0A0A0A] mt-1">
              New Arrivals
            </h2>

            <p className="text-xs text-[#0A0A0A]/50 mt-1 font-light tracking-wide">
              Fresh silhouettes. Modern essentials crafted with architectural precision.
            </p>

          </div>

          <button
            id="new-arrivals-view-all-btn"
            onClick={() => navigate('/shop?filter=new')}
            className="text-[10px] uppercase tracking-widest font-bold text-[#0A0A0A] hover:text-[#C4A484] flex items-center space-x-1.5 transition-colors mt-2 sm:mt-0 border-b border-black pb-0.5"
          >
            <span>View All New Arrivals</span>
            <ArrowRight className="w-3 h-3" />
          </button>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.1,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.06,
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

      </motion.section>

      {/* ================================================================
          SECTION 4 — PROMOTIONAL BANNER
         ================================================================ */}
      <motion.section
        id="home-promo-banner-section"
        initial={{
          opacity: 0,
          scale: 0.96,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >

        <div className="relative overflow-hidden bg-[#0A0A0A] text-white shadow-xl min-h-[380px] flex items-center border border-[#0A0A0A]/20">

          <div className="absolute inset-0 z-0">

            <motion.img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1600"
              alt="Promo Banner"
              referrerPolicy="no-referrer"
              initial={{
                scale: 1.08,
              }}
              whileInView={{
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1.5,
              }}
              className="w-full h-full object-cover object-center brightness-[0.35]"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/85 to-transparent" />

          </div>

          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 p-8 sm:p-14 max-w-xl space-y-4"
          >

            <span className="inline-block px-3 py-1 bg-[#C4A484] text-white text-[9px] font-bold uppercase tracking-[0.25em]">
              LIMITED TIME OFFER
            </span>

            <h2 className="font-serif italic text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight">
              UP TO 40% OFF
            </h2>

            <div className="space-y-1">

              <h3 className="font-serif italic text-xl sm:text-2xl text-[#C4A484] font-light">
                Season Essentials
              </h3>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                Selected pieces crafted for transitional journeys. Elevate
                your wardrobe with fluid trenchcoats, tailored linen, and
                Italian wool.
              </p>

            </div>

            <div className="pt-2">

              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                id="promo-banner-shop-sale-btn"
                onClick={() => navigate('/shop?filter=sale')}
                className="py-3.5 px-8 bg-white text-[#0A0A0A] hover:bg-[#F9F8F6] text-[10px] uppercase tracking-[0.2em] font-bold transition-all shadow-lg flex items-center space-x-2"
              >
                <span>SHOP SALE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>

            </div>

          </motion.div>

        </div>
      </motion.section>

      {/* ================================================================
          SECTION 5 — TRENDING
         ================================================================ */}
      <motion.section
        id="home-trending-section"
        initial={{
          opacity: 0,
          y: 60,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 0.9,
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >

        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#0A0A0A]/10">

          <div>

            <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C4A484]">
              <TrendingUp className="w-3 h-3" />
              <span>MOST COVETED</span>
            </div>

            <h2 className="font-serif italic text-2xl sm:text-4xl text-[#0A0A0A] mt-1">
              Trending Now
            </h2>

            <p className="text-xs text-[#0A0A0A]/50 mt-1 font-light tracking-wide">
              Selected by stylists and worn worldwide.
            </p>

          </div>

          <button
            id="trending-explore-all-btn"
            onClick={() => navigate('/shop?filter=trending')}
            className="text-[10px] uppercase tracking-widest font-bold text-[#0A0A0A] hover:text-[#C4A484] flex items-center space-x-1.5 transition-colors mt-2 sm:mt-0 border-b border-black pb-0.5"
          >
            <span>View All Trending</span>
            <ArrowRight className="w-3 h-3" />
          </button>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">

          {trendingProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.1,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}

        </div>

      </motion.section>

      {/* ================================================================
          SECTION 6 — EDITORIAL
         ================================================================ */}
      <motion.section
        id="home-editorial-story-section"
        initial={{
          opacity: 0,
          y: 60,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 1,
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F9F8F6] p-6 sm:p-12 border border-[#0A0A0A]/10">

          {/* Images */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4">

            <motion.div
              initial={{
                opacity: 0,
                x: -40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.9,
              }}
              className="col-span-7 aspect-[3/4] overflow-hidden border border-[#0A0A0A]/10 shadow-xs"
            >

              <motion.img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
                alt="Editorial Look 1"
                referrerPolicy="no-referrer"
                whileHover={{
                  scale: 1.06,
                }}
                transition={{
                  duration: 0.7,
                }}
                className="w-full h-full object-cover object-center"
              />

            </motion.div>

            <div className="col-span-5 flex flex-col justify-between space-y-4">

              <motion.div
                initial={{
                  opacity: 0,
                  x: 40,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.15,
                }}
                className="aspect-square overflow-hidden border border-[#0A0A0A]/10 shadow-xs"
              >

                <motion.img
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1000"
                  alt="Editorial Look 2"
                  referrerPolicy="no-referrer"
                  whileHover={{
                    scale: 1.06,
                  }}
                  transition={{
                    duration: 0.7,
                  }}
                  className="w-full h-full object-cover object-center"
                />

              </motion.div>

              <div className="p-4 bg-white border border-[#0A0A0A]/10 shadow-xs">

                <span className="font-serif italic text-sm font-medium text-[#0A0A0A] block">
                  "Architecture in fabric. The modern travel uniform."
                </span>

                <span className="text-[9px] text-[#0A0A0A]/50 uppercase tracking-[0.2em] mt-1.5 block">
                  — Vogue Capsule Review 2026
                </span>

              </div>

            </div>
          </div>

          {/* Story */}
          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-5 space-y-6 lg:pl-6"
          >

            <div className="inline-block px-3 py-1 bg-[#0A0A0A] text-white text-[9px] font-bold uppercase tracking-[0.25em]">
              THE VELORA PHILOSOPHY
            </div>

            <h2 className="font-serif italic text-3xl sm:text-5xl font-light text-[#0A0A0A] leading-tight">
              Style Without Limits.
            </h2>

            <p className="text-xs sm:text-sm text-[#0A0A0A]/70 leading-relaxed font-light">
              We believe luxury is not about excess, but intention. Every
              seam, collar ratio, and raw cotton fiber in our atelier is
              chosen to bring you comfort that looks regal and endures across
              time zones.
            </p>

            <div className="space-y-2.5 text-xs text-[#0A0A0A]">

              <div className="flex items-center space-x-2 font-medium">
                <div className="w-1.5 h-1.5 bg-[#C4A484]" />
                <span className="text-[11px] tracking-wide">
                  Zero-synthetic microfibers in core collections
                </span>
              </div>

              <div className="flex items-center space-x-2 font-medium">
                <div className="w-1.5 h-1.5 bg-[#C4A484]" />
                <span className="text-[11px] tracking-wide">
                  Master-tailored silhouettes tested for travel ease
                </span>
              </div>

              <div className="flex items-center space-x-2 font-medium">
                <div className="w-1.5 h-1.5 bg-[#C4A484]" />
                <span className="text-[11px] tracking-wide">
                  Fair-wage European and Japanese artisanal weaving mills
                </span>
              </div>

            </div>

            <div className="pt-2">

              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                id="editorial-explore-collection-btn"
                onClick={() => navigate('/shop')}
                className="py-3.5 px-8 bg-[#0A0A0A] text-white hover:bg-black text-[10px] uppercase tracking-[0.2em] font-bold transition-all shadow-md flex items-center space-x-2"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>

            </div>

          </motion.div>

        </div>
      </motion.section>

      {/* ================================================================
          SECTION 7 — CUSTOMER REVIEWS
         ================================================================ */}
      <motion.section
        id="home-customer-reviews-section"
        initial={{
          opacity: 0,
          y: 60,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 0.9,
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >

        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">

          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C4A484]">
            Verified Atelier Experiences
          </span>

          <h2 className="font-serif italic text-3xl sm:text-4xl text-[#0A0A0A]">
            Words From Our Circle
          </h2>

          <p className="text-xs text-[#0A0A0A]/50 font-light">
            Over 2,400+ discerning travelers trust VELORA for everyday luxury.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {HOME_REVIEWS.map((rev, index) => (
            <motion.div
              key={rev.id}
              id={`review-card-${rev.id}`}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.65,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -6,
              }}
              className="p-6 bg-white border border-[#0A0A0A]/10 shadow-xs hover:border-[#0A0A0A]/30 transition-all flex flex-col justify-between space-y-4"
            >

              <div className="space-y-3">

                {/* Rating */}
                <div className="flex text-[#C4A484]">

                  {[...Array(rev.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        opacity: 0,
                        scale: 0.5,
                      }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay: index * 0.1 + i * 0.05,
                      }}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </motion.div>
                  ))}

                </div>

                {/* Review */}
                <p className="text-xs text-[#0A0A0A]/80 leading-relaxed italic font-light">
                  "{rev.review}"
                </p>

              </div>

              <div className="pt-4 border-t border-[#0A0A0A]/5 flex items-center space-x-3">

                <img
                  src={rev.avatar}
                  alt={rev.customerName}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover"
                />

                <div>

                  <h4 className="text-xs font-bold text-[#0A0A0A]">
                    {rev.customerName}
                  </h4>

                  <p className="text-[9px] text-[#0A0A0A]/40 uppercase tracking-wider">
                    {rev.city}
                  </p>

                  <p className="text-[9px] text-[#C4A484] font-medium truncate max-w-[140px]">
                    {rev.productName}
                  </p>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </motion.section>

    </div>
  );
};

export default HomePage;