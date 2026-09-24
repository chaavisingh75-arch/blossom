import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sun,
  Sunset,
  Sunrise,
  Moon,
  Gift,
  AlertCircle,
  Heart,
  PartyPopper,
  Info,
} from 'lucide-react';

export interface DeliveryScheduleData {
  deliveryDate: string; // YYYY-MM-DD
  deliveryDateFormatted: string; // e.g. "Wednesday, 24 September 2026"
  deliveryTime: string; // e.g. "Morning (8:00 AM – 11:00 AM)" or "Exact: 10:30 AM"
  deliverySlotId: string;
  isExactTime: boolean;
  exactTimeStr?: string;
  occasion?: string;
  giftCardNote?: string;
  senderName?: string;
  isAnonymous?: boolean;
  deliveryInstructions?: string;
}

interface DeliveryDateTimePickerProps {
  initialDate?: string;
  initialTime?: string;
  initialInstructions?: string;
  onChange: (schedule: DeliveryScheduleData) => void;
  errorDate?: string;
  errorTime?: string;
}

interface TimeSlot {
  id: string;
  name: string;
  timeRange: string;
  icon: React.ComponentType<{ className?: string }>;
  tag?: string;
  tagColor?: string;
  description: string;
  cutoffHour: number; // 24-hour cutoff for today
  isMidnight?: boolean;
}

const TIME_SLOTS: TimeSlot[] = [
  {
    id: 'morning',
    name: 'Early Morning Bloom',
    timeRange: '8:00 AM – 11:00 AM',
    icon: Sunrise,
    tag: 'Fresh Dawn Pick',
    tagColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Freshly cut at dawn; perfect breakfast surprise.',
    cutoffHour: 10,
  },
  {
    id: 'afternoon',
    name: 'Afternoon Sunshine',
    timeRange: '12:00 PM – 3:00 PM',
    icon: Sun,
    tag: 'Office & Home',
    tagColor: 'bg-orange-100 text-orange-800 border-orange-200',
    description: 'Chilled delivery during peak daytime & office hours.',
    cutoffHour: 14,
  },
  {
    id: 'evening',
    name: 'Golden Hour / Sunset',
    timeRange: '4:00 PM – 7:00 PM',
    icon: Sunset,
    tag: 'Most Popular',
    tagColor: 'bg-[#FCECEE] text-[#8C3B4E] border-[#F2CAD1]',
    description: 'Perfect timing for dinner reunions, dates & celebrations.',
    cutoffHour: 18,
  },
  {
    id: 'twilight',
    name: 'Twilight Evening',
    timeRange: '7:00 PM – 9:30 PM',
    icon: Moon,
    tag: 'Evening Surprise',
    tagColor: 'bg-purple-100 text-purple-800 border-purple-200',
    description: 'Relaxed candlelit evening and post-work arrival.',
    cutoffHour: 20,
  },
  {
    id: 'midnight',
    name: 'Midnight Celebration Surprise',
    timeRange: '11:30 PM – 12:00 Midnight',
    icon: PartyPopper,
    tag: 'Birthday & Anniversary Chime',
    tagColor: 'bg-rose-100 text-rose-900 border-rose-300',
    description: 'Guaranteed midnight doorstep delivery with special celebration chime.',
    cutoffHour: 22,
    isMidnight: true,
  },
];

const OCCASIONS = [
  { id: 'romantic', label: 'Romance & Love', emoji: '❤️' },
  { id: 'birthday', label: 'Happy Birthday', emoji: '🎂' },
  { id: 'anniversary', label: 'Anniversary', emoji: '🥂' },
  { id: 'congrats', label: 'Congratulations', emoji: '🎉' },
  { id: 'thankyou', label: 'Thank You', emoji: '🌸' },
  { id: 'justbecause', label: 'Just Because', emoji: '🌿' },
];

const PRESET_EXACT_TIMES = [
  { label: '09:00 AM (Breakfast)', hour: '09', minute: '00', period: 'AM' },
  { label: '11:30 AM (Brunch)', hour: '11', minute: '30', period: 'AM' },
  { label: '01:00 PM (Lunch)', hour: '01', minute: '00', period: 'PM' },
  { label: '04:30 PM (High Tea)', hour: '04', minute: '30', period: 'PM' },
  { label: '06:30 PM (Evening)', hour: '06', minute: '30', period: 'PM' },
  { label: '08:00 PM (Dinner)', hour: '08', minute: '00', period: 'PM' },
  { label: '11:59 PM (Midnight)', hour: '11', minute: '59', period: 'PM' },
];

function formatDateISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDateHuman(dateStr: string): string {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const DeliveryDateTimePicker: React.FC<DeliveryDateTimePickerProps> = ({
  initialDate,
  initialTime,
  initialInstructions = '',
  onChange,
  errorDate,
  errorTime,
}) => {
  // Current real-world time reference
  const now = useMemo(() => new Date(), []);
  const currentHour = now.getHours();

  // Reference dates
  const today = useMemo(() => new Date(now.getFullYear(), now.getMonth(), now.getDate()), [now]);
  const tomorrow = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + 1);
    return d;
  }, [today]);
  const dayAfter = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + 2);
    return d;
  }, [today]);

  const todayStr = useMemo(() => formatDateISO(today), [today]);
  const tomorrowStr = useMemo(() => formatDateISO(tomorrow), [tomorrow]);
  const dayAfterStr = useMemo(() => formatDateISO(dayAfter), [dayAfter]);

  // Selected Date state
  const [selectedDate, setSelectedDate] = useState<string>(initialDate || todayStr);
  const isSelectedToday = selectedDate === todayStr;

  // Calendar modal or expanded view
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [calendarViewMonth, setCalendarViewMonth] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  // Time Slot Selection mode: 'slots' or 'exact'
  const [isExactTimeMode, setIsExactTimeMode] = useState<boolean>(false);
  const [selectedSlotId, setSelectedSlotId] = useState<string>(() => {
    // If initialTime passed, check if it matches a slot
    if (initialTime?.includes('Morning')) return 'morning';
    if (initialTime?.includes('Afternoon')) return 'afternoon';
    if (initialTime?.includes('Evening')) return 'evening';
    if (initialTime?.includes('Twilight')) return 'twilight';
    if (initialTime?.includes('Midnight')) return 'midnight';

    // Default smartly: if today and after 2 PM, pick evening or twilight
    if (currentHour >= 18) return 'twilight';
    if (currentHour >= 14) return 'evening';
    if (currentHour >= 10) return 'afternoon';
    return 'morning';
  });

  // Exact time state
  const [exactHour, setExactHour] = useState('06');
  const [exactMinute, setExactMinute] = useState('30');
  const [exactPeriod, setExactPeriod] = useState<'AM' | 'PM'>('PM');

  // Occasion & Card Note
  const [selectedOccasion, setSelectedOccasion] = useState<string>('romantic');
  const [giftCardNote, setGiftCardNote] = useState<string>(initialInstructions);
  const [senderName, setSenderName] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [deliveryInstructions, setDeliveryInstructions] = useState<string>('');

  // Synchronize changes to parent whenever state changes
  const notifyParent = (
    newDate: string,
    slotId: string,
    exactMode: boolean,
    hour: string,
    min: string,
    period: 'AM' | 'PM',
    occasion: string,
    cardNote: string,
    sender: string,
    anonymous: boolean,
    instructions: string
  ) => {
    const formattedDate = formatDateHuman(newDate);

    let formattedTime = '';
    if (exactMode) {
      formattedTime = `Exact Appointment: ${hour}:${min} ${period}`;
    } else {
      const slot = TIME_SLOTS.find((s) => s.id === slotId) || TIME_SLOTS[0];
      formattedTime = `${slot.name} (${slot.timeRange})`;
    }

    onChange({
      deliveryDate: newDate,
      deliveryDateFormatted: formattedDate,
      deliveryTime: formattedTime,
      deliverySlotId: slotId,
      isExactTime: exactMode,
      exactTimeStr: exactMode ? `${hour}:${min} ${period}` : undefined,
      occasion,
      giftCardNote: cardNote,
      senderName: anonymous ? 'Anonymous Admirer' : sender,
      isAnonymous: anonymous,
      deliveryInstructions: instructions,
    });
  };

  // Handler for Date change
  const handleSelectDate = (dateStr: string) => {
    setSelectedDate(dateStr);

    // If selecting today, check if currently selected slot has expired
    let newSlotId = selectedSlotId;
    if (dateStr === todayStr) {
      const currentSlot = TIME_SLOTS.find((s) => s.id === selectedSlotId);
      if (currentSlot && currentHour >= currentSlot.cutoffHour) {
        // find next available slot
        const available = TIME_SLOTS.find((s) => currentHour < s.cutoffHour);
        if (available) {
          newSlotId = available.id;
          setSelectedSlotId(available.id);
        }
      }
    }

    notifyParent(
      dateStr,
      newSlotId,
      isExactTimeMode,
      exactHour,
      exactMinute,
      exactPeriod,
      selectedOccasion,
      giftCardNote,
      senderName,
      isAnonymous,
      deliveryInstructions
    );
  };

  // Handler for Slot change
  const handleSelectSlot = (slotId: string) => {
    setIsExactTimeMode(false);
    setSelectedSlotId(slotId);
    notifyParent(
      selectedDate,
      slotId,
      false,
      exactHour,
      exactMinute,
      exactPeriod,
      selectedOccasion,
      giftCardNote,
      senderName,
      isAnonymous,
      deliveryInstructions
    );
  };

  // Handler for Exact Time toggle
  const handleToggleExactTime = (enabled: boolean) => {
    setIsExactTimeMode(enabled);
    notifyParent(
      selectedDate,
      selectedSlotId,
      enabled,
      exactHour,
      exactMinute,
      exactPeriod,
      selectedOccasion,
      giftCardNote,
      senderName,
      isAnonymous,
      deliveryInstructions
    );
  };

  // Handler for Exact Time updates
  const handleExactTimeUpdate = (
    newHour: string,
    newMin: string,
    newPeriod: 'AM' | 'PM'
  ) => {
    setExactHour(newHour);
    setExactMinute(newMin);
    setExactPeriod(newPeriod);
    setIsExactTimeMode(true);
    notifyParent(
      selectedDate,
      selectedSlotId,
      true,
      newHour,
      newMin,
      newPeriod,
      selectedOccasion,
      giftCardNote,
      senderName,
      isAnonymous,
      deliveryInstructions
    );
  };

  // Handler for Presets
  const handleSelectPresetTime = (preset: (typeof PRESET_EXACT_TIMES)[0]) => {
    setExactHour(preset.hour);
    setExactMinute(preset.minute);
    setExactPeriod(preset.period as 'AM' | 'PM');
    setIsExactTimeMode(true);
    notifyParent(
      selectedDate,
      selectedSlotId,
      true,
      preset.hour,
      preset.minute,
      preset.period as 'AM' | 'PM',
      selectedOccasion,
      giftCardNote,
      senderName,
      isAnonymous,
      deliveryInstructions
    );
  };

  // Generate calendar days for the current calendar view month
  const calendarDays = useMemo(() => {
    const year = calendarViewMonth.getFullYear();
    const month = calendarViewMonth.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: Array<{
      dateStr: string;
      dayNumber: number;
      isCurrentMonth: boolean;
      isPast: boolean;
      isToday: boolean;
      isSelected: boolean;
    }> = [];

    // Blank padding before the first day
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({
        dateStr: '',
        dayNumber: 0,
        isCurrentMonth: false,
        isPast: true,
        isToday: false,
        isSelected: false,
      });
    }

    // Days in current month
    for (let d = 1; d <= daysInMonth; d++) {
      const thisDate = new Date(year, month, d);
      const str = formatDateISO(thisDate);
      const isPast = thisDate < today;
      const isTodayDate = str === todayStr;
      const isSelected = str === selectedDate;

      days.push({
        dateStr: str,
        dayNumber: d,
        isCurrentMonth: true,
        isPast,
        isToday: isTodayDate,
        isSelected,
      });
    }

    return days;
  }, [calendarViewMonth, today, todayStr, selectedDate]);

  const monthYearLabel = useMemo(() => {
    return calendarViewMonth.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  }, [calendarViewMonth]);

  const handlePrevMonth = () => {
    setCalendarViewMonth(
      new Date(calendarViewMonth.getFullYear(), calendarViewMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCalendarViewMonth(
      new Date(calendarViewMonth.getFullYear(), calendarViewMonth.getMonth() + 1, 1)
    );
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE0DC] shadow-xs space-y-7">
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#F0E6E2]">
        <div className="flex items-center space-x-2.5 text-[#8C3B4E]">
          <div className="w-8 h-8 rounded-full bg-[#FCECEE] flex items-center justify-center">
            <CalendarIcon className="w-4 h-4 text-[#8C3B4E]" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#291B1E]">
              3. Delivery Date & Time Window
            </h3>
            <p className="text-xs text-[#786668]">
              Handcrafted in Jodhpur & delivered in temperature-controlled florist couriers
            </p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-[#5D7052] bg-[#F2F5ED] px-3 py-1 rounded-full border border-[#D8E2D1] self-start sm:self-auto">
          ✓ Freshness Guaranteed
        </span>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 1. DELIVERY DATE SELECTION */}
      {/* ------------------------------------------------------------------ */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#4E3D40]">
            Select Delivery Date <span className="text-[#B45367]">*</span>
          </label>
          <button
            type="button"
            onClick={() => setShowFullCalendar(!showFullCalendar)}
            className="text-xs text-[#8C3B4E] hover:text-[#5E2431] font-medium flex items-center space-x-1 underline decoration-dotted underline-offset-4"
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>{showFullCalendar ? 'Close Calendar' : 'View Full Month Calendar'}</span>
          </button>
        </div>

        {/* Quick Date Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Today Card */}
          <button
            type="button"
            onClick={() => handleSelectDate(todayStr)}
            className={`p-4 rounded-2xl border text-left transition-all duration-200 relative ${
              selectedDate === todayStr
                ? 'bg-[#FCF5F6] border-[#8C3B4E] ring-2 ring-[#8C3B4E]/20 shadow-xs'
                : 'bg-[#FDFBF9] hover:bg-white border-[#E5D7D3] hover:border-[#D0BDBC]'
            }`}
          >
            {selectedDate === todayStr && (
              <span className="absolute top-2.5 right-2.5 text-[#8C3B4E]">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            )}
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#B45367] mb-1">
              ⚡ Same Day Delivery
            </div>
            <div className="font-serif text-lg font-bold text-[#2A1D20]">Today</div>
            <div className="text-xs text-[#715E61] mt-0.5">
              {today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
            <div className="mt-2 text-[10px] text-[#5D7052] font-medium bg-[#F2F5ED] px-2 py-0.5 rounded-md inline-block">
              Earliest 90-min prep
            </div>
          </button>

          {/* Tomorrow Card */}
          <button
            type="button"
            onClick={() => handleSelectDate(tomorrowStr)}
            className={`p-4 rounded-2xl border text-left transition-all duration-200 relative ${
              selectedDate === tomorrowStr
                ? 'bg-[#FCF5F6] border-[#8C3B4E] ring-2 ring-[#8C3B4E]/20 shadow-xs'
                : 'bg-[#FDFBF9] hover:bg-white border-[#E5D7D3] hover:border-[#D0BDBC]'
            }`}
          >
            {selectedDate === tomorrowStr && (
              <span className="absolute top-2.5 right-2.5 text-[#8C3B4E]">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            )}
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C7678] mb-1">
              ⭐ Most Popular
            </div>
            <div className="font-serif text-lg font-bold text-[#2A1D20]">Tomorrow</div>
            <div className="text-xs text-[#715E61] mt-0.5">
              {tomorrow.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
            <div className="mt-2 text-[10px] text-[#8C3B4E] font-medium bg-[#FCECEE] px-2 py-0.5 rounded-md inline-block">
              All slots open
            </div>
          </button>

          {/* Day After Tomorrow Card */}
          <button
            type="button"
            onClick={() => handleSelectDate(dayAfterStr)}
            className={`p-4 rounded-2xl border text-left transition-all duration-200 relative ${
              selectedDate === dayAfterStr
                ? 'bg-[#FCF5F6] border-[#8C3B4E] ring-2 ring-[#8C3B4E]/20 shadow-xs'
                : 'bg-[#FDFBF9] hover:bg-white border-[#E5D7D3] hover:border-[#D0BDBC]'
            }`}
          >
            {selectedDate === dayAfterStr && (
              <span className="absolute top-2.5 right-2.5 text-[#8C3B4E]">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            )}
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C7678] mb-1">
              🗓️ In 2 Days
            </div>
            <div className="font-serif text-lg font-bold text-[#2A1D20]">
              {dayAfter.toLocaleDateString('en-US', { weekday: 'long' })}
            </div>
            <div className="text-xs text-[#715E61] mt-0.5">
              {dayAfter.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
            <div className="mt-2 text-[10px] text-[#69585B] font-medium bg-[#FAF4F2] px-2 py-0.5 rounded-md inline-block">
              Fresh farm batch
            </div>
          </button>
        </div>

        {/* Selected Date Callout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-[#FAF4F2] rounded-xl border border-[#EDE1DD] text-xs">
          <div className="flex items-center space-x-2 text-[#4A393C]">
            <CalendarIcon className="w-4 h-4 text-[#8C3B4E] shrink-0" />
            <span>
              Chosen Date: <strong className="text-[#8C3B4E] font-semibold">{formatDateHuman(selectedDate)}</strong>
            </span>
          </div>

          <div className="mt-2 sm:mt-0 flex items-center space-x-2">
            <span className="text-[#857173]">Or pick exact date:</span>
            <input
              type="date"
              min={todayStr}
              value={selectedDate}
              onChange={(e) => handleSelectDate(e.target.value)}
              className="text-xs bg-white px-2.5 py-1 rounded-lg border border-[#D9C8C4] text-[#3E2F32] focus:outline-hidden focus:ring-1 focus:ring-[#8C3B4E]"
            />
          </div>
        </div>

        {/* FULL INTERACTIVE CALENDAR (Toggleable) */}
        {showFullCalendar && (
          <div className="p-4 sm:p-5 bg-white rounded-2xl border border-[#E7D7D3] shadow-md animate-fadeIn">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F4E9E6]">
              <h4 className="font-serif text-base font-semibold text-[#291B1E] flex items-center space-x-2">
                <span>{monthYearLabel}</span>
              </h4>
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1.5 rounded-lg hover:bg-[#FAF4F2] text-[#6D5A5D] transition-colors"
                  aria-label="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1.5 rounded-lg hover:bg-[#FAF4F2] text-[#6D5A5D] transition-colors"
                  aria-label="Next Month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-[#8C7678] uppercase mb-2">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((cd, idx) => {
                if (!cd.isCurrentMonth) {
                  return <div key={`empty-${idx}`} className="h-10" />;
                }

                return (
                  <button
                    key={cd.dateStr}
                    type="button"
                    disabled={cd.isPast}
                    onClick={() => {
                      handleSelectDate(cd.dateStr);
                      setShowFullCalendar(false);
                    }}
                    className={`h-10 rounded-xl text-xs font-medium flex flex-col items-center justify-center transition-all ${
                      cd.isSelected
                        ? 'bg-[#8C3B4E] text-white font-bold shadow-xs'
                        : cd.isToday
                        ? 'bg-[#FCECEE] text-[#8C3B4E] font-bold border border-[#F2CAD1]'
                        : cd.isPast
                        ? 'text-[#C5B7B5] cursor-not-allowed opacity-40'
                        : 'text-[#4A393C] hover:bg-[#FAF4F2]'
                    }`}
                  >
                    <span>{cd.dayNumber}</span>
                    {cd.isToday && !cd.isSelected && (
                      <span className="w-1 h-1 rounded-full bg-[#8C3B4E]" />
                    )}
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-[#8C7678] mt-3 text-center">
              Bouquet pre-bookings are accepted up to 45 days in advance.
            </p>
          </div>
        )}

        {errorDate && (
          <p className="text-xs text-[#C05B6F] flex items-center space-x-1 mt-1">
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span>{errorDate}</span>
          </p>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. TIME DELIVERY SELECTION (SLOTS OR EXACT TIMING) */}
      {/* ------------------------------------------------------------------ */}
      <div className="space-y-4 pt-4 border-t border-[#F2E7E4]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4E3D40]">
              Preferred Delivery Time Window <span className="text-[#B45367]">*</span>
            </label>
            <p className="text-xs text-[#826E71]">
              Select a standard delivery window or specify an exact target hour
            </p>
          </div>

          {/* Toggle between Window Slots and Exact Time */}
          <div className="flex items-center p-1 bg-[#F4EBE8] rounded-xl self-start sm:self-auto">
            <button
              type="button"
              onClick={() => handleToggleExactTime(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                !isExactTimeMode
                  ? 'bg-white text-[#8C3B4E] shadow-2xs'
                  : 'text-[#7A6669] hover:text-[#2D1F22]'
              }`}
            >
              Standard Windows (3-Hr)
            </button>
            <button
              type="button"
              onClick={() => handleToggleExactTime(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1 ${
                isExactTimeMode
                  ? 'bg-white text-[#8C3B4E] shadow-2xs'
                  : 'text-[#7A6669] hover:text-[#2D1F22]'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#B45367]" />
              <span>Exact Specific Time</span>
            </button>
          </div>
        </div>

        {/* OPTION A: STANDARD DELIVERY WINDOW SLOTS */}
        {!isExactTimeMode && (
          <div className="space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TIME_SLOTS.map((slot) => {
                const Icon = slot.icon;
                const isSelected = selectedSlotId === slot.id;
                const isPastToday = isSelectedToday && currentHour >= slot.cutoffHour;

                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={isPastToday}
                    onClick={() => handleSelectSlot(slot.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-200 relative ${
                      isPastToday
                        ? 'opacity-40 bg-[#F9F6F5] border-[#E8DCD8] cursor-not-allowed'
                        : isSelected
                        ? 'bg-[#FCF5F6] border-[#8C3B4E] ring-2 ring-[#8C3B4E]/20 shadow-xs'
                        : 'bg-[#FDFBF9] hover:bg-white border-[#E6D8D4] hover:border-[#CFBCBA]'
                    } ${slot.isMidnight ? 'sm:col-span-2' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-[#8C3B4E] text-white shadow-2xs'
                              : 'bg-[#F5ECE8] text-[#8C3B4E]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs sm:text-sm font-bold text-[#2B1D20]">
                              {slot.name}
                            </span>
                            {slot.tag && (
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${slot.tagColor}`}
                              >
                                {slot.tag}
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-semibold text-[#8C3B4E] flex items-center space-x-1 mt-0.5">
                            <Clock className="w-3 h-3" />
                            <span>{slot.timeRange}</span>
                          </div>
                        </div>
                      </div>

                      {isSelected && !isPastToday && (
                        <CheckCircle2 className="w-4 h-4 text-[#8C3B4E] shrink-0" />
                      )}
                    </div>

                    <p className="text-xs text-[#7A6669] mt-2 line-clamp-1">
                      {isPastToday ? '⚠️ Slot is closed for today' : slot.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {isSelectedToday && currentHour >= 20 && (
              <div className="p-3 bg-[#FFF8EB] border border-[#F4E1BA] rounded-xl text-xs text-[#8A6318] flex items-start space-x-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Evening notice: Only late evening or Midnight Celebration slots remain open for today. If you need early morning blooms, please choose <strong>Tomorrow</strong>.
                </span>
              </div>
            )}
          </div>
        )}

        {/* OPTION B: SPECIFIC EXACT TIME PICKER */}
        {isExactTimeMode && (
          <div className="p-5 bg-[#FAF4F2] rounded-2xl border border-[#EDE1DD] space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h5 className="font-serif text-sm font-bold text-[#2A1D20] flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-[#B45367]" />
                  <span>Specify Custom Target Delivery Time</span>
                </h5>
                <p className="text-xs text-[#7A6669] mt-0.5">
                  Our dedicated courier will schedule your delivery precisely around your chosen time (±15 min).
                </p>
              </div>

              <span className="text-xs font-bold text-[#8C3B4E] bg-white px-3 py-1 rounded-full border border-[#E8D9D5] shadow-2xs">
                {exactHour}:{exactMinute} {exactPeriod}
              </span>
            </div>

            {/* Interactive Time Selectors */}
            <div className="grid grid-cols-3 gap-3 max-w-sm">
              {/* Hour Selector */}
              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#69585B] mb-1">
                  Hour
                </label>
                <select
                  value={exactHour}
                  onChange={(e) => handleExactTimeUpdate(e.target.value, exactMinute, exactPeriod)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E0D2CE] text-sm font-semibold text-[#2D1F22] focus:ring-1 focus:ring-[#8C3B4E]"
                >
                  {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              {/* Minute Selector */}
              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#69585B] mb-1">
                  Minute
                </label>
                <select
                  value={exactMinute}
                  onChange={(e) => handleExactTimeUpdate(exactHour, e.target.value, exactPeriod)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E0D2CE] text-sm font-semibold text-[#2D1F22] focus:ring-1 focus:ring-[#8C3B4E]"
                >
                  {['00', '15', '30', '45', '59'].map((m) => (
                    <option key={m} value={m}>
                      :{m}
                    </option>
                  ))}
                </select>
              </div>

              {/* AM / PM Selector */}
              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#69585B] mb-1">
                  Period
                </label>
                <div className="flex rounded-xl bg-white border border-[#E0D2CE] p-1">
                  <button
                    type="button"
                    onClick={() => handleExactTimeUpdate(exactHour, exactMinute, 'AM')}
                    className={`flex-1 py-1 text-xs font-bold rounded-lg transition-colors ${
                      exactPeriod === 'AM'
                        ? 'bg-[#8C3B4E] text-white shadow-2xs'
                        : 'text-[#6D5A5D] hover:text-[#2E1F22]'
                    }`}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExactTimeUpdate(exactHour, exactMinute, 'PM')}
                    className={`flex-1 py-1 text-xs font-bold rounded-lg transition-colors ${
                      exactPeriod === 'PM'
                        ? 'bg-[#8C3B4E] text-white shadow-2xs'
                        : 'text-[#6D5A5D] hover:text-[#2E1F22]'
                    }`}
                  >
                    PM
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8A7678] mb-1.5">
                Popular Event Presets:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_EXACT_TIMES.map((preset) => {
                  const isMatch =
                    exactHour === preset.hour &&
                    exactMinute === preset.minute &&
                    exactPeriod === preset.period;

                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handleSelectPresetTime(preset)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        isMatch
                          ? 'bg-[#8C3B4E] text-white font-semibold shadow-2xs'
                          : 'bg-white hover:bg-[#FCECEE] text-[#5A494B] border border-[#E2D5D1]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {errorTime && (
          <p className="text-xs text-[#C05B6F] flex items-center space-x-1 mt-1">
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span>{errorTime}</span>
          </p>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. COMPLIMENTARY BOTANICAL CARD & OCCASION NOTE */}
      {/* ------------------------------------------------------------------ */}
      <div className="space-y-4 pt-4 border-t border-[#F2E7E4]">
        <div className="flex items-center space-x-2 text-[#8C3B4E]">
          <Gift className="w-4 h-4" />
          <h4 className="font-serif text-base font-semibold text-[#291B1E]">
            Complimentary Botanical Card & Special Request
          </h4>
        </div>

        {/* Occasion Chips */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#685759] mb-1.5">
            Select Card Occasion
          </label>
          <div className="flex flex-wrap gap-2">
            {OCCASIONS.map((occ) => {
              const isSelected = selectedOccasion === occ.id;
              return (
                <button
                  key={occ.id}
                  type="button"
                  onClick={() => {
                    setSelectedOccasion(occ.id);
                    notifyParent(
                      selectedDate,
                      selectedSlotId,
                      isExactTimeMode,
                      exactHour,
                      exactMinute,
                      exactPeriod,
                      occ.id,
                      giftCardNote,
                      senderName,
                      isAnonymous,
                      deliveryInstructions
                    );
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-[#8C3B4E] text-white font-semibold shadow-2xs'
                      : 'bg-[#FAF6F4] hover:bg-white text-[#524143] border border-[#E7D9D5]'
                  }`}
                >
                  <span>{occ.emoji}</span>
                  <span>{occ.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Handwritten Card Message Note */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label
              htmlFor="giftCardNote"
              className="block text-xs font-semibold uppercase tracking-wider text-[#4E3D40]"
            >
              Handwritten Card Message (Optional)
            </label>
            <span className="text-[11px] text-[#9A8688]">
              {giftCardNote.length}/300 characters
            </span>
          </div>
          <textarea
            id="giftCardNote"
            rows={3}
            maxLength={300}
            value={giftCardNote}
            onChange={(e) => {
              const val = e.target.value;
              setGiftCardNote(val);
              notifyParent(
                selectedDate,
                selectedSlotId,
                isExactTimeMode,
                exactHour,
                exactMinute,
                exactPeriod,
                selectedOccasion,
                val,
                senderName,
                isAnonymous,
                deliveryInstructions
              );
            }}
            placeholder="e.g., 'Happy 25th Anniversary to the love of my life! May our days continue to blossom with joy and sweetness. Always yours, Dev.'"
            className="w-full p-3.5 rounded-xl border border-[#E2D5D1] text-xs sm:text-sm text-[#3E2F32] bg-[#FDFBF9] placeholder:text-[#A89694] focus:outline-hidden focus:ring-1 focus:ring-[#8C3B4E]"
          />
        </div>

        {/* Sender Name & Secret Admirer anonymous toggle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="senderName"
              className="block text-xs font-semibold uppercase tracking-wider text-[#4E3D40] mb-1"
            >
              Card Signed From:
            </label>
            <input
              id="senderName"
              type="text"
              disabled={isAnonymous}
              value={isAnonymous ? 'Secret Admirer (Anonymous)' : senderName}
              onChange={(e) => {
                const val = e.target.value;
                setSenderName(val);
                notifyParent(
                  selectedDate,
                  selectedSlotId,
                  isExactTimeMode,
                  exactHour,
                  exactMinute,
                  exactPeriod,
                  selectedOccasion,
                  giftCardNote,
                  val,
                  isAnonymous,
                  deliveryInstructions
                );
              }}
              placeholder="e.g., Rahul & Family"
              className={`w-full px-3.5 py-2 rounded-xl border text-xs sm:text-sm ${
                isAnonymous
                  ? 'bg-[#F2ECE9] text-[#8C7678] border-[#E2D5D1] italic'
                  : 'bg-[#FDFBF9] text-[#3E2F32] border-[#E2D5D1]'
              } focus:outline-hidden focus:ring-1 focus:ring-[#8C3B4E]`}
            />
          </div>

          <div className="flex items-center space-x-2 pt-5">
            <input
              type="checkbox"
              id="isAnonymousCheckbox"
              checked={isAnonymous}
              onChange={(e) => {
                const checked = e.target.checked;
                setIsAnonymous(checked);
                notifyParent(
                  selectedDate,
                  selectedSlotId,
                  isExactTimeMode,
                  exactHour,
                  exactMinute,
                  exactPeriod,
                  selectedOccasion,
                  giftCardNote,
                  senderName,
                  checked,
                  deliveryInstructions
                );
              }}
              className="w-4 h-4 rounded-sm text-[#8C3B4E] focus:ring-[#8C3B4E] border-[#D0BFBD]"
            />
            <label htmlFor="isAnonymousCheckbox" className="text-xs text-[#524143] cursor-pointer">
              Send as <strong>Secret Admirer</strong> (Keep sender identity anonymous on the card)
            </label>
          </div>
        </div>

        {/* Rider delivery instructions */}
        <div>
          <label
            htmlFor="deliveryInstructions"
            className="block text-xs font-semibold uppercase tracking-wider text-[#4E3D40] mb-1"
          >
            Courier Driver Instructions (Optional)
          </label>
          <input
            id="deliveryInstructions"
            type="text"
            value={deliveryInstructions}
            onChange={(e) => {
              const val = e.target.value;
              setDeliveryInstructions(val);
              notifyParent(
                selectedDate,
                selectedSlotId,
                isExactTimeMode,
                exactHour,
                exactMinute,
                exactPeriod,
                selectedOccasion,
                giftCardNote,
                senderName,
                isAnonymous,
                val
              );
            }}
            placeholder="e.g., 'Ring doorbell twice', 'Leave at security gate if not answering', 'Keep surprise quiet'"
            className="w-full px-3.5 py-2 rounded-xl border border-[#E2D5D1] text-xs sm:text-sm text-[#3E2F32] bg-[#FDFBF9] placeholder:text-[#A89694] focus:outline-hidden focus:ring-1 focus:ring-[#8C3B4E]"
          />
        </div>
      </div>
    </div>
  );
};
