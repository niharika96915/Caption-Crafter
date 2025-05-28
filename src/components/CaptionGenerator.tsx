import React, { useState } from 'react';
import { Check, Copy, Loader2, RefreshCw } from 'lucide-react';
import { ImageData } from '../types';

interface CaptionGeneratorProps {
  image: ImageData;
  isGenerating: boolean;
}

const CaptionGenerator: React.FC<CaptionGeneratorProps> = ({ 
  image, 
  isGenerating 
}) => {
  const [selectedCaption, setSelectedCaption] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const handleCopyCaption = (caption: string, index: number) => {
    navigator.clipboard.writeText(caption);
    setCopiedIndex(index);
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Caption Suggestions</h3>
      
      {isGenerating ? (
        <div className="h-64 flex flex-col items-center justify-center text-gray-500">
          <Loader2 size={32} className="animate-spin mb-4" />
          <p>Generating captions...</p>
          <p className="text-sm mt-2">This may take a few moments</p>
        </div>
      ) : image.captions.length > 0 ? (
        <div className="space-y-3">
          {image.captions.map((caption, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border ${
                selectedCaption === caption 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              } transition-all duration-200`}
              onClick={() => setSelectedCaption(caption)}
            >
              <div className="flex justify-between items-start gap-3">
                <p className="text-gray-700">{caption}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyCaption(caption, index);
                  }}
                  className="p-1.5 text-gray-500 hover:text-blue-500 rounded-md hover:bg-gray-100"
                  title="Copy caption"
                >
                  {copiedIndex === index ? (
                    <Check size={18} className="text-green-500" />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              </div>
            </div>
          ))}
          
          <button 
            className="w-full mt-4 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors duration-200"
            onClick={() => {
              setSelectedCaption(null);
            }}
          >
            <RefreshCw size={16} />
            <span>Regenerate Captions</span>
          </button>
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center text-gray-500">
          <p>No captions available</p>
        </div>
      )}
    </div>
  );
};

export default CaptionGenerator;