// components/GoogleTranslate.tsx
import { useEffect } from 'react';


declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement('script');
      script.src =
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.onload = () => {
        if (window.google?.translate?.TranslateElement) {
          window.googleTranslateElementInit();
        }
      };
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,fr',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element'
        );
      }
    };

    if (!document.querySelector('script[src*="translate_a/element.js"]')) {
      addGoogleTranslateScript();
    } else if (window.google?.translate) {
      window.googleTranslateElementInit();
    }
  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;