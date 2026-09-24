import React, { useState } from 'react';
import { Page, BouquetItem, BookedOrder, DeliveryDetails, ReadyBouquet } from '../types';
import { READY_BOUQUETS } from '../data/bouquets';
import { DeliveryMapPicker } from '../components/DeliveryMapPicker';
import {
  DeliveryDateTimePicker,
  DeliveryScheduleData,
} from '../components/DeliveryDateTimePicker';
import { SafeImage } from '../components/SafeImage';
import {
  Sparkles,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Home,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Heart,
  ShoppingBag,
  ExternalLink,
  Gift,
  FileText,
  Check,
} from 'lucide-react';

interface CheckoutPageProps {
  onNavigate: (page: Page) => void;
  items: BouquetItem[];
  onOrderSuccess: (order: BookedOrder) => void;
  onClearBouquet: () => void;
  onOpenMyOrders: () => void;
  onAddBouquet?: (bouquet: ReadyBouquet) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  onNavigate,
  items,
  onOrderSuccess,
  onClearBouquet,
  onOpenMyOrders,
  onAddBouquet,
}) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [houseFlat, setHouseFlat] = useState('');
  const [streetArea, setStreetArea] = useState('Sardarpura');
  const [city, setCity] = useState('Jodhpur');
  const [state, setState] = useState('Rajasthan');
  const [pincode, setPincode] = useState('342003');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Delivery Date & Time Schedule State
  const todayObj = new Date();
  const todayStr = todayObj.toISOString().split('T')[0];
  const initialFormattedDate = todayObj.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const [scheduleData, setScheduleData] = useState<DeliveryScheduleData>({
    deliveryDate: todayStr,
    deliveryDateFormatted: initialFormattedDate,
    deliveryTime: 'Early Morning Bloom (8:00 AM – 11:00 AM)',
    deliverySlotId: 'morning',
    isExactTime: false,
    occasion: 'romantic',
    giftCardNote: '',
    senderName: '',
    isAnonymous: false,
    deliveryInstructions: '',
  });

  // Selected Map Location
  const [selectedMapLocation, setSelectedMapLocation] = useState<{
    lat: number;
    lng: number;
    formattedAddress: string;
    areaName: string;
    pincode?: string;
  }>({
    lat: 26.2825,
    lng: 73.0125,
    formattedAddress: 'Sardarpura, Jodhpur, Rajasthan 342003',
    areaName: 'Sardarpura',
    pincode: '342003',
  });

  // Success Confirmed Order State
  const [confirmedOrder, setConfirmedOrder] = useState<BookedOrder | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Totals
  const totalQuantity = items.reduce((acc, i) => acc + i.quantity, 0);

  // Calculate total price in dollars / rupees
  const totalPriceNum = items.reduce((acc, i) => {
    // Parse price string e.g. "$68.00" or "₹999"
    const num = parseFloat((i.flower.price || '$50.00').replace(/[^0-9.]/g, '')) || 50;
    return acc + num * i.quantity;
  }, 0);

  const formattedTotalPrice = `₹${Math.round(totalPriceNum * 75).toLocaleString('en-IN')} ($${totalPriceNum.toFixed(2)})`;

  const primaryItem = items[0] || null;

  // Handle map selection sync
  const handleLocationSelect = (loc: {
    lat: number;
    lng: number;
    formattedAddress: string;
    areaName: string;
    pincode?: string;
  }) => {
    setSelectedMapLocation(loc);
    if (loc.areaName) setStreetArea(loc.areaName);
    if (loc.pincode && loc.pincode.length === 6) setPincode(loc.pincode);
  };

  // Form Validation
  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) errs.fullName = 'Full name is required';

    // Phone validation (at least 10 digits)
    const cleanPhone = mobileNumber.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    // Email validation
    if (!emailAddress.trim() || !emailAddress.includes('@')) {
      errs.emailAddress = 'Please enter a valid email address';
    }

    if (!houseFlat.trim()) errs.houseFlat = 'House / Flat number is required';
    if (!streetArea.trim()) errs.streetArea = 'Street / Area is required';
    if (!city.trim()) errs.city = 'City is required';
    if (!state.trim()) errs.state = 'State is required';

    // PIN code validation
    const cleanPin = pincode.replace(/\D/g, '');
    if (!cleanPin || cleanPin.length !== 6) {
      errs.pincode = 'Please enter a valid 6-digit PIN code (e.g. 342003)';
    }

    if (!scheduleData.deliveryDate) {
      errs.deliveryDate = 'Please select a delivery date';
    }
    if (!scheduleData.deliveryTime) {
      errs.deliveryTime = 'Please select a preferred delivery window or exact time';
    }

    if (items.length === 0) {
      errs.items = 'No bouquet selected. Please select a bouquet first.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handle Order Submit
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Generate unique order ID: BLM-2026-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `BLM-2026-${randomSuffix}`;

    const combinedSpecialInstructions = [
      specialInstructions.trim(),
      scheduleData.deliveryInstructions?.trim(),
      scheduleData.giftCardNote?.trim() ? `Card Note: ${scheduleData.giftCardNote.trim()}` : '',
    ]
      .filter(Boolean)
      .join(' | ');

    const delivery: DeliveryDetails = {
      fullName: fullName.trim(),
      mobileNumber: mobileNumber.trim(),
      emailAddress: emailAddress.trim(),
      houseFlat: houseFlat.trim(),
      streetArea: streetArea.trim(),
      city: city.trim() || 'Jodhpur',
      state: state.trim() || 'Rajasthan',
      pincode: pincode.trim(),
      deliveryDate: scheduleData.deliveryDate,
      deliveryTime: scheduleData.deliveryTime,
      deliveryDateFormatted: scheduleData.deliveryDateFormatted,
      deliverySlotId: scheduleData.deliverySlotId,
      isExactTime: scheduleData.isExactTime,
      exactTimeStr: scheduleData.exactTimeStr,
      occasion: scheduleData.occasion,
      giftCardNote: scheduleData.giftCardNote?.trim(),
      senderName: scheduleData.senderName?.trim(),
      isAnonymous: scheduleData.isAnonymous,
      specialInstructions: combinedSpecialInstructions || 'Standard florist courier delivery',
      latitude: selectedMapLocation.lat,
      longitude: selectedMapLocation.lng,
      selectedLocationName: selectedMapLocation.formattedAddress,
    };

    const newOrder: BookedOrder = {
      orderId,
      items: [...items],
      primaryBouquetName: primaryItem ? primaryItem.flower.name : 'Handcrafted Blossom Bouquet',
      primaryBouquetImage: primaryItem ? primaryItem.flower.image : '',
      totalQuantity,
      totalPrice: formattedTotalPrice,
      totalPriceNum,
      delivery,
      status: 'Order Confirmed',
      createdAt: new Date().toISOString(),
      giftNote: scheduleData.giftCardNote?.trim(),
    };

    setTimeout(() => {
      setConfirmedOrder(newOrder);
      onOrderSuccess(newOrder);
      onClearBouquet();
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  // -------------------------------------------------------------
  // SUCCESS CONFIRMATION SCREEN (When order has been placed)
  // -------------------------------------------------------------
  if (confirmedOrder) {
    const d = confirmedOrder.delivery;
    return (
      <div className="pt-24 pb-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Card Header */}
        <div className="bg-white rounded-3xl border border-[#EDE0DC] shadow-xl overflow-hidden p-6 sm:p-10 text-center mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FCECEE] mx-auto flex items-center justify-center text-3xl sm:text-4xl shadow-xs mb-4">
            🌸
          </div>

          <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-[#F2F5ED] text-[#485B3F] text-xs font-semibold uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-4 h-4 text-[#5D7052]" />
            <span>Booking Confirmed</span>
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#291B1E] mb-3">
            Order Booked Successfully! 🌸
          </h1>

          <p className="text-sm sm:text-base text-[#6E5C5F] max-w-lg mx-auto font-light leading-relaxed mb-6">
            Thank you for choosing <strong className="font-semibold text-[#291B1E]">Blossom Flower Boutique</strong>. Your bouquet has been booked successfully and our master florist is hand-tying your stems with care.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#FAF4F2] border border-[#E8D9D4] text-[#3E2F32]">
              <span className="text-xs uppercase tracking-wider text-[#917A7D] font-medium">Order ID:</span>
              <span className="font-mono font-bold text-base text-[#8C3B4E]">{confirmedOrder.orderId}</span>
            </div>

            <div className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#EAF2E6] border border-[#CFE1C7] text-[#39502D] text-xs font-bold">
              <span>Order status:</span>
              <span className="text-[#485B3F]">Order Confirmed</span>
              <Check className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* ORDER HIGHLIGHTS SUMMARY CARD */}
        <div className="bg-white rounded-2xl border border-[#EDE0DC] p-6 shadow-xs mb-8">
          <h3 className="font-serif text-lg font-semibold text-[#291B1E] mb-4 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#8C3B4E]" />
            <span>Order & Delivery Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-[#FAF5F2] rounded-xl border border-[#EFE4E0] text-xs">
            <div>
              <span className="text-[#8E7978] block uppercase tracking-wider text-[10px]">Order ID</span>
              <strong className="font-mono text-sm text-[#8C3B4E]">{confirmedOrder.orderId}</strong>
            </div>
            <div>
              <span className="text-[#8E7978] block uppercase tracking-wider text-[10px]">Bouquet Name</span>
              <strong className="text-[#291B1E] text-sm truncate block">{confirmedOrder.primaryBouquetName}</strong>
            </div>
            <div>
              <span className="text-[#8E7978] block uppercase tracking-wider text-[10px]">Quantity</span>
              <strong className="text-[#291B1E] text-sm">{confirmedOrder.totalQuantity} items</strong>
            </div>
            <div>
              <span className="text-[#8E7978] block uppercase tracking-wider text-[10px]">Price</span>
              <strong className="text-[#8C3B4E] text-sm font-serif">{confirmedOrder.totalPrice}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3 p-4 bg-white rounded-xl border border-[#F0E6E2] text-xs">
            <div>
              <span className="text-[#8E7978] block uppercase tracking-wider text-[10px]">Customer Name</span>
              <strong className="text-[#291B1E]">{d.fullName}</strong>
            </div>
            <div>
              <span className="text-[#8E7978] block uppercase tracking-wider text-[10px]">Delivery Date & Time</span>
              <strong className="text-[#8C3B4E]">{d.deliveryDateFormatted || d.deliveryDate} ({d.deliveryTime})</strong>
            </div>
            <div>
              <span className="text-[#8E7978] block uppercase tracking-wider text-[10px]">Delivery Address</span>
              <strong className="text-[#291B1E] block truncate">{d.houseFlat}, {d.streetArea}, {d.city} - {d.pincode}</strong>
            </div>
          </div>
        </div>

        {/* ORDER PROGRESS TRACKER: Order Confirmed → Preparing Bouquet → Out for Delivery → Delivered */}
        <div className="bg-white rounded-2xl border border-[#EDE0DC] p-6 shadow-xs mb-8">
          <h3 className="text-xs uppercase tracking-wider font-semibold text-[#8C7678] mb-6 text-center">
            Live Order Progress Tracker
          </h3>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#8C3B4E] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-md mb-2 ring-4 ring-[#F9ECEF]">
                ✓
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#8C3B4E]">Order Confirmed</span>
              <span className="text-[10px] text-[#8E7978] hidden sm:block">Payment & Stems reserved</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center opacity-70">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#FAF3F1] border border-[#E7D6D1] text-[#715E61] flex items-center justify-center font-medium text-xs sm:text-sm mb-2">
                2
              </div>
              <span className="text-xs sm:text-sm font-medium text-[#48393B]">Preparing Bouquet</span>
              <span className="text-[10px] text-[#8E7978] hidden sm:block">Arranging with silk ribbon</span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center opacity-70">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#FAF3F1] border border-[#E7D6D1] text-[#715E61] flex items-center justify-center font-medium text-xs sm:text-sm mb-2">
                3
              </div>
              <span className="text-xs sm:text-sm font-medium text-[#48393B]">Out for Delivery</span>
              <span className="text-[10px] text-[#8E7978] hidden sm:block">Chilled courier vehicle</span>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center opacity-70">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#FAF3F1] border border-[#E7D6D1] text-[#715E61] flex items-center justify-center font-medium text-xs sm:text-sm mb-2">
                4
              </div>
              <span className="text-xs sm:text-sm font-medium text-[#48393B]">Delivered</span>
              <span className="text-[10px] text-[#8E7978] hidden sm:block">At customer doorstep</span>
            </div>
          </div>
        </div>

        {/* DETAILS OF THE BOOKED BOUQUET & DELIVERY */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          {/* Bouquet Details Card */}
          <div className="md:col-span-6 bg-white rounded-2xl border border-[#EDE0DC] p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-[#8C3B4E] mb-4">
                <ShoppingBag className="w-4 h-4" />
                <h3 className="font-serif text-lg font-semibold text-[#291B1E]">Booked Floral Arrangement</h3>
              </div>

              <div className="flex items-center space-x-4 mb-4 p-3 bg-[#FAF6F4] rounded-xl border border-[#EFE5E1]">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-white shrink-0 border border-[#EBE0DC]">
                  <SafeImage
                    src={confirmedOrder.primaryBouquetImage}
                    alt={confirmedOrder.primaryBouquetName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-lg font-semibold text-[#291B1E] truncate">
                    {confirmedOrder.primaryBouquetName}
                  </h4>
                  <p className="text-xs text-[#7A686B] mb-1">
                    Quantity: <strong className="text-[#291B1E]">{confirmedOrder.totalQuantity}</strong>
                  </p>
                  <p className="text-sm font-bold text-[#8C3B4E]">
                    {confirmedOrder.totalPrice}
                  </p>
                </div>
              </div>

              {/* Items breakdown if multiple */}
              {confirmedOrder.items.length > 1 && (
                <div className="text-xs text-[#715F61] space-y-1 mb-4">
                  <span className="font-semibold text-[#3E2F32]">All items in order:</span>
                  {confirmedOrder.items.map((it) => (
                    <div key={it.flower.id} className="flex justify-between">
                      <span>• {it.flower.name}</span>
                      <span>x{it.quantity}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#F2E8E5] flex items-center justify-between text-xs text-[#7B6765]">
              <span>Complimentary botanical card included</span>
              <span className="text-[#5D7052] font-semibold">Fresh Guaranteed</span>
            </div>
          </div>

          {/* Delivery Details Card */}
          <div className="md:col-span-6 bg-white rounded-2xl border border-[#EDE0DC] p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-[#8C3B4E] mb-4">
                <Truck className="w-4 h-4" />
                <h3 className="font-serif text-lg font-semibold text-[#291B1E]">Delivery Information</h3>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm text-[#453638]">
                <div className="flex justify-between py-1 border-b border-[#F4E9E6]">
                  <span className="text-[#8A7477]">Recipient Name:</span>
                  <span className="font-semibold text-[#291B1E]">{d.fullName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4E9E6]">
                  <span className="text-[#8A7477]">Contact Phone:</span>
                  <span className="font-medium text-[#291B1E]">{d.mobileNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4E9E6]">
                  <span className="text-[#8A7477]">Delivery Date:</span>
                  <span className="font-semibold text-[#8C3B4E]">
                    {d.deliveryDateFormatted || d.deliveryDate}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4E9E6]">
                  <span className="text-[#8A7477]">Delivery Window / Time:</span>
                  <span className="font-medium text-[#291B1E] text-right">
                    {d.deliveryTime}
                  </span>
                </div>

                {/* Complimentary Card Note Preview */}
                {d.giftCardNote && (
                  <div className="pt-2">
                    <span className="text-[#8A7477] text-xs font-semibold uppercase tracking-wider block mb-1">
                      Botanical Card Note:
                    </span>
                    <div className="p-3 bg-[#FCF7F8] rounded-xl border border-[#F2CAD1] text-xs space-y-1.5">
                      <p className="italic text-[#783643] leading-relaxed">
                        "{d.giftCardNote}"
                      </p>
                      <div className="text-[11px] text-[#8C5D66] font-medium pt-1 border-t border-[#F5D5DC] flex justify-between">
                        <span>Card Signed:</span>
                        <strong className="text-[#8C3B4E]">
                          {d.isAnonymous ? 'Secret Admirer 🌸' : d.senderName || d.fullName}
                        </strong>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-1">
                  <span className="text-[#8A7477] block mb-1">Destination Address:</span>
                  <p className="p-2.5 bg-[#FAF6F4] rounded-lg border border-[#EDE1DD] text-xs leading-relaxed text-[#3B2C2E]">
                    {d.houseFlat}, {d.streetArea}, {d.city}, {d.state} - {d.pincode}
                  </p>
                </div>

                {d.specialInstructions && (
                  <div className="pt-1">
                    <span className="text-[#8A7477] block mb-1">Courier & Handling Notes:</span>
                    <p className="p-2 bg-[#FFF9FA] rounded-lg border border-[#F2CAD1] text-xs text-[#783643]">
                      {d.specialInstructions}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F2E8E5] text-[11px] text-[#8E7978] flex items-center justify-between">
              <span>📍 Destination in {d.city}, Rajasthan</span>
              <span className="text-[#5D7052] font-semibold">Chilled Courier</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: View My Order | Continue Shopping */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="view-my-orders-btn"
            onClick={onOpenMyOrders}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#8C3B4E] hover:bg-[#722F3E] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <span>View My Order</span>
            <ExternalLink className="w-4 h-4" />
          </button>

          <button
            id="continue-shopping-btn"
            onClick={() => onNavigate('boutique')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-[#F9ECEF] text-[#3E2F32] border border-[#E3D6D2] text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-2xs transition-all flex items-center justify-center space-x-2"
          >
            <span>Continue Shopping</span>
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // EMPTY CART CHECKOUT GUARD (With 1-click popular bouquet selector)
  // -------------------------------------------------------------
  if (items.length === 0) {
    const popularBouquets = READY_BOUQUETS.slice(0, 3);
    return (
      <div className="pt-24 pb-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-3xl border border-[#EDE0DC] p-8 sm:p-10 shadow-md mb-8">
          <div className="w-16 h-16 rounded-full bg-[#FCECEE] mx-auto flex items-center justify-center text-3xl mb-4">
            💐
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#2E1F22] mb-2">
            No Bouquet Selected Yet
          </h2>
          <p className="text-sm text-[#786668] mb-6 font-light max-w-md mx-auto">
            Choose a ready-made floral bouquet below to carry directly into checkout and schedule your delivery:
          </p>

          {/* Quick-Pick Popular Bouquets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-left">
            {popularBouquets.map((bq) => (
              <div
                key={bq.id}
                className="p-4 rounded-2xl border border-[#EFE3E0] bg-[#FAF6F4] flex flex-col justify-between"
              >
                <div>
                  <div className="w-full h-32 rounded-xl overflow-hidden mb-3 bg-white">
                    <SafeImage src={bq.image} alt={bq.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-[#2E1F22]">{bq.name}</h4>
                  <p className="text-xs text-[#8C3B4E] font-medium mb-1">{bq.price}</p>
                </div>
                <button
                  id={`quick-select-${bq.id}`}
                  onClick={() => {
                    if (onAddBouquet) {
                      onAddBouquet(bq);
                    }
                  }}
                  className="mt-3 w-full py-2 rounded-xl bg-[#8C3B4E] hover:bg-[#722F3E] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Select & Order Now
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate('boutique')}
              className="px-6 py-3 rounded-full bg-[#2D2123] hover:bg-[#433538] text-white text-xs font-semibold uppercase tracking-wider shadow-xs transition-colors cursor-pointer"
            >
              Browse All Bouquets
            </button>
            <button
              onClick={() => onNavigate('collection')}
              className="px-6 py-3 rounded-full bg-white hover:bg-[#FAF4F2] text-[#3E2F32] border border-[#E2D5D1] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Custom Stems Collection
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // MAIN CHECKOUT & BOOKING FORM
  // -------------------------------------------------------------
  return (
    <div className="pt-20 pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Breadcrumb & Title */}
      <div className="mb-8">
        <button
          onClick={() => onNavigate('boutique')}
          className="inline-flex items-center space-x-1.5 text-xs text-[#8C3B4E] hover:text-[#5E2733] font-medium mb-3 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Flower Boutique</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#291B1E] tracking-tight">
              Book Bouquet <span className="italic font-normal text-[#B45367]">& Delivery</span>
            </h1>
            <p className="text-sm text-[#735F62] font-light mt-1">
              Hand-tied freshly at dawn and delivered across Jodhpur, Rajasthan.
            </p>
          </div>
          <div className="text-xs text-[#8E7978]">
            Step <strong className="text-[#8C3B4E]">2 of 2</strong> — Delivery & Confirmation
          </div>
        </div>
      </div>

      <form onSubmit={handleBookingSubmit} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Customer Details + Delivery Address + Map */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. CUSTOMER CONTACT DETAILS */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE0DC] shadow-xs">
              <div className="flex items-center space-x-2 text-[#8C3B4E] mb-5">
                <User className="w-4 h-4" />
                <h3 className="font-serif text-xl font-semibold text-[#291B1E]">
                  1. Recipient & Contact Details
                </h3>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-[#4E3D40] mb-1">
                    Full Name <span className="text-[#B45367]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A89694]">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g., Ananya Rathore"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-[#3E2F32] bg-[#FDFBF9] placeholder:text-[#A89694] focus:outline-hidden focus:ring-1 focus:ring-[#8C3B4E] ${
                        errors.fullName ? 'border-[#C05B6F] bg-[#FFF8F8]' : 'border-[#E2D5D1]'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-xs text-[#C05B6F] mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Mobile Number & Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="mobileNumber" className="block text-xs font-semibold uppercase tracking-wider text-[#4E3D40] mb-1">
                      Mobile Number <span className="text-[#B45367]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A89694]">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        id="mobileNumber"
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="e.g., 98290 12345"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-[#3E2F32] bg-[#FDFBF9] placeholder:text-[#A89694] focus:outline-hidden focus:ring-1 focus:ring-[#8C3B4E] ${
                          errors.mobileNumber ? 'border-[#C05B6F] bg-[#FFF8F8]' : 'border-[#E2D5D1]'
                        }`}
                      />
                    </div>
                    {errors.mobileNumber && (
                      <p className="text-xs text-[#C05B6F] mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.mobileNumber}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="emailAddress" className="block text-xs font-semibold uppercase tracking-wider text-[#4E3D40] mb-1">
                      Email Address <span className="text-[#B45367]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A89694]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        id="emailAddress"
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="e.g., ananya@gmail.com"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-[#3E2F32] bg-[#FDFBF9] placeholder:text-[#A89694] focus:outline-hidden focus:ring-1 focus:ring-[#8C3B4E] ${
                          errors.emailAddress ? 'border-[#C05B6F] bg-[#FFF8F8]' : 'border-[#E2D5D1]'
                        }`}
                      />
                    </div>
                    {errors.emailAddress && (
                      <p className="text-xs text-[#C05B6F] mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.emailAddress}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. COMPLETE DELIVERY ADDRESS */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE0DC] shadow-xs">
              <div className="flex items-center space-x-2 text-[#8C3B4E] mb-5">
                <Home className="w-4 h-4" />
                <h3 className="font-serif text-xl font-semibold text-[#291B1E]">
                  2. Complete Delivery Address
                </h3>
              </div>

              <div className="space-y-4">
                {/* House / Flat Number */}
                <div>
                  <label htmlFor="houseFlat" className="block text-xs font-semibold uppercase tracking-wider text-[#4E3D40] mb-1">
                    House / Flat / Villa Number <span className="text-[#B45367]">*</span>
                  </label>
                  <input
                    id="houseFlat"
                    type="text"
                    value={houseFlat}
                    onChange={(e) => setHouseFlat(e.target.value)}
                    placeholder="e.g., House 42-B, Haveli Residency"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#3E2F32] bg-[#FDFBF9] placeholder:text-[#A89694] focus:outline-hidden focus:ring-1 focus:ring-[#8C3B4E] ${
                      errors.houseFlat ? 'border-[#C05B6F] bg-[#FFF8F8]' : 'border-[#E2D5D1]'
                    }`}
                  />
                  {errors.houseFlat && (
                    <p className="text-xs text-[#C05B6F] mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.houseFlat}</span>
                    </p>
                  )}
                </div>

                {/* Street / Area */}
                <div>
                  <label htmlFor="streetArea" className="block text-xs font-semibold uppercase tracking-wider text-[#4E3D40] mb-1">
                    Street / Colony / Area <span className="text-[#B45367]">*</span>
                  </label>
                  <input
                    id="streetArea"
                    type="text"
                    value={streetArea}
                    onChange={(e) => setStreetArea(e.target.value)}
                    placeholder="e.g., Near Nehru Park, Sardarpura B Road"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#3E2F32] bg-[#FDFBF9] placeholder:text-[#A89694] focus:outline-hidden focus:ring-1 focus:ring-[#8C3B4E] ${
                      errors.streetArea ? 'border-[#C05B6F] bg-[#FFF8F8]' : 'border-[#E2D5D1]'
                    }`}
                  />
                  {errors.streetArea && (
                    <p className="text-xs text-[#C05B6F] mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.streetArea}</span>
                    </p>
                  )}
                </div>

                {/* City, State, PIN Code */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="city" className="block text-xs font-semibold uppercase tracking-wider text-[#4E3D40] mb-1">
                      City <span className="text-[#B45367]">*</span>
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2D5D1] text-sm text-[#3E2F32] bg-[#FDFBF9]"
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-xs font-semibold uppercase tracking-wider text-[#4E3D40] mb-1">
                      State <span className="text-[#B45367]">*</span>
                    </label>
                    <input
                      id="state"
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2D5D1] text-sm text-[#3E2F32] bg-[#FDFBF9]"
                    />
                  </div>

                  <div>
                    <label htmlFor="pincode" className="block text-xs font-semibold uppercase tracking-wider text-[#4E3D40] mb-1">
                      PIN Code <span className="text-[#B45367]">*</span>
                    </label>
                    <input
                      id="pincode"
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="342003"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#3E2F32] bg-[#FDFBF9] ${
                        errors.pincode ? 'border-[#C05B6F] bg-[#FFF8F8]' : 'border-[#E2D5D1]'
                      }`}
                    />
                    {errors.pincode && (
                      <p className="text-[11px] text-[#C05B6F] mt-1">{errors.pincode}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. INTERACTIVE DELIVERY LOCATION MAP */}
            <DeliveryMapPicker
              selectedLocation={selectedMapLocation}
              onLocationSelect={handleLocationSelect}
              initialStreetArea={streetArea}
            />

            {/* 3. DATE, TIME PICKER & BOTANICAL CARD */}
            <DeliveryDateTimePicker
              initialDate={scheduleData.deliveryDate}
              initialTime={scheduleData.deliveryTime}
              initialInstructions={scheduleData.giftCardNote}
              onChange={(data) => setScheduleData(data)}
              errorDate={errors.deliveryDate}
              errorTime={errors.deliveryTime}
            />

            {/* 4. SPECIAL INSTRUCTIONS & NOTES */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE0DC] shadow-xs">
              <div className="flex items-center space-x-2 text-[#8C3B4E] mb-4">
                <FileText className="w-4 h-4" />
                <h3 className="font-serif text-xl font-semibold text-[#291B1E]">
                  4. Special Instructions (Optional)
                </h3>
              </div>
              <label htmlFor="specialInstructions" className="block text-xs text-[#6F5B5E] mb-2">
                Provide courier instructions, landmark tips, or delivery preferences (e.g. "Leave with guard", "Call on arrival"):
              </label>
              <textarea
                id="specialInstructions"
                rows={3}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g., Gate code 2410, call 10 minutes prior to delivery, handle with delicate care..."
                className="w-full p-3.5 rounded-xl border border-[#E2D5D1] text-sm text-[#3E2F32] bg-[#FDFBF9] placeholder:text-[#A89694] focus:outline-hidden focus:ring-1 focus:ring-[#8C3B4E]"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary Card & Final Submit */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EDE0DC] shadow-md">
              <div className="flex items-center justify-between pb-4 border-b border-[#F0E6E2]">
                <h3 className="font-serif text-xl font-semibold text-[#291B1E]">
                  Order Summary
                </h3>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#FCECEE] text-[#8C3B4E] font-medium">
                  {totalQuantity} {totalQuantity === 1 ? 'Bouquet' : 'Bouquets'}
                </span>
              </div>

              {/* Selected Bouquet List */}
              <div className="py-4 space-y-3.5 max-h-72 overflow-y-auto">
                {items.map(({ flower, quantity }) => (
                  <div
                    key={flower.id}
                    className="flex items-center space-x-3 p-3 rounded-2xl bg-[#FAF6F4] border border-[#EFE5E0]"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 border border-[#EBE0DC]">
                      <SafeImage
                        src={flower.image}
                        alt={flower.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-base font-semibold text-[#291B1E] truncate">
                        {flower.name}
                      </h4>
                      <p className="text-xs text-[#8A7678] truncate">
                        {flower.symbolizes}
                      </p>
                      <div className="flex items-center justify-between mt-1 text-xs">
                        <span className="font-medium text-[#483A3D]">Qty: {quantity}</span>
                        <span className="font-bold text-[#8C3B4E]">{flower.price || '$50.00'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Delivery Schedule Confirmation in Order Summary */}
              <div className="pt-3 pb-2 border-t border-[#F0E6E2]">
                <div className="p-3 bg-[#FCF5F6] rounded-2xl border border-[#F2CAD1]">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#8C3B4E] uppercase tracking-wider mb-1">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Delivery Target</span>
                    </span>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-[#F0D5DA] font-medium text-[#7D3443]">
                      {scheduleData.isExactTime ? 'Exact Time' : 'Time Window'}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#291B1E]">
                    {scheduleData.deliveryDateFormatted || scheduleData.deliveryDate}
                  </p>
                  <p className="text-xs text-[#8C3B4E] font-medium flex items-center space-x-1 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{scheduleData.deliveryTime}</span>
                  </p>
                </div>
              </div>

              {/* Price Calculation Breakdown */}
              <div className="pt-4 border-t border-[#F0E6E2] space-y-2 text-xs text-[#6B5A5C]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium text-[#291B1E]">{formattedTotalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Jodhpur Boutique Courier:</span>
                  <span className="font-semibold text-[#5D7052]">FREE (Complimentary)</span>
                </div>
                <div className="flex justify-between">
                  <span>Botanical Food & Silk Wrapping:</span>
                  <span className="font-semibold text-[#5D7052]">FREE</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#F0E6E2] text-sm">
                  <span className="font-bold text-[#291B1E]">Total Payable:</span>
                  <span className="font-serif text-xl font-bold text-[#8C3B4E]">
                    {formattedTotalPrice}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="confirm-booking-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 py-4 rounded-full bg-[#8C3B4E] hover:bg-[#722F3E] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Booking Your Bouquet...</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Confirm & Book Bouquet</span>
                  </>
                )}
              </button>

              <div className="mt-4 grid grid-cols-2 gap-2 text-center text-[11px] text-[#8E7978]">
                <div className="p-2 rounded-lg bg-[#FAF6F4] flex items-center justify-center space-x-1">
                  <Truck className="w-3.5 h-3.5 text-[#5D7052]" />
                  <span>On-Time Delivery</span>
                </div>
                <div className="p-2 rounded-lg bg-[#FAF6F4] flex items-center justify-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8C3B4E]" />
                  <span>7-Day Freshness</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
