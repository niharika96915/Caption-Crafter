import React from 'react';
import { Calendar, FileType, HardDrive } from 'lucide-react';
import { ImageData } from '../types';
import { formatFileSize, formatDate } from '../utils';

interface ImagePreviewProps {
  image: ImageData;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ image }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Image Preview</h3>
      
      <div className="aspect-square max-h-96 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
        <img 
          src={image.src} 
          alt={image.name} 
          className="max-w-full max-h-full object-contain" 
        />
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium text-gray-800 truncate" title={image.name}>
          {image.name}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <FileType size={16} />
            <span>{image.type.split('/')[1].toUpperCase()}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <HardDrive size={16} />
            <span>{formatFileSize(image.size)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600 md:col-span-2">
            <Calendar size={16} />
            <span>{formatDate(image.uploadedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;