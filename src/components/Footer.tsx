import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} CaptionCraft • AI-Powered Image Captioning</p>
      </div>
    </footer>
  );
};

export default Footer;