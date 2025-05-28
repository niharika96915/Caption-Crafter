import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import ImagePreview from './ImagePreview';
import CaptionGenerator from './CaptionGenerator';
import RecentImages from './RecentImages';
import { ImageData } from '../types';

const ImageCaptioning = () => {
  const [currentImage, setCurrentImage] = useState<ImageData | null>(null);
  const [recentImages, setRecentImages] = useState<ImageData[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleImageUpload = (imageData: ImageData) => {
    setCurrentImage(imageData);
    setIsGenerating(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newImageWithCaptions = {
        ...imageData,
        captions: generateMockCaptions(imageData.name)
      };
      
      setCurrentImage(newImageWithCaptions);
      setIsGenerating(false);
      
      // Add to recent images
      setRecentImages(prev => {
        const filtered = prev.filter(img => img.id !== imageData.id);
        return [newImageWithCaptions, ...filtered].slice(0, 6);
      });
    }, 1500);
  };
  
  return (
    <div className="space-y-8">
      <section className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Image Captioning</h2>
          <p className="text-gray-600 mb-6">Upload an image to get AI-generated caption suggestions</p>
          
          <ImageUploader onImageUpload={handleImageUpload} />
        </div>
      </section>
      
      {currentImage && (
        <section className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ImagePreview image={currentImage} />
              <CaptionGenerator 
                image={currentImage} 
                isGenerating={isGenerating} 
              />
            </div>
          </div>
        </section>
      )}
      
      {recentImages.length > 0 && (
        <RecentImages 
          images={recentImages} 
          onSelectImage={(image) => setCurrentImage(image)} 
        />
      )}
    </div>
  );
};

// Generate some mock captions based on the image name
const generateMockCaptions = (imageName: string): string[] => {
  const captions = [
    `A beautiful scene captured in "${imageName}"`,
    `Exploring the world through the lens in this stunning image`,
    `Moments worth remembering in this captivating shot`,
    `The perfect blend of colors and composition in this photograph`,
    `A picture that speaks a thousand words`,
  ];
  
  // Randomize and return 3-5 captions
  return captions
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 2) + 3);
};

export default ImageCaptioning;