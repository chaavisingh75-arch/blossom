import React from 'react';
import { Page } from '../types';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavClick = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="boutique-footer" className="bg-[#2D2325] text-[#EDE4E2] pt-16 pb-12 relative overflow-hidden">
      {/* Decorative floral watermark background */}
      <div 
        className="absolute -right-16 -bottom-16 w-80 h-80 opacity-5 pointer-events-none select-none text-9xl font-serif"
        aria-hidden="true"
      >
        🌸
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-[#4A3C3E]">
          {/* Brand & Tagline */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🌸</span>
              <span className="font-serif text-3xl font-medium tracking-wide text-[#F8E2E5]">
                Blossom
              </span>
            </div>
            <p className="text-[#DFBA73] font-serif italic text-lg tracking-wide">
              “Where every bloom tells a story.”
            </p>
            <p className="text-sm text-[#C9B7B5] leading-relaxed pr-4">
              An artisan flower boutique celebrating life’s quiet romances, festive celebrations, and heartfelt expressions with fresh seasonal flowers hand-tied daily.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                id="footer-social-instagram"
                href="https://instagram.com/blossom.boutique"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#3D3033] hover:bg-[#B45367] flex items-center justify-center text-[#F5DFE3] transition-colors duration-200"
                aria-label="Instagram @blossom.boutique"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                id="footer-social-facebook"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#3D3033] hover:bg-[#B45367] flex items-center justify-center text-[#F5DFE3] transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                id="footer-social-twitter"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#3D3033] hover:bg-[#B45367] flex items-center justify-center text-[#F5DFE3] transition-colors duration-200"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Page Links */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-serif text-lg font-medium text-[#F4DCE1] tracking-wider uppercase text-xs">
              Explore Blossom
            </h4>
            <div className="flex flex-col space-y-2.5 pt-1">
              {[
                { label: 'Home', page: 'home' as Page },
                { label: 'About Us', page: 'about' as Page },
                { label: 'Our Collection', page: 'collection' as Page },
                { label: 'Flower Boutique', page: 'boutique' as Page },
                { label: 'Gallery', page: 'gallery' as Page },
                { label: 'Contact Us', page: 'contact' as Page },
              ].map((link) => (
                <button
                  key={link.page}
                  id={`footer-nav-${link.page}`}
                  onClick={() => handleNavClick(link.page)}
                  className="text-left text-sm text-[#C4B2B0] hover:text-[#F8D7DA] transition-colors flex items-center space-x-1.5"
                >
                  <span className="text-xs text-[#9E8387]">✦</span>
                  <span>{link.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Boutique Opening Hours */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-serif text-lg font-medium text-[#F4DCE1] tracking-wider uppercase text-xs">
              Boutique Hours
            </h4>
            <div className="text-sm text-[#C4B2B0] space-y-2 pt-1">
              <div className="flex justify-between border-b border-[#3D3033] pb-1.5">
                <span>Monday – Friday:</span>
                <span className="text-[#EDE4E2] font-medium">8:00 AM – 8:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-[#3D3033] pb-1.5">
                <span>Saturday:</span>
                <span className="text-[#EDE4E2] font-medium">9:00 AM – 8:30 PM</span>
              </div>
              <div className="flex justify-between border-b border-[#3D3033] pb-1.5">
                <span>Sunday:</span>
                <span className="text-[#EDE4E2] font-medium">9:30 AM – 6:00 PM</span>
              </div>
              <p className="text-xs text-[#9E8387] pt-1">
                Same-day boutique deliveries available across Jodhpur for orders placed before 3:00 PM.
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-serif text-lg font-medium text-[#F4DCE1] tracking-wider uppercase text-xs">
              Get In Touch
            </h4>
            <div className="flex flex-col space-y-3 text-sm text-[#C4B2B0] pt-1">
              <a
                id="footer-contact-email"
                href="mailto:hello@blossomboutique.com"
                className="flex items-start space-x-2.5 hover:text-[#F8D7DA] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#DFBA73] mt-0.5 shrink-0" />
                <span className="break-all">hello@blossomboutique.com</span>
              </a>

              <a
                id="footer-contact-phone"
                href="tel:+91XXXXXXXXXX"
                className="flex items-center space-x-2.5 hover:text-[#F8D7DA] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#DFBA73] shrink-0" />
                <span>+91 XXXXX XXXXX</span>
              </a>

              <a
                id="footer-contact-instagram"
                href="https://instagram.com/blossom.boutique"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2.5 hover:text-[#F8D7DA] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#DFBA73] shrink-0" />
                <span>@blossom.boutique</span>
              </a>

              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#DFBA73] mt-0.5 shrink-0" />
                <span>Your Shop Address, Jodhpur, Rajasthan, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9E8785] gap-4">
          <p>© 2026 Blossom Flower Boutique. All Rights Reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Handcrafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#B45367] fill-[#B45367] inline" />
            <span>in Jodhpur, Rajasthan</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
