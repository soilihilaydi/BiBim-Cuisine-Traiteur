'use client';

import { useState, useEffect } from 'react';

const COOKIE_CONSENT_KEY = 'cookie_consent';

const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent === null) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setIsVisible(false);
    // Here you would typically load analytics scripts or other tracking
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setIsVisible(false);
    // Here you would ensure no tracking scripts are loaded
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex flex-col md:flex-row items-center justify-between z-50 shadow-lg">
      <p className="text-sm mb-2 md:mb-0 md:mr-4">
        Nous utilisons des cookies pour améliorer votre expérience sur notre site. En continuant à naviguer, vous acceptez notre utilisation des cookies.
        <a href="/politique-de-confidentialite" className="text-primary hover:underline ml-1">En savoir plus</a>
      </p>
      <div className="flex space-x-2">
        <button
          onClick={handleAccept}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        >
          Accepter
        </button>
        <button
          onClick={handleDecline}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
        >
          Refuser
        </button>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
