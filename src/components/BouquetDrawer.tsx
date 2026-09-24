import React, { useState, useEffect } from 'react';
import { BouquetItem, BookedOrder, Page } from '../types';
import { SafeImage } from './SafeImage';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  PackageCheck,
  Truck,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
} from 'lucide-react';

interface BouquetDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: BouquetItem[];
  orders: BookedOrder[];
  onUpdateQuantity: (flowerId: string, delta: number) => void;
  onRemoveItem: (flowerId: string) => void;
  onClearBouquet: () => void;
  onProceedToCheckout: () => void;
  onNavigate: (page: Page) => void;
  defaultTab?: 'bouquet' | 'orders';
}

export const BouquetDrawer: React.FC<BouquetDrawerProps> = ({
  isOpen,
  onClose,
  items,
  orders,
  onUpdateQuantity,
  onRemoveItem,
  onClearBouquet,
  onProceedToCheckout,
  onNavigate,
  defaultTab = 'bouquet',
}) => {
  const [activeTab, setActiveTab] = useState<'bouquet' | 'orders'>(defaultTab);

  useEffect(() => {
    if (isOpen && defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  if (!isOpen) return null;

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const totalPriceNum = items.reduce((acc, i) => {
    const num = parseFloat((i.flower.price || '$50.00').replace(/[^0-9.]/g, '')) || 50;
    return acc + num * i.quantity;
  }, 0);

  const formattedTotalPrice = `₹${Math.round(totalPriceNum * 75).toLocaleString('en-IN')} ($${totalPriceNum.toFixed(2)})`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FCF9F6] border-l border-[#EADFD9] shadow-2xl flex flex-col">
          {/* Top Header with Tab Switcher */}
          <div className="p-5 bg-white border-b border-[#EFE5E0]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-8 h-8 rounded-full bg-[#FCECEE] flex items-center justify-center text-sm">
                  🌸
                </span>
                <h3 className="font-serif text-xl font-bold text-[#2E1F22]">
                  Blossom Floral Hub
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-[#796765] hover:text-[#2E1F22] hover:bg-[#F6EEEC] rounded-full transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs: My Bouquet | My Orders */}
            <div className="grid grid-cols-2 p-1 bg-[#F5ECE8] rounded-xl">
              <button
                id="tab-my-bouquet"
                onClick={() => setActiveTab('bouquet')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                  activeTab === 'bouquet'
                    ? 'bg-white text-[#8C3B4E] shadow-xs'
                    : 'text-[#6D5A5D] hover:text-[#2E1F22]'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>My Bouquet</span>
                {totalItems > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-[#8C3B4E] text-white">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                id="tab-my-orders"
                onClick={() => setActiveTab('orders')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                  activeTab === 'orders'
                    ? 'bg-white text-[#8C3B4E] shadow-xs'
                    : 'text-[#6D5A5D] hover:text-[#2E1F22]'
                }`}
              >
                <PackageCheck className="w-3.5 h-3.5" />
                <span>My Orders</span>
                {orders.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-[#5D7052] text-white">
                    {orders.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* TAB 1: MY BOUQUET (Current Selection) */}
          {activeTab === 'bouquet' && (
            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FCECEE] flex items-center justify-center text-3xl">
                      💐
                    </div>
                    <h4 className="font-serif text-xl text-[#2E1F22] mb-1 font-medium">
                      Your bouquet is empty
                    </h4>
                    <p className="text-xs sm:text-sm text-[#796765] mb-6 max-w-xs mx-auto">
                      Select ready-made hand-tied bouquets or fresh stems from our boutique to start your delivery.
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        onNavigate('boutique');
                      }}
                      className="px-6 py-2.5 rounded-full bg-[#8C3B4E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#722F3E] transition-colors"
                    >
                      Shop Bouquets
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center text-xs uppercase tracking-wider font-semibold text-[#8E7978]">
                      <span>Selected Bouquets ({items.length})</span>
                      <button
                        onClick={onClearBouquet}
                        className="text-[#8C3B4E] hover:underline lowercase text-xs"
                      >
                        clear all
                      </button>
                    </div>

                    <div className="space-y-3">
                      {items.map(({ flower, quantity }) => (
                        <div
                          key={flower.id}
                          className="flex items-center space-x-3 p-3 bg-white rounded-2xl border border-[#EFE6E2] shadow-2xs"
                        >
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#FAF6F4] shrink-0 border border-[#EBE0DC]">
                            <SafeImage
                              src={flower.image}
                              alt={flower.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h5 className="font-serif text-base font-semibold text-[#2E1F22] truncate">
                                {flower.name}
                              </h5>
                              <button
                                onClick={() => onRemoveItem(flower.id)}
                                className="text-[#A28E8C] hover:text-[#8C3B4E] p-1 transition-colors"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <p className="text-[11px] text-[#8C3B4E] truncate mb-1.5">
                              {flower.symbolizes}
                            </p>

                            <div className="flex items-center justify-between">
                              {/* Quantity +/- Buttons */}
                              <div className="flex items-center border border-[#E5D7D3] rounded-lg bg-[#FAF6F4]">
                                <button
                                  onClick={() => onUpdateQuantity(flower.id, -1)}
                                  className="px-2 py-0.5 text-xs text-[#5E4D4E] hover:bg-[#EDE3E0] rounded-l-md"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2.5 text-xs font-bold text-[#2E1F22]">
                                  {quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(flower.id, 1)}
                                  className="px-2 py-0.5 text-xs text-[#5E4D4E] hover:bg-[#EDE3E0] rounded-r-md"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="text-xs font-bold text-[#8C3B4E]">
                                {flower.price || '$50.00'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Checkout Footer Action */}
              {items.length > 0 && (
                <div className="p-5 bg-white border-t border-[#EFE5E0] space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-[#7A686B]">Estimated Total:</span>
                    <span className="font-serif text-xl font-bold text-[#8C3B4E]">
                      {formattedTotalPrice}
                    </span>
                  </div>

                  <button
                    id="drawer-proceed-checkout-btn"
                    onClick={() => {
                      onClose();
                      onProceedToCheckout();
                    }}
                    className="w-full py-3.5 rounded-full bg-[#8C3B4E] hover:bg-[#722F3E] text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Proceed to Delivery Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-[#917E81] text-center">
                    🌸 Includes free florist wrapping & handwritten card
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MY ORDERS (Past & Active Booked Orders) */}
          {activeTab === 'orders' && (
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FCECEE] flex items-center justify-center text-3xl">
                    📦
                  </div>
                  <h4 className="font-serif text-xl text-[#2E1F22] mb-1 font-medium">
                    No orders booked yet
                  </h4>
                  <p className="text-xs sm:text-sm text-[#796765] mb-6 max-w-xs mx-auto">
                    Your bouquet orders will appear here.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onNavigate('boutique');
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#8C3B4E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#722F3E] transition-colors"
                  >
                    Browse Bouquets
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-xs uppercase tracking-wider font-semibold text-[#8E7978]">
                    Your Bouquet Bookings ({orders.length})
                  </div>

                  {orders.map((order) => (
                    <div
                      key={order.orderId}
                      className="bg-white rounded-2xl border border-[#EDE0DC] p-4 shadow-xs space-y-3"
                    >
                      {/* Order Header: ID and Status */}
                      <div className="flex items-center justify-between pb-2 border-b border-[#F2E8E5]">
                        <div>
                          <span className="text-[10px] text-[#917E81] block">Order ID</span>
                          <span className="font-mono text-xs font-bold text-[#8C3B4E]">
                            {order.orderId}
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#F2F5ED] text-[#485B3F] text-[11px] font-semibold flex items-center space-x-1 border border-[#D5E0CC]">
                          <CheckCircle2 className="w-3 h-3 text-[#5D7052]" />
                          <span>{order.status}</span>
                        </span>
                      </div>

                      {/* Bouquet Image & Name */}
                      <div className="flex items-center space-x-3">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#FAF6F4] shrink-0 border border-[#EBE0DC]">
                          <SafeImage
                            src={order.primaryBouquetImage}
                            alt={order.primaryBouquetName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-serif text-sm font-semibold text-[#2E1F22] truncate">
                            {order.primaryBouquetName}
                          </h5>
                          <div className="flex items-center justify-between text-xs text-[#7A686B] mt-0.5">
                            <span>Qty: {order.totalQuantity}</span>
                            <span className="font-bold text-[#8C3B4E]">{order.totalPrice}</span>
                          </div>
                        </div>
                      </div>

                      {/* Order Progress Tracker */}
                      <div className="p-2.5 bg-[#FAF6F4] rounded-xl border border-[#EDE1DD]">
                        <div className="text-[10px] uppercase font-semibold text-[#8A7578] mb-1.5 flex items-center justify-between">
                          <span>Status Tracker</span>
                          <span className="text-[#8C3B4E]">1/4 Completed</span>
                        </div>
                        <div className="grid grid-cols-4 gap-1 text-center">
                          <div className="flex flex-col items-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#8C3B4E] ring-2 ring-[#F2CAD1] mb-1" />
                            <span className="text-[9px] font-bold text-[#8C3B4E]">Confirmed</span>
                          </div>
                          <div className="flex flex-col items-center opacity-50">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#D8C7C4] mb-1" />
                            <span className="text-[9px] text-[#715F62]">Preparing</span>
                          </div>
                          <div className="flex flex-col items-center opacity-50">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#D8C7C4] mb-1" />
                            <span className="text-[9px] text-[#715F62]">Out</span>
                          </div>
                          <div className="flex flex-col items-center opacity-50">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#D8C7C4] mb-1" />
                            <span className="text-[9px] text-[#715F62]">Delivered</span>
                          </div>
                        </div>
                      </div>

                      {/* Delivery Address & Schedule */}
                      <div className="space-y-1.5 text-[11px] text-[#69585B] pt-1">
                        <div className="flex items-start space-x-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#8C3B4E] shrink-0 mt-0.5" />
                          <span className="line-clamp-2">
                            {order.delivery.houseFlat}, {order.delivery.streetArea}, {order.delivery.city} - {order.delivery.pincode}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#8C3B4E] shrink-0" />
                          <span>
                            Delivery Date: <strong className="text-[#2E1F22]">{order.delivery.deliveryDateFormatted || order.delivery.deliveryDate}</strong>
                          </span>
                        </div>

                        <div className="flex items-center space-x-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#8C3B4E] shrink-0" />
                          <span>
                            Delivery Time: <strong className="text-[#2E1F22]">{order.delivery.deliveryTime}</strong>
                          </span>
                        </div>

                        {order.delivery.giftCardNote && (
                          <div className="p-2 bg-[#FFF9FA] rounded-lg border border-[#F2CAD1] text-[10px] text-[#783643] italic">
                            "{order.delivery.giftCardNote}"
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
