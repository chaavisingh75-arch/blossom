import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  MessageCircle,
  Flower2,
  Store
} from 'lucide-react';
import { SafeImage } from '../components/SafeImage';

// Real boutique assets
import blossomInterior from '../assets/images/blossom_interior_1790099402755.jpg';
import blossomExterior from '../assets/images/blossom_exterior_1790099414638.jpg';

interface ContactPageProps {
  initialMessage?: string;
  onClearInitialMessage?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  initialMessage = '',
  onClearInitialMessage,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Bespoke Bouquet Arrangement',
    message: initialMessage || '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialMessage) {
      setFormData((prev) => ({ ...prev, message: initialMessage }));
    }
  }, [initialMessage]);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Please provide your contact phone number.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please tell us what floral arrangement or question you have.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    if (onClearInitialMessage) onClearInitialMessage();
  };

  return (
    <div className="pt-24 pb-24 overflow-hidden">
      {/* Page Header */}
      <section id="contact-header" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#FCECEE] text-[#8C3B4E] border border-[#F2CAD1] text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#B45367]" />
          <span>Connect with Our Florists</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#2E2123] tracking-tight mb-4">
          Contact <span className="italic font-normal text-[#B45367]">Blossom</span>
        </h1>
        <p className="text-base sm:text-lg text-[#615052] font-light max-w-2xl mx-auto leading-relaxed">
          “Have a special moment in mind? Let’s make it bloom.”
        </p>
      </section>

      {/* Main Two-Column Layout: Left = Contact Info + Form, Right = Beautiful Blossom Boutique Visual */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (7 cols): Contact Details + Interactive Form */}
          <div className="lg:col-span-7 space-y-8">
            {/* Quick Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href="mailto:hello@blossomboutique.com"
                className="bg-white p-5 rounded-2xl border border-[#EDE0DC] shadow-2xs hover:shadow-md hover:border-[#D98A98] transition-all flex flex-col space-y-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FCECEE] flex items-center justify-center text-[#8C3B4E] group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A7879]">Email Us</span>
                <span className="text-xs font-medium text-[#2E2123] group-hover:text-[#8C3B4E] transition-colors break-all">
                  hello@blossomboutique.com
                </span>
              </a>

              <a
                href="tel:+919876543210"
                className="bg-white p-5 rounded-2xl border border-[#EDE0DC] shadow-2xs hover:shadow-md hover:border-[#D98A98] transition-all flex flex-col space-y-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FCECEE] flex items-center justify-center text-[#8C3B4E] group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A7879]">Call Studio</span>
                <span className="text-xs font-medium text-[#2E2123] group-hover:text-[#8C3B4E] transition-colors">
                  +91 XXXXX XXXXX
                </span>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-5 rounded-2xl border border-[#EDE0DC] shadow-2xs hover:shadow-md hover:border-[#D98A98] transition-all flex flex-col space-y-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FCECEE] flex items-center justify-center text-[#8C3B4E] group-hover:scale-105 transition-transform">
                  <Instagram className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A7879]">Instagram</span>
                <span className="text-xs font-medium text-[#2E2123] group-hover:text-[#8C3B4E] transition-colors">
                  @blossom.boutique
                </span>
              </a>
            </div>

            {/* Form Container */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EFE4E0] shadow-xs">
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8C3B4E] block mb-1">
                  Custom Orders & Questions
                </span>
                <h2 className="font-serif text-3xl font-medium text-[#2E2123]">
                  Send a Message to Our Florists
                </h2>
                <p className="text-xs sm:text-sm text-[#735F61] mt-1 font-light">
                  Fill in your details below and our team will get in touch with you promptly.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-[#F7FBF7] border border-[#CDE5CF] text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#E5F5E7] text-[#34763A] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-[#224827]">
                    Thank You for Reaching Out!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4E6B52] max-w-md mx-auto leading-relaxed">
                    Your inquiry has been received by our floral atelier. We are reviewing your note and will contact you via email or phone within 2 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        service: 'Bespoke Bouquet Arrangement',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#8C3B4E] text-white text-xs font-medium tracking-wide uppercase"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-[#574447] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Eleanor Vance"
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-[#3E2F32] bg-[#FDFBF9] focus:outline-hidden focus:ring-1 focus:ring-[#8C3B4E] ${
                        errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-[#E2D5D0]'
                      }`}
                    />
                    {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-[#574447] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="eleanor@example.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#3E2F32] bg-[#FDFBF9] focus:outline-hidden focus:ring-1 focus:ring-[#8C3B4E] ${
                          errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-[#E2D5D0]'
                        }`}
                      />
                      {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#574447] mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#3E2F32] bg-[#FDFBF9] focus:outline-hidden focus:ring-1 focus:ring-[#8C3B4E] ${
                          errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-[#E2D5D0]'
                        }`}
                      />
                      {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label htmlFor="contact-service" className="block text-xs font-semibold uppercase tracking-wider text-[#574447] mb-1.5">
                      What can we arrange for you?
                    </label>
                    <select
                      id="contact-service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E2D5D0] text-sm text-[#3E2F32] bg-[#FDFBF9] focus:outline-hidden focus:ring-1 focus:ring-[#8C3B4E]"
                    >
                      <option>Bespoke Bouquet Arrangement</option>
                      <option>Romantic & Anniversary Surprise</option>
                      <option>Wedding & Reception Florals</option>
                      <option>Corporate & Private Event Styling</option>
                      <option>Subscription / Weekly Home Florals</option>
                      <option>General Inquiry / Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-[#574447] mb-1.5">
                      Your Message / Arrangement Details *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your flower preferences, preferred delivery date, greeting card text, or special moments..."
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-[#3E2F32] bg-[#FDFBF9] focus:outline-hidden focus:ring-1 focus:ring-[#8C3B4E] ${
                        errors.message ? 'border-rose-400 bg-rose-50/30' : 'border-[#E2D5D0]'
                      }`}
                    />
                    {errors.message && <p className="text-xs text-rose-600 mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl bg-[#8C3B4E] hover:bg-[#722F3E] text-white font-medium text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Blossom</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column (5 cols): Large Boutique Visuals & Boutique Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Large Boutique Photograph: Cozy flower shop interior with fresh bouquets */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-white group">
              <div className="relative aspect-4/3 overflow-hidden">
                <SafeImage
                  src={blossomInterior}
                  alt="Inside Blossom Flower Boutique with fresh bouquets, roses and BLOSSOM sign"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#DFBA73] block mb-1">
                    Visit Our Studio
                  </span>
                  <p className="font-serif text-xl font-normal leading-snug">
                    Step inside our fragrant Jodhpur sanctuary
                  </p>
                </div>
              </div>
            </div>

            {/* Storefront Thumbnail & Location Details */}
            <div className="bg-[#FAF4F2] rounded-3xl p-6 sm:p-8 border border-[#EDE0DC] space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-[#FCECEE] flex items-center justify-center text-[#8C3B4E] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-semibold text-[#2E2123]">
                    Boutique Location
                  </h4>
                  <p className="text-xs sm:text-sm text-[#665457] mt-1 font-light leading-relaxed">
                    Heritage Floral District, Near Old City Fort Road, Jodhpur, Rajasthan, India
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-[#FCECEE] flex items-center justify-center text-[#8C3B4E] shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-semibold text-[#2E2123]">
                    Studio Opening Hours
                  </h4>
                  <div className="text-xs text-[#665457] mt-1 space-y-1">
                    <p><strong>Monday – Saturday:</strong> 9:00 AM – 8:00 PM</p>
                    <p><strong>Sunday:</strong> 10:00 AM – 6:00 PM</p>
                    <p className="text-[11px] text-[#8C3B4E] italic font-serif">
                      * Same-day delivery orders accepted until 4:00 PM daily
                    </p>
                  </div>
                </div>
              </div>

              {/* Storefront mini preview */}
              <div className="rounded-2xl overflow-hidden border border-[#E8DAD5] aspect-16/9 relative group">
                <SafeImage
                  src={blossomExterior}
                  alt="Blossom Flower Boutique exterior entrance"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-3 text-white">
                  <span className="text-[11px] font-serif italic">
                    Blossom Storefront • Heritage District
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
