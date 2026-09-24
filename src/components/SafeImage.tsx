import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  secondaryFallbackSrc?: string;
  imgClassName?: string;
}

const DEFAULT_FALLBACK =
  'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=900&q=80';

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallbackSrc = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80',
  secondaryFallbackSrc = DEFAULT_FALLBACK,
  alt = 'Blossom flower boutique photograph',
  className = '',
  imgClassName = '',
  ...rest
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  // Sync if prop changes
  React.useEffect(() => {
    setCurrentSrc(src);
    setAttemptCount(0);
    setHasLoaded(false);
  }, [src]);

  const handleError = () => {
    if (attemptCount === 0 && fallbackSrc && fallbackSrc !== currentSrc) {
      setAttemptCount(1);
      setCurrentSrc(fallbackSrc);
    } else if (attemptCount === 1 && secondaryFallbackSrc && secondaryFallbackSrc !== currentSrc) {
      setAttemptCount(2);
      setCurrentSrc(secondaryFallbackSrc);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!hasLoaded && (
        <div className="absolute inset-0 bg-[#F4ECE9] animate-pulse pointer-events-none" />
      )}
      <img
        {...rest}
        src={currentSrc || fallbackSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setHasLoaded(true)}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          hasLoaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  );
};
