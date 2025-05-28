import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { generateId } from '../utils';
import { ImageData } from '../types';

interface ImageUploaderProps {
  onImageUpload: (imageData: ImageData) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const processFile = (file: File) => {
    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const imageData: ImageData = {
          id: generateId(),
          name: file.name,
          src: e.target.result as string,
          type: file.type,
          size: file.size,
          uploadedAt: new Date().toISOString(),
          captions: []
        };
        
        onImageUpload(imageData);
      }
    };
    
    reader.readAsDataURL(file);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileInputChange} 
        accept="image/*" 
        className="hidden" 
      />
      
      <div className="mb-4 flex justify-center">
        {isDragging ? (
          <ImageIcon size={48} className="text-blue-500" />
        ) : (
          <Upload size={48} className="text-gray-400" />
        )}
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {isDragging ? 'Drop your image here' : 'Upload your image'}
      </h3>
      
      <p className="text-gray-500 mb-4">
        Drag and drop your image here, or click to browse
      </p>
      
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Select Image
      </button>
      
      <p className="mt-4 text-xs text-gray-500">
        Supported formats: JPG, PNG, GIF, WEBP
      </p>
    </div>
  );
};

export default ImageUploader;