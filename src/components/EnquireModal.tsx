import React, { useState } from 'react';
import { Flower } from '../types';
import { X, Send, CheckCircle2, Sparkles } from 'lucide-react';

interface EnquireModalProps {
  flower: Flower | null;
  onClose: () => void;
}

export const EnquireModal: React.FC<EnquireModalProps> = ({ flower, onClose }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [occasion, setOccasion] = useState('Birthday / Anniversary');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!flower) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      setError('Please provide your name and contact details.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-w-lg w-full bg-[#FCF9F6] rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#EDE0DC]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#7E6C6B] hover:text-[#3E2F32] hover:bg-[#F2E5E2] rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#EBF3EC] text-[#5D7052] flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#3E2F32]">
              Inquiry Received with Warmth!
            </h3>
            <p className="text-sm text-[#5D4E50] max-w-sm mx-auto leading-relaxed">
              Thank you, <strong className="text-[#3E2F32]">{name}</strong>. Our florist will get in touch via <strong className="text-[#3E2F32]">{contact}</strong> regarding your bespoke {flower.name} arrangement.
            </p>
            <div className="p-3 bg-[#F9ECEF] rounded-xl text-xs text-[#8C3B4E] italic font-serif">
              “{flower.message}”
            </div>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#8C3B4E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#722F3E] transition-colors"
            >
              Back to Boutique
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={flower.image}
                alt={flower.name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-xl object-cover border border-[#E8DCD7] shadow-xs"
              />
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C3B4E] flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-[#B45367]" />
                  <span>Flower Inquiry</span>
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#3E2F32]">
                  {flower.name}
                </h3>
                <p className="text-xs text-[#8E7978]">
                  Symbolizes {flower.symbolizes}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#6A5A5C] mb-5 leading-relaxed bg-[#FAF5F3] p-3 rounded-xl border border-[#EDE0DC]">
              Our florists arrange each bouquet with freshly arrived stems. Tell us what you have in mind!
            </p>

            {error && (
              <div className="mb-4 text-xs text-rose-700 bg-rose-50 border border-rose-200 p-2.5 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5D4E50] mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Clara Sharma"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#DED0CC] bg-white focus:outline-hidden focus:ring-1 focus:ring-[#8C3B4E] text-[#3E2F32]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5D4E50] mb-1">
                  Phone Number or Email *
                </label>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="+91 98765 43210 or clara@example.com"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#DED0CC] bg-white focus:outline-hidden focus:ring-1 focus:ring-[#8C3B4E] text-[#3E2F32]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5D4E50] mb-1">
                  Occasion / Arrangement Style
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#DED0CC] bg-white focus:outline-hidden focus:ring-1 focus:ring-[#8C3B4E] text-[#3E2F32]"
                >
                  <option>Birthday / Anniversary</option>
                  <option>Romantic Surprise</option>
                  <option>Get Well Soon / Sympathy</option>
                  <option>New Beginnings / Housewarming</option>
                  <option>Just Because / Self-Care</option>
                  <option>Wedding or Event Decor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5D4E50] mb-1">
                  Special Notes or Desired Stems
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={2}
                  placeholder={`e.g. "Looking for 12 stems wrapped in blush linen with greeting card"`}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#DED0CC] bg-white focus:outline-hidden focus:ring-1 focus:ring-[#8C3B4E] text-[#3E2F32]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#8C3B4E] hover:bg-[#722F3E] text-white text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center space-x-2 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
