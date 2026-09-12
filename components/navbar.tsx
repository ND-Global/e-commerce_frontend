'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  User as UserIcon,
  Menu,
  X,
  ShieldCheck
} from 'lucide-react';
import { useShop } from '../context/shopcontext';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const {
    currentPath,
    navigate,
    totalCartItems,
    wishlist,
    currentUser,
    setSearchModalOpen,
    setCartDrawerOpen,
    mobileMenuOpen,
    setMobileMenuOpen
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'NEW ARRIVALS', path: '/shop?filter=new' },
    { name: 'MEN', path: '/men' },
    { name: 'WOMEN', path: '/women' },
    { name: 'KIDS', path: '/kids' },
    { name: 'SALE', path: '/shop?filter=sale', highlight: true },
  ];

  const isActive = (path: string) => {
    if (path.includes('?')) {
      return currentPath === path.split('?')[0];
    }

    return currentPath === path;
  };

  return (
    <>
      {/* =========================================================
          MAIN NAVBAR
         ========================================================= */}
      <motion.header
        id="main-navbar"
        initial={{ opacity: 0, y: -25 }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={`sticky top-0 z-40 w-full transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FDFCFB]/95 backdrop-blur-xl shadow-xs border-b border-[#0A0A0A]/10 py-3.5'
            : 'bg-[#FDFCFB] border-b border-[#0A0A0A]/10 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between relative">

          {/* =====================================================
              MOBILE MENU + SEARCH
             ===================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.6
            }}
            className="flex items-center lg:hidden"
          >
            {/* Mobile Menu */}
            <motion.button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              whileTap={{ scale: 0.88 }}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.2 }}
              className="p-2 -ml-2 text-[#0A0A0A]"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Search */}
            <motion.button
              id="mobile-search-btn"
              onClick={() => setSearchModalOpen(true)}
              aria-label="Search catalog"
              whileTap={{ scale: 0.88 }}
              whileHover={{ scale: 1.08 }}
              className="p-2 ml-1 text-[#0A0A0A]"
            >
              <Search className="w-4 h-4" />
            </motion.button>
          </motion.div>


          {/* =====================================================
              DESKTOP LEFT NAVIGATION
             ===================================================== */}
          <nav className="hidden lg:flex items-center space-x-7">

            {navLinks.map((link, index) => {
              const active = isActive(link.path);

              return (
                <motion.button
                  key={link.name}
                  id={`nav-link-${link.name
                    .toLowerCase()
                    .replace(/\s+/g, '-')}`}
                  onClick={() => navigate(link.path)}
                  initial={{
                    opacity: 0,
                    y: -10
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    delay: 0.35 + index * 0.08,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{
                    y: -1
                  }}
                  className={`text-[10px] tracking-[0.2em] font-medium relative py-1 uppercase ${
                    link.highlight
                      ? 'text-[#C4A484] font-bold'
                      : active
                        ? 'text-[#0A0A0A] font-bold'
                        : 'text-[#0A0A0A]/70'
                  }`}
                >
                  {link.name}

                  {/* Animated underline */}
                  <motion.span
                    className={`absolute left-0 bottom-0 h-[1.5px] bg-[#0A0A0A] ${
                      link.highlight ? 'bg-[#C4A484]' : ''
                    }`}
                    initial={{ width: active ? '100%' : '0%' }}
                    whileHover={{ width: '100%' }}
                    animate={{
                      width: active ? '100%' : '0%'
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  />
                </motion.button>
              );
            })}

          </nav>


          {/* =====================================================
              CENTER LOGO
             ===================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
              y: -8
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            transition={{
              delay: 0.15,
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="flex items-center justify-center lg:absolute lg:left-1/2 lg:-translate-x-1/2"
          >
            <motion.button
              id="brand-logo-btn"
              onClick={() => navigate('/')}
              whileHover={{
                scale: 1.03
              }}
              whileTap={{
                scale: 0.97
              }}
              transition={{
                duration: 0.3
              }}
              className="group flex flex-col items-center text-center cursor-pointer"
            >
              <motion.h1
                initial={{ letterSpacing: '0.15em' }}
                animate={{ letterSpacing: '0.3em' }}
                transition={{
                  delay: 0.3,
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1]
                }}
                 className="font-serif text-2xl sm:text-3xl tracking-[0.3em] font-light italic text-[#0A0A0A] uppercase transition-transform duration-300 group-hover:scale-[1.02]">
  AUREVÉ
              </motion.h1>

              <motion.span
                initial={{
                  opacity: 0,
                  y: 4
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.8,
                  duration: 0.5
                }}
                className="hidden sm:block text-[8px] tracking-[0.4em] text-[#0A0A0A]/40 uppercase -mt-0.5 font-sans font-medium"
              >
                Atelier & Travel
              </motion.span>
            </motion.button>
          </motion.div>


          {/* =====================================================
              RIGHT ACTIONS
             ===================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: 0.4,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="flex items-center space-x-2 sm:space-x-4"
          >

            {/* Desktop Search */}
            <motion.button
              id="navbar-search-btn"
              onClick={() => setSearchModalOpen(true)}
              aria-label="Open search"
              whileHover={{
                y: -1
              }}
              whileTap={{
                scale: 0.95
              }}
              className="hidden lg:flex items-center space-x-2 text-[10px] tracking-[0.2em] text-[#0A0A0A]/70 px-2.5 py-1.5"
            >
              <motion.span
                whileHover={{
                  rotate: 8
                }}
              >
                <Search className="w-4 h-4" />
              </motion.span>

              <span className="uppercase">SEARCH</span>
            </motion.button>


            {/* Admin */}
            <motion.button
              id="navbar-admin-link-btn"
              onClick={() => navigate('/admin')}
              aria-label="Open Admin Dashboard demo"
              whileHover={{
                y: -2,
                scale: 1.02
              }}
              whileTap={{
                scale: 0.97
              }}
              className="hidden md:flex items-center space-x-1.5 text-[10px] text-[#0A0A0A]/70 border border-[#0A0A0A]/20 px-2.5 py-1 tracking-[0.2em] uppercase hover:bg-[#F9F8F6] transition-colors font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>Admin</span>
            </motion.button>


            {/* =================================================
                WISHLIST
               ================================================= */}
            <motion.button
              id="navbar-wishlist-btn"
              onClick={() => navigate('/wishlist')}
              aria-label="View wishlist"
              whileHover={{
                scale: 1.08,
                y: -1
              }}
              whileTap={{
                scale: 0.88
              }}
              className="relative p-2 text-[#0A0A0A]"
            >
              <motion.div
                whileHover={{
                  rotate: -8
                }}
                transition={{
                  duration: 0.2
                }}
              >
                <Heart className="w-4 h-4" />
              </motion.div>

              <AnimatePresence>
                {wishlist.length > 0 && (
                  <motion.span
                    id="wishlist-badge-count"
                    initial={{
                      opacity: 0,
                      scale: 0
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 25
                    }}
                    className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-[#0A0A0A] text-[#FDFCFB] text-[8px] font-bold flex items-center justify-center rounded-full"
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>


            {/* =================================================
                USER
               ================================================= */}
            <motion.button
              id="navbar-account-btn"
              onClick={() =>
                navigate(currentUser ? '/account' : '/login')
              }
              aria-label="View user profile or sign in"
              whileHover={{
                scale: 1.08,
                y: -1
              }}
              whileTap={{
                scale: 0.88
              }}
              className="p-2 text-[#0A0A0A] flex items-center"
            >
              <motion.div
                whileHover={{
                  rotate: 8
                }}
                transition={{
                  duration: 0.2
                }}
              >
                <UserIcon className="w-4 h-4" />
              </motion.div>

              {currentUser && (
                <motion.span
                  initial={{
                    opacity: 0,
                    width: 0
                  }}
                  animate={{
                    opacity: 1,
                    width: 'auto'
                  }}
                  transition={{
                    duration: 0.4
                  }}
                  className="hidden xl:inline-block ml-1.5 text-[10px] tracking-wider uppercase font-medium text-[#0A0A0A] max-w-[80px] truncate"
                >
                  {currentUser.name.split(' ')[0]}
                </motion.span>
              )}
            </motion.button>


            {/* =================================================
                SHOPPING BAG
               ================================================= */}
            <motion.button
              id="navbar-cart-btn"
              onClick={() => setCartDrawerOpen(true)}
              aria-label="Open shopping bag"
              whileHover={{
                scale: 1.08,
                y: -1
              }}
              whileTap={{
                scale: 0.88
              }}
              className="relative p-2 text-[#0A0A0A]"
            >
              <motion.div
                whileHover={{
                  rotate: -6
                }}
                transition={{
                  duration: 0.2
                }}
              >
                <ShoppingBag className="w-4 h-4" />
              </motion.div>

              <AnimatePresence>
                {mounted && totalCartItems > 0 && (
                  <motion.span
                    id="cart-badge-count"
                    initial={{
                      opacity: 0,
                      scale: 0
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 25
                    }}
                    className="absolute top-0.5 right-0.5 min-w-3.5 h-3.5 px-0.5 bg-[#C4A484] text-white text-[8px] font-bold flex items-center justify-center rounded-full"
                  >
                    {totalCartItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

          </motion.div>

        </div>
      </motion.header>


      {/* =========================================================
          MOBILE MENU
         ========================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0
            }}
            animate={{
              opacity: 1,
              height: 'auto'
            }}
            exit={{
              opacity: 0,
              height: 0
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="lg:hidden sticky top-[65px] z-30 overflow-hidden bg-[#FDFCFB] border-b border-[#0A0A0A]/10 shadow-sm"
          >
            <div className="px-6 py-6 space-y-1">

              {navLinks.map((link, index) => {
                const active = isActive(link.path);

                return (
                  <motion.button
                    key={link.name}
                    onClick={() => {
                      navigate(link.path);
                      setMobileMenuOpen(false);
                    }}
                    initial={{
                      opacity: 0,
                      x: -20
                    }}
                    animate={{
                      opacity: 1,
                      x: 0
                    }}
                    transition={{
                      delay: index * 0.07,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    whileTap={{
                      scale: 0.97
                    }}
                    className={`w-full flex items-center justify-between py-4 border-b border-[#0A0A0A]/5 text-left text-[11px] tracking-[0.25em] uppercase font-medium ${
                      link.highlight
                        ? 'text-[#C4A484] font-bold'
                        : active
                          ? 'text-[#0A0A0A] font-bold'
                          : 'text-[#0A0A0A]/70'
                    }`}
                  >
                    <span>{link.name}</span>

                    {active && (
                      <motion.span
                        initial={{
                          opacity: 0,
                          scaleX: 0
                        }}
                        animate={{
                          opacity: 1,
                          scaleX: 1
                        }}
                        transition={{
                          duration: 0.35
                        }}
                        className="w-8 h-[1px] bg-[#0A0A0A] origin-right"
                      />
                    )}
                  </motion.button>
                );
              })}

              {/* Mobile Admin */}
              <motion.button
                onClick={() => {
                  navigate('/admin');
                  setMobileMenuOpen(false);
                }}
                initial={{
                  opacity: 0,
                  x: -20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  delay: navLinks.length * 0.07,
                  duration: 0.4
                }}
                className="w-full flex items-center gap-2 py-4 text-[10px] tracking-[0.25em] uppercase text-[#0A0A0A]/60"
              >
                <ShieldCheck className="w-4 h-4 text-[#C4A484]" />
                <span>ADMIN DASHBOARD</span>
              </motion.button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;