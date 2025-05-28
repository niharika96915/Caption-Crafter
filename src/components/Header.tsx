import React from 'react';
import { Image } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <div className="flex items-center gap-2">
          <Image size={28} className="text-blue-500" />
          <h1 className="text-xl font-semibold text-gray-900">CaptionCraft</h1>
        </div>
        <p className="ml-4 text-gray-500 text-sm hidden sm:block">
          Create perfect captions for your images
        </p>
      </div>
    </header>
  );
};

export default Header;