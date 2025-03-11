import { useEffect, useState } from 'react';

type Ad = {
  id: string;
  image: string;
  link: string;
  alt: string;
};

export function AdBanner() {
  const [ad, setAd] = useState<Ad | null>(null);

  useEffect(() => {
    // TODO: Fetch ad from ad server
    const mockAd = {
      id: '1',
      image: '/ad1.jpg',
      link: 'https://example.com',
      alt: 'Wine Accessories'
    };
    setAd(mockAd);
  }, []);

  if (!ad) return null;

  return (
    <div className="w-full bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg mb-8">
      <a href={ad.link} target="_blank" rel="noopener noreferrer">
        <img 
          src={ad.image} 
          alt={ad.alt}
          className="w-full h-32 object-cover rounded"
        />
      </a>
    </div>
  );
}
