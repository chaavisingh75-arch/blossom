import React, { useState, useMemo, useEffect } from 'react';
import { Page, Flower, BouquetItem, ReadyBouquet, BookedOrder } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PetalBackground } from './components/PetalBackground';
import { BouquetDrawer } from './components/BouquetDrawer';
import { EnquireModal } from './components/EnquireModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CollectionPage } from './pages/CollectionPage';
import { FlowerBoutiquePage } from './pages/FlowerBoutiquePage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [bouquetItems, setBouquetItems] = useState<BouquetItem[]>(() => {
    try {
      const saved = localStorage.getItem('blossom_selected_bouquet');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Could not read bouquet from localStorage:', e);
      return [];
    }
  });
  const [isBouquetDrawerOpen, setIsBouquetDrawerOpen] = useState(false);
  const [drawerDefaultTab, setDrawerDefaultTab] = useState<'bouquet' | 'orders'>('bouquet');
  const [enquireFlower, setEnquireFlower] = useState<Flower | null>(null);
  const [contactInitialMessage, setContactInitialMessage] = useState('');

  // Persistent booked orders stored in localStorage
  const [orders, setOrders] = useState<BookedOrder[]>(() => {
    try {
      const saved = localStorage.getItem('blossom_booked_orders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Could not read booked orders from localStorage:', e);
      return [];
    }
  });

  // Keep localStorage updated when bouquetItems change
  useEffect(() => {
    try {
      localStorage.setItem('blossom_selected_bouquet', JSON.stringify(bouquetItems));
    } catch (e) {
      console.error('Could not save bouquet items to localStorage:', e);
    }
  }, [bouquetItems]);

  // Keep localStorage updated when orders change
  useEffect(() => {
    try {
      localStorage.setItem('blossom_booked_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Could not save booked orders to localStorage:', e);
    }
  }, [orders]);

  // Handle navigation
  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add a flower or bouquet to the current cart selection
  const handleAddToBouquet = (flower: Flower) => {
    setBouquetItems((prev) => {
      const existing = prev.find((item) => item.flower.id === flower.id);
      if (existing) {
        return prev.map((item) =>
          item.flower.id === flower.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { flower, quantity: 1 }];
    });
  };

  // Add a ready-made bouquet to selection
  const handleAddReadyBouquet = (bouquet: ReadyBouquet) => {
    const asFlower: Flower = {
      id: bouquet.id,
      name: bouquet.name,
      emoji: '💐',
      categories: ['Romantic'],
      symbolizes: bouquet.tag,
      message: bouquet.subtitle,
      description: bouquet.description,
      image: bouquet.image,
      palette: ['#B45367', '#F2CAD1'],
      price: bouquet.price,
    };
    handleAddToBouquet(asFlower);
  };

  // Immediate "Order Now" action on a ready-made bouquet -> goes directly to Checkout!
  const handleOrderReadyBouquet = (bouquet: ReadyBouquet) => {
    const asFlower: Flower = {
      id: bouquet.id,
      name: bouquet.name,
      emoji: '💐',
      categories: ['Romantic'],
      symbolizes: bouquet.tag,
      message: bouquet.subtitle,
      description: bouquet.description,
      image: bouquet.image,
      palette: ['#B45367', '#F2CAD1'],
      price: bouquet.price,
    };

    setBouquetItems((prev) => {
      const exists = prev.find((i) => i.flower.id === bouquet.id);
      if (!exists) {
        return [{ flower: asFlower, quantity: 1 }, ...prev];
      }
      const others = prev.filter((i) => i.flower.id !== bouquet.id);
      return [exists, ...others];
    });

    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Immediate "Order Now" action on an individual flower stem
  const handleOrderFlower = (flower: Flower) => {
    setBouquetItems((prev) => {
      const exists = prev.find((i) => i.flower.id === flower.id);
      if (!exists) {
        return [{ flower, quantity: 1 }, ...prev];
      }
      const others = prev.filter((i) => i.flower.id !== flower.id);
      return [exists, ...others];
    });

    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update quantity in custom bouquet
  const handleUpdateQuantity = (flowerId: string, delta: number) => {
    setBouquetItems((prev) =>
      prev
        .map((item) => {
          if (item.flower.id === flowerId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as BouquetItem[]
    );
  };

  // Remove flower item from bouquet
  const handleRemoveItem = (flowerId: string) => {
    setBouquetItems((prev) => prev.filter((item) => item.flower.id !== flowerId));
  };

  // Clear entire bouquet selection
  const handleClearBouquet = () => {
    setBouquetItems([]);
  };

  // Proceed from drawer to checkout
  const handleProceedToCheckout = () => {
    setIsBouquetDrawerOpen(false);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When an order is confirmed on CheckoutPage
  const handleOrderSuccess = (newOrder: BookedOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  // Open drawer directly on "My Orders" tab
  const handleOpenMyOrders = () => {
    setDrawerDefaultTab('orders');
    setIsBouquetDrawerOpen(true);
  };

  // Open drawer directly on "My Bouquet" tab
  const handleOpenMyBouquet = () => {
    setDrawerDefaultTab('bouquet');
    setIsBouquetDrawerOpen(true);
  };

  // Set of flower IDs in bouquet for badges
  const bouquetItemIds = useMemo(() => {
    return new Set(bouquetItems.map((item) => item.flower.id));
  }, [bouquetItems]);

  const totalBouquetCount = useMemo(() => {
    return bouquetItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [bouquetItems]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F6] text-[#4A3E3D] relative selection:bg-[#F3D5D8] selection:text-[#5B2E35]">
      {/* Delicate floating flower petal background */}
      <PetalBackground />

      {/* Main sticky navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        bouquetCount={totalBouquetCount}
        onOpenBouquet={handleOpenMyBouquet}
        ordersCount={orders.length}
        onOpenOrders={handleOpenMyOrders}
      />

      {/* Main Page Content */}
      <main id="main-content" className="flex-1 relative z-10">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onAddToBouquet={handleAddToBouquet}
            onEnquire={(f) => setEnquireFlower(f)}
            onOrderNow={handleOrderReadyBouquet}
            onOrderFlower={handleOrderFlower}
            bouquetItemIds={bouquetItemIds}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'collection' && (
          <CollectionPage
            onNavigate={handleNavigate}
            onAddToBouquet={handleAddToBouquet}
            onEnquire={(f) => setEnquireFlower(f)}
            onOrderNow={handleOrderFlower}
            bouquetItemIds={bouquetItemIds}
            onOpenBouquet={handleOpenMyBouquet}
          />
        )}

        {currentPage === 'boutique' && (
          <FlowerBoutiquePage
            onNavigate={handleNavigate}
            onAddToBouquet={handleAddReadyBouquet}
            onOrderNow={handleOrderReadyBouquet}
            onOpenBouquet={handleOpenMyBouquet}
            bouquetCount={totalBouquetCount}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage
            onNavigate={handleNavigate}
            items={bouquetItems}
            onOrderSuccess={handleOrderSuccess}
            onClearBouquet={handleClearBouquet}
            onOpenMyOrders={handleOpenMyOrders}
            onAddBouquet={handleOrderReadyBouquet}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            initialMessage={contactInitialMessage}
            onClearInitialMessage={() => setContactInitialMessage('')}
          />
        )}
      </main>

      {/* My Bouquet & My Orders Dual-Tab Drawer */}
      <BouquetDrawer
        isOpen={isBouquetDrawerOpen}
        onClose={() => setIsBouquetDrawerOpen(false)}
        items={bouquetItems}
        orders={orders}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearBouquet={handleClearBouquet}
        onProceedToCheckout={handleProceedToCheckout}
        onNavigate={handleNavigate}
        defaultTab={drawerDefaultTab}
      />

      {/* Quick Enquire Modal for single flower */}
      <EnquireModal
        flower={enquireFlower}
        onClose={() => setEnquireFlower(null)}
      />

      {/* Boutique Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
