import React from 'react';
import { Clock } from 'lucide-react';
import { ImageData } from '../types';
import { formatDate } from '../utils';

interface RecentImagesProps {
  images: ImageData[];
  onSelectImage: (image: ImageData) => void;
}

const RecentImages: React.FC<RecentImagesProps> = ({ images, onSelectImage }) => {
  return (
    <section className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Clock size={20} className="text-gray-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Recent Images</h3>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {images.map((image) => (
            <div 
              key={image.id}
              onClick={() => onSelectImage(image)}
              className="cursor-pointer group"
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200 group-hover:border-blue-400 transition-colors duration-200">
                <img 
                  src={image.src} 
                  alt={image.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-900 truncate" title={image.name}>
                  {image.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(image.uploadedAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentImages;