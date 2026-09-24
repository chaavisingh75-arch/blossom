import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { Menu, X, Heart, Sparkles, PhoneCall, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  bouquetCount: number;
  onOpenBouquet: () => void;
  ordersCount?: number;
  onOpenOrders?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  bouquetCount,
  onOpenBouquet,
  ordersCount = 0,
  onOpenOrders,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Our Collection', page: 'collection' },
    { label: 'Flower Boutique', page: 'boutique' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Contact Us', page: 'contact' },
  ];

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderNowClick = () => {
    setMobileMenuOpen(false);
    if (bouquetCount > 0) {
      onNavigate('checkout');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigate('boutique');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        const el = document.getElementById('our-bouquet-collection');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  return (
    <>
      <header
        id="main-navigation"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FCF9F6]/90 backdrop-blur-md shadow-xs border-b border-[#F0E4DE]/70 py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <button
              id="brand-logo-btn"
              onClick={() => handleNavClick('home')}
              className="group flex items-center space-x-2 text-left focus:outline-hidden"
              aria-label="Blossom Flower Boutique Home"
            >
              <span className="w-9 h-9 rounded-full bg-[#F7E7E9] flex items-center justify-center text-lg shadow-xs group-hover:scale-105 transition-transform duration-300 border border-[#EDD5D9]">
                🌸
              </span>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-medium tracking-wide text-[#3E2F32] group-hover:text-[#B45367] transition-colors">
                  Blossom
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#8E7978] -mt-1 font-medium">
                  Flower Boutique
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Desktop menu">
              {navItems.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    id={`nav-link-${item.page}`}
                    onClick={() => handleNavClick(item.page)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full ${
                      isActive
                        ? 'text-[#8C3B4E] bg-[#F7E7E9]/70 font-semibold'
                        : 'text-[#5C4D4E] hover:text-[#8C3B4E] hover:bg-[#F9ECEF]/40'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#B45367]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Header Right Action Items */}
            <div className="flex items-center space-x-2.5 sm:space-x-3">
              {/* My Orders Button if orders exist */}
              {ordersCount > 0 && onOpenOrders && (
                <button
                  id="navbar-my-orders-btn"
                  onClick={onOpenOrders}
                  className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-[#FAF4F2] border border-[#E7D6D0] text-[#715E61] hover:bg-[#F5ECE8] transition-colors cursor-pointer"
                  title="View your booked orders"
                >
                  <span>Orders</span>
                  <span className="w-4 h-4 rounded-full bg-[#8C3B4E] text-white text-[10px] font-bold flex items-center justify-center">
                    {ordersCount}
                  </span>
                </button>
              )}

              {/* Bouquet Builder Drawer Button */}
              <button
                id="bouquet-drawer-btn"
                onClick={onOpenBouquet}
                className="relative flex items-center space-x-2 px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full bg-[#FFF5F6] border border-[#F2CAD1] text-[#7A3644] hover:bg-[#FCE7EB] hover:border-[#E8A5B2] transition-all duration-200 shadow-xs cursor-pointer"
                title="View your custom bouquet"
                aria-label={`Bouquet with ${bouquetCount} flowers`}
              >
                <Heart className={`w-4 h-4 ${bouquetCount > 0 ? 'fill-[#C05B6F] text-[#C05B6F]' : 'text-[#8C3B4E]'}`} />
                <span className="hidden sm:inline">My Bouquet</span>
                <span className="w-5 h-5 rounded-full bg-[#8C3B4E] text-white text-[11px] font-bold flex items-center justify-center">
                  {bouquetCount}
                </span>
              </button>

              {/* Order / Delivery CTA Button (Desktop) */}
              <button
                id="nav-quick-order-btn"
                onClick={handleOrderNowClick}
                className="hidden sm:flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#5D7052] hover:bg-[#4E5E44] active:scale-97 text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase shadow-xs transition-all duration-200 cursor-pointer"
                title="Order flowers now"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{bouquetCount > 0 ? `ORDER NOW (${bouquetCount})` : 'ORDER NOW'}</span>
              </button>

              {/* Mobile Hamburger Toggle Button */}
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-full text-[#4A3E3D] hover:bg-[#F5E6E8] focus:outline-hidden cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-xs md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-18 left-0 right-0 bg-[#FCF9F6] border-b border-[#F0DFD8] shadow-xl px-6 py-6 transition-all duration-300 animate-in fade-in slide-in-from-top-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-2">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#A28B89] px-3 pb-1">
                Boutique Directory
              </div>
              {navItems.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    id={`mobile-nav-${item.page}`}
                    onClick={() => handleNavClick(item.page)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-medium text-left transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#F9ECEF] text-[#8C3B4E] font-semibold'
                        : 'text-[#4A3E3D] hover:bg-[#FBF2F4]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <Sparkles className="w-4 h-4 text-[#C05B6F]" />}
                  </button>
                );
              })}

              <div className="pt-4 border-t border-[#F2E5E1] mt-2 flex flex-col space-y-2">
                <button
                  id="mobile-nav-bouquet-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBouquet();
                  }}
                  className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-[#F7E7E9] text-[#7A3644] font-medium text-sm cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-[#C05B6F] text-[#C05B6F]" />
                  <span>View Custom Bouquet ({bouquetCount})</span>
                </button>
                
                {ordersCount > 0 && onOpenOrders && (
                  <button
                    id="mobile-nav-orders-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenOrders();
                    }}
                    className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-xl bg-[#FAF4F2] border border-[#E7D6D0] text-[#695558] font-medium text-sm cursor-pointer"
                  >
                    <span>My Placed Orders ({ordersCount})</span>
                  </button>
                )}

                <button
                  id="mobile-nav-order-btn"
                  onClick={handleOrderNowClick}
                  className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-[#5D7052] hover:bg-[#4E5E44] text-white font-semibold text-sm shadow-xs cursor-pointer active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{bouquetCount > 0 ? `ORDER NOW (${bouquetCount} in Bouquet)` : 'ORDER NOW • Select Bouquet'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
