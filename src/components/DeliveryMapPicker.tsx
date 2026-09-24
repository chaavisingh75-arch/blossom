import React, { useEffect, useRef, useState, useCallback } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import { MapPin, Search, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface DeliveryLocation {
  lat: number;
  lng: number;
  formattedAddress: string;
  areaName: string;
  pincode?: string;
}

interface DeliveryMapPickerProps {
  selectedLocation: DeliveryLocation | null;
  onLocationSelect: (location: DeliveryLocation) => void;
  initialStreetArea?: string;
}

const GOOGLE_MAPS_API_KEY =
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyCDpkeiXc54ISC6qmx7Y0QsjrrTO0u3LPw';

// Jodhpur, Rajasthan coordinates
const JODHPUR_COORDINATES = { lat: 26.2856, lng: 73.0189 };

// Popular delivery areas in Jodhpur for quick one-click selection
const POPULAR_JODHPUR_AREAS = [
  { name: 'Sardarpura', lat: 26.2825, lng: 73.0125, pincode: '342003' },
  { name: 'Ratanada', lat: 26.2730, lng: 73.0375, pincode: '342011' },
  { name: 'Shastri Nagar', lat: 26.2690, lng: 73.0080, pincode: '342003' },
  { name: 'Paota', lat: 26.3010, lng: 73.0420, pincode: '342006' },
  { name: 'Pal Road', lat: 26.2550, lng: 72.9850, pincode: '342008' },
  { name: 'Air Force Area', lat: 26.2620, lng: 73.0530, pincode: '342011' },
  { name: 'Circuit House Road', lat: 26.2830, lng: 73.0360, pincode: '342006' },
];

export const DeliveryMapPicker: React.FC<DeliveryMapPickerProps> = ({
  selectedLocation,
  onLocationSelect,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerInstanceRef = useRef<google.maps.Marker | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Helper to reverse-geocode coordinates and invoke callback
  const handleCoordsSelected = useCallback(
    (lat: number, lng: number, fallbackName?: string) => {
      if (geocoderRef.current) {
        geocoderRef.current.geocode(
          { location: { lat, lng } },
          (results, status) => {
            if (status === 'OK' && results && results[0]) {
              const result = results[0];
              let pincode = '';
              let sublocality = '';

              for (const component of result.address_components) {
                if (component.types.includes('postal_code')) {
                  pincode = component.long_name;
                }
                if (
                  component.types.includes('sublocality') ||
                  component.types.includes('sublocality_level_1') ||
                  component.types.includes('neighborhood')
                ) {
                  sublocality = component.long_name;
                }
              }

              const formatted = result.formatted_address;
              const area = sublocality || fallbackName || 'Jodhpur Area';

              onLocationSelect({
                lat,
                lng,
                formattedAddress: formatted,
                areaName: area,
                pincode,
              });
            } else {
              onLocationSelect({
                lat,
                lng,
                formattedAddress: `${fallbackName || 'Selected Location'}, Jodhpur, Rajasthan`,
                areaName: fallbackName || 'Jodhpur Area',
                pincode: '342001',
              });
            }
          }
        );
      } else {
        onLocationSelect({
          lat,
          lng,
          formattedAddress: `${fallbackName || 'Selected Location'}, Jodhpur, Rajasthan`,
          areaName: fallbackName || 'Jodhpur Area',
          pincode: '342001',
        });
      }
    },
    [onLocationSelect]
  );

  // Initialize Google Maps using modern importLibrary API
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      try {
        setOptions({
          key: GOOGLE_MAPS_API_KEY,
          v: 'weekly',
        });

        const mapsLib = (await importLibrary('maps')) as google.maps.MapsLibrary;
        const geocodingLib = (await importLibrary('geocoding')) as google.maps.GeocodingLibrary;
        const markerLib = (await importLibrary('marker')) as google.maps.MarkerLibrary;

        if (!isMounted || !mapContainerRef.current) return;

        const initialLat = selectedLocation ? selectedLocation.lat : JODHPUR_COORDINATES.lat;
        const initialLng = selectedLocation ? selectedLocation.lng : JODHPUR_COORDINATES.lng;

        // Create Google Map centered at Jodhpur
        const map = new mapsLib.Map(mapContainerRef.current, {
          center: { lat: initialLat, lng: initialLng },
          zoom: 14,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
        });

        mapInstanceRef.current = map;
        geocoderRef.current = new geocodingLib.Geocoder();

        // Create floral pin marker
        const marker = new markerLib.Marker({
          position: { lat: initialLat, lng: initialLng },
          map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          title: 'Blossom Flower Delivery Location',
          icon: {
            path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
            fillColor: '#8C3B4E',
            fillOpacity: 1,
            strokeWeight: 1.5,
            strokeColor: '#FFFFFF',
            scale: 2,
            anchor: new google.maps.Point(12, 22),
          },
        });

        markerInstanceRef.current = marker;

        // Map Click Listener to re-position pin
        map.addListener('click', (event: google.maps.MapMouseEvent) => {
          if (event.latLng) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            marker.setPosition({ lat, lng });
            handleCoordsSelected(lat, lng);
          }
        });

        // Marker Drag Listener
        marker.addListener('dragend', (event: google.maps.MapMouseEvent) => {
          if (event.latLng) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            handleCoordsSelected(lat, lng);
          }
        });

        setIsLoading(false);

        // If no location was selected yet, set initial default Jodhpur location
        if (!selectedLocation) {
          handleCoordsSelected(JODHPUR_COORDINATES.lat, JODHPUR_COORDINATES.lng, 'Sardarpura, Jodhpur');
        }
      } catch (err) {
        console.warn('Google Maps interactive load notice:', err);
        if (isMounted) {
          setLoadError(
            'Interactive map is initializing. You can pick your Jodhpur neighborhood below or type your full address directly.'
          );
          setIsLoading(false);
          if (!selectedLocation) {
            onLocationSelect({
              lat: JODHPUR_COORDINATES.lat,
              lng: JODHPUR_COORDINATES.lng,
              formattedAddress: 'Sardarpura, Jodhpur, Rajasthan 342003',
              areaName: 'Sardarpura',
              pincode: '342003',
            });
          }
        }
      }
    }

    initMap();

    return () => {
      isMounted = false;
    };
  }, []);

  // Update marker position when selectedLocation changes externally
  useEffect(() => {
    if (selectedLocation && markerInstanceRef.current && mapInstanceRef.current) {
      const pos = { lat: selectedLocation.lat, lng: selectedLocation.lng };
      markerInstanceRef.current.setPosition(pos);
      mapInstanceRef.current.panTo(pos);
    }
  }, [selectedLocation?.lat, selectedLocation?.lng]);

  // Handle Search Submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || !geocoderRef.current || !mapInstanceRef.current) return;

    setIsSearching(true);
    const query = searchQuery.includes('Jodhpur') ? searchQuery : `${searchQuery}, Jodhpur, Rajasthan`;

    geocoderRef.current.geocode(
      {
        address: query,
        bounds: {
          north: 26.45,
          south: 26.15,
          east: 73.2,
          west: 72.85,
        },
      },
      (results, status) => {
        setIsSearching(false);
        if (status === 'OK' && results && results[0]) {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();

          mapInstanceRef.current?.panTo({ lat, lng });
          mapInstanceRef.current?.setZoom(15);
          markerInstanceRef.current?.setPosition({ lat, lng });

          handleCoordsSelected(lat, lng, searchQuery);
        } else {
          alert(`Could not locate "${searchQuery}" in Jodhpur. Please tap directly on the map or pick an area below.`);
        }
      }
    );
  };

  // Select a preset area
  const handleSelectArea = (area: (typeof POPULAR_JODHPUR_AREAS)[0]) => {
    if (mapInstanceRef.current && markerInstanceRef.current) {
      mapInstanceRef.current.panTo({ lat: area.lat, lng: area.lng });
      mapInstanceRef.current.setZoom(15);
      markerInstanceRef.current.setPosition({ lat: area.lat, lng: area.lng });
    }
    handleCoordsSelected(area.lat, area.lng, area.name);
  };

  return (
    <div className="bg-[#FAF6F4] rounded-2xl p-4 sm:p-6 border border-[#EBE0DC] shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-[#FCECEE] flex items-center justify-center text-[#8C3B4E]">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#2D2123]">
              Select Delivery Location on Map
            </h4>
            <p className="text-xs text-[#7A6A6C]">
              Boutique delivery service across Jodhpur, Rajasthan
            </p>
          </div>
        </div>

        <span className="text-[11px] font-medium text-[#8C3B4E] bg-[#FCECEE] px-2.5 py-1 rounded-full w-fit">
          📍 Tap map or drag pin to adjust
        </span>
      </div>

      {/* Address Search Form */}
      <form onSubmit={handleSearch} className="relative mb-3.5">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#988280]">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Jodhpur street or area (e.g., Sardarpura B Road, Ratanada, Pal Road)..."
          className="w-full pl-9 pr-24 py-2 text-xs sm:text-sm rounded-xl border border-[#E2D5D1] bg-white text-[#3E2F32] placeholder:text-[#A89694] focus:outline-hidden focus:ring-1 focus:ring-[#8C3B4E]"
        />
        <button
          type="submit"
          disabled={isSearching}
          className="absolute right-1 top-1 bottom-1 px-3 rounded-lg bg-[#8C3B4E] text-white text-xs font-medium hover:bg-[#732F3F] transition-colors flex items-center space-x-1"
        >
          {isSearching ? <span>Locating...</span> : <span>Find</span>}
        </button>
      </form>

      {/* Popular Jodhpur Area Quick Select Chips */}
      <div className="mb-3">
        <div className="text-[11px] font-medium text-[#8E7978] uppercase tracking-wider mb-1.5 flex items-center space-x-1">
          <Sparkles className="w-3 h-3 text-[#B45367]" />
          <span>Quick Select Jodhpur Neighborhoods:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR_JODHPUR_AREAS.map((area) => {
            const isMatch =
              selectedLocation &&
              Math.abs(selectedLocation.lat - area.lat) < 0.005 &&
              Math.abs(selectedLocation.lng - area.lng) < 0.005;

            return (
              <button
                key={area.name}
                type="button"
                onClick={() => handleSelectArea(area)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  isMatch
                    ? 'bg-[#8C3B4E] text-white shadow-xs font-semibold'
                    : 'bg-white hover:bg-[#F9ECEF] text-[#5C4D4E] border border-[#E6D7D3]'
                }`}
              >
                {area.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Map Box */}
      <div className="relative rounded-xl overflow-hidden border border-[#E5D7D3] bg-[#EAE3DE] h-64 sm:h-72 w-full shadow-inner">
        <div ref={mapContainerRef} className="w-full h-full" />

        {isLoading && (
          <div className="absolute inset-0 bg-[#FAF4F2]/90 flex flex-col items-center justify-center p-4">
            <div className="w-8 h-8 rounded-full border-2 border-[#8C3B4E] border-t-transparent animate-spin mb-2" />
            <p className="text-xs text-[#7B6765]">Loading interactive Jodhpur delivery map...</p>
          </div>
        )}

        {loadError && (
          <div className="absolute inset-0 bg-[#FAF4F2]/95 flex flex-col items-center justify-center p-6 text-center">
            <AlertCircle className="w-6 h-6 text-[#C05B6F] mb-2" />
            <p className="text-xs text-[#6B5A5C] max-w-sm mb-3">{loadError}</p>
            <button
              type="button"
              onClick={() => handleSelectArea(POPULAR_JODHPUR_AREAS[0])}
              className="px-4 py-2 rounded-lg bg-[#8C3B4E] text-white text-xs font-medium"
            >
              Select Sardarpura, Jodhpur
            </button>
          </div>
        )}
      </div>

      {/* Selected Location Card Display */}
      {selectedLocation && (
        <div className="mt-3.5 p-3.5 bg-white rounded-xl border border-[#E9DDD9] flex items-start space-x-3 shadow-2xs">
          <div className="w-7 h-7 rounded-full bg-[#FCECEE] flex items-center justify-center shrink-0 text-[#8C3B4E] mt-0.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C3B4E]">
                Pinpoint Delivery Address
              </span>
              <span className="text-[10px] text-[#A28E8C] font-mono">
                {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#2E1F22] truncate">
              {selectedLocation.areaName}
            </p>
            <p className="text-xs text-[#715F61] line-clamp-1">
              {selectedLocation.formattedAddress}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
