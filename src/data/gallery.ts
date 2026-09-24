import { GalleryItem } from '../types';

// Real floral boutique, floral design, wedding, and romantic DSLR photography
import blossomExterior from '../assets/images/blossom_exterior_1790099414638.jpg';
import blossomInterior from '../assets/images/blossom_interior_1790099402755.jpg';
import floristArranging from '../assets/images/florist_arranging_1790099432954.jpg';
import flowerShelves from '../assets/images/gallery_flower_shelves_1790140323217.jpg';
import boutiqueCounter from '../assets/images/gallery_boutique_counter_1790140340721.jpg';
import customerBouquet from '../assets/images/customer_bouquet_1790099452312.jpg';

import rosePhoto from '../assets/images/flower_rose_1790136029005.jpg';
import peonyPhoto from '../assets/images/flower_peony_1790135911997.jpg';
import carnationPhoto from '../assets/images/flower_carnation_1790135924633.jpg';
import lavenderPhoto from '../assets/images/flower_lavender_1790136040524.jpg';
import daffodilPhoto from '../assets/images/flower_daffodil_1790136006480.jpg';
import irisPhoto from '../assets/images/flower_iris_1790135949389.jpg';
import gerberaPhoto from '../assets/images/flower_gerbera_1790135970190.jpg';
import babysBreathPhoto from '../assets/images/flower_babys_breath_1790135937155.jpg';
import tulipPhoto from '../assets/images/flower_tulip_1790136051748.jpg';
import giftBoxPhoto from '../assets/images/gallery_gift_box_1790140307216.jpg';

import coupleGiftingPhoto from '../assets/images/gallery_couple_gifting_1790140275830.jpg';
import romanticRosesPhoto from '../assets/images/gallery_romantic_roses_1790140292078.jpg';
import romanticCandlelightPhoto from '../assets/images/gallery_romantic_candlelight_1790140398767.jpg';
import romanticCompositionPhoto from '../assets/images/gallery_romantic_composition_1790140375073.jpg';

import bridalBouquetPhoto from '../assets/images/gallery_bridal_bouquet_1790140242185.jpg';
import weddingTablePhoto from '../assets/images/gallery_wedding_table_1790140223854.jpg';
import weddingArchPhoto from '../assets/images/gallery_wedding_arch_1790140255742.jpg';
import bridesmaidsPhoto from '../assets/images/gallery_bridesmaids_flowers_1790140355664.jpg';
import weddingDecorPhoto from '../assets/images/gallery_wedding_decor_1790140411001.jpg';

export const GALLERY_ITEMS: GalleryItem[] = [
  // --- Boutique & Interior ---
  {
    id: 'gal-boutique-1',
    title: 'Blossom Boutique Storefront',
    category: 'Boutique & Interior',
    description: 'Charming exterior facade with the handcrafted Blossom Flower Boutique sign and blooming entrance planters welcoming guests.',
    image: blossomExterior,
    aspect: 'wide'
  },
  {
    id: 'gal-boutique-2',
    title: 'Sunlit Boutique Interior',
    category: 'Boutique & Interior',
    description: 'Inside our boutique with curated flower buckets, artisan wrapping station, and warm ambient sunlight.',
    image: blossomInterior,
    aspect: 'wide'
  },
  {
    id: 'gal-boutique-3',
    title: 'Florist Arranging Fresh Stems',
    category: 'Boutique & Interior',
    description: 'Our florist handcrafting custom bouquet stems with precision botanical shears and natural flair.',
    image: floristArranging,
    aspect: 'tall'
  },
  {
    id: 'gal-boutique-4',
    title: 'Rustic Wooden Flower Display Shelves',
    category: 'Boutique & Interior',
    description: 'Tiered wooden shelves and vintage zinc buckets filled with freshly cut lavender, sunflowers, and baby’s breath.',
    image: flowerShelves,
    aspect: 'tall'
  },
  {
    id: 'gal-boutique-5',
    title: 'Artisanal Flower Greeting Counter',
    category: 'Boutique & Interior',
    description: 'Our boutique greeting counter with freshly wrapped bouquets in eco-friendly paper and satin ribbons.',
    image: boutiqueCounter,
    aspect: 'wide'
  },

  // --- Bouquets & Gifts ---
  {
    id: 'gal-bouquet-1',
    title: 'Opulent Peony Bouquet',
    category: 'Bouquets & Gifts',
    description: 'Ruffled blush pink Sarah Bernhardt peonies hand-tied with soft trailing silk ribbon.',
    image: peonyPhoto,
    aspect: 'tall'
  },
  {
    id: 'gal-bouquet-2',
    title: 'Luxury Floral Gift Box',
    category: 'Bouquets & Gifts',
    description: 'Artisan round gift box filled with fresh pastel roses, carnations, hydrangeas, and trailing satin ribbons.',
    image: giftBoxPhoto,
    aspect: 'square'
  },
  {
    id: 'gal-bouquet-3',
    title: 'Classic Dutch Tulip Posy',
    category: 'Bouquets & Gifts',
    description: 'Graceful blush coral and white tulips freshly cut from partner greenhouses, tied with botanical twine.',
    image: tulipPhoto,
    aspect: 'tall'
  },
  {
    id: 'gal-bouquet-4',
    title: 'Provence Lavender Bundle',
    category: 'Bouquets & Gifts',
    description: 'Freshly bundled French lavender sprigs known for their calming fragrance and long-lasting dusky lilac color.',
    image: lavenderPhoto,
    aspect: 'tall'
  },
  {
    id: 'gal-bouquet-5',
    title: 'Royal Blue & Violet Iris',
    category: 'Bouquets & Gifts',
    description: 'Sculptural bearded iris stems with deep royal blue and violet petals accented by golden centers.',
    image: irisPhoto,
    aspect: 'tall'
  },
  {
    id: 'gal-bouquet-6',
    title: 'Sunny Spring Daffodils',
    category: 'Bouquets & Gifts',
    description: 'Vibrant golden trumpet daffodils bringing cheerful springtime optimism and brightness.',
    image: daffodilPhoto,
    aspect: 'square'
  },
  {
    id: 'gal-bouquet-7',
    title: 'Airy Baby’s Breath Cloud',
    category: 'Bouquets & Gifts',
    description: 'Delicate starry white Gypsophila blossoms adding ethereal volume to gift wraps and bespoke bouquets.',
    image: babysBreathPhoto,
    aspect: 'tall'
  },
  {
    id: 'gal-bouquet-8',
    title: 'Vibrant Gerbera Daisy Bunch',
    category: 'Bouquets & Gifts',
    description: 'Cheerful coral-pink and sunshine gerbera daisies arranged for birthdays and celebration gifts.',
    image: gerberaPhoto,
    aspect: 'square'
  },
  {
    id: 'gal-bouquet-9',
    title: 'Antique Pink Carnations',
    category: 'Bouquets & Gifts',
    description: 'Long-lasting ruffled carnations in delicate antique rose and powder cream hues.',
    image: carnationPhoto,
    aspect: 'tall'
  },
  {
    id: 'gal-bouquet-10',
    title: 'Happy Customer with Blossom Bouquet',
    category: 'Bouquets & Gifts',
    description: 'Stepping into the morning sunshine holding a freshly crafted custom Blossom bouquet wrapped in craft paper.',
    image: customerBouquet,
    aspect: 'square'
  },

  // --- Romantic Moments ---
  {
    id: 'gal-romantic-1',
    title: 'Surprise Bouquet for Someone Special',
    category: 'Romantic Moments',
    description: 'A heartfelt romantic moment as a partner surprises their beloved with a lush hand-tied bouquet of garden blooms.',
    image: coupleGiftingPhoto,
    aspect: 'square'
  },
  {
    id: 'gal-romantic-2',
    title: 'Intimate Candlelight Dinner Roses',
    category: 'Romantic Moments',
    description: 'Velvety crimson garden roses arranged with flickering taper candles for an anniversary celebration.',
    image: romanticRosesPhoto,
    aspect: 'wide'
  },
  {
    id: 'gal-romantic-3',
    title: 'Evening Candlelight & Red Rose Surprise',
    category: 'Romantic Moments',
    description: 'Romantic evening arrangement with deep red roses, crystal glassware, and warm flickering wax candles.',
    image: romanticCandlelightPhoto,
    aspect: 'tall'
  },
  {
    id: 'gal-romantic-4',
    title: 'Romantic Love Note & Floral Compote',
    category: 'Romantic Moments',
    description: 'Delicate pink and crimson roses in a vintage fluted bowl paired with a handwritten love message.',
    image: romanticCompositionPhoto,
    aspect: 'tall'
  },
  {
    id: 'gal-romantic-5',
    title: 'Velvet Damask Garden Roses',
    category: 'Romantic Moments',
    description: 'Deep crimson garden roses at peak fragrance and texture, symbolic of timeless love and passion.',
    image: rosePhoto,
    aspect: 'square'
  },

  // --- Weddings & Events ---
  {
    id: 'gal-wedding-1',
    title: 'Timeless Bridal Bouquet',
    category: 'Weddings & Events',
    description: 'Lush bridal bouquet handcrafted with ivory English garden roses, blush peonies, sweet peas, and trailing silk ribbons.',
    image: bridalBouquetPhoto,
    aspect: 'tall'
  },
  {
    id: 'gal-wedding-2',
    title: 'Reception Dinner Table Floral Runner',
    category: 'Weddings & Events',
    description: 'Low romantic table runner featuring garden roses, ranunculus, silver dollar eucalyptus, and brass taper candlesticks.',
    image: weddingTablePhoto,
    aspect: 'wide'
  },
  {
    id: 'gal-wedding-3',
    title: 'Ceremony Floral Entrance Archway',
    category: 'Weddings & Events',
    description: 'Breathtaking ceremony arch layered with blooming garden roses, hydrangeas, baby’s breath, and natural greenery.',
    image: weddingArchPhoto,
    aspect: 'tall'
  },
  {
    id: 'gal-wedding-4',
    title: 'Bridesmaids Pastel Posy Bouquets',
    category: 'Weddings & Events',
    description: 'Complementary garden rose and lisianthus bridesmaid posies tailored to wedding party color palettes.',
    image: bridesmaidsPhoto,
    aspect: 'wide'
  },
  {
    id: 'gal-wedding-5',
    title: 'Grand Celebration Entrance Installation',
    category: 'Weddings & Events',
    description: 'Regal floral urn pedestals with cascading white hydrangeas and cream roses framing the event entrance.',
    image: weddingDecorPhoto,
    aspect: 'tall'
  }
];
