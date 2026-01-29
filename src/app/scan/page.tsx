"use client";
import { useState } from "react";

export default function Scan() {
  const [scannedImage, setScannedImage] = useState<string | null>(null);
  const [enhancementSettings, setEnhancementSettings] = useState({
    brightness: 0,
    contrast: 0,
    sharpness: 0
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setScannedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEnhancementChange = (setting: keyof typeof enhancementSettings, value: number) => {
    setEnhancementSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSaveDocument = () => {
    alert("Document saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Document Scanner</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scanner Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Scan Document</h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
              {scannedImage ? (
                <img 
                  src={scannedImage} 
                  alt="Scanned document" 
                  className="max-w-full h-auto rounded-md"
                  style={{
                    filter: `brightness(${100 + enhancementSettings.brightness}%) contrast(${100 + enhancementSettings.contrast}%) saturate(${1 + enhancementSettings.sharpness/100})`
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <svg className="h-12 w-12 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <p className="mt-2 text-blue-600">Upload an image to scan</p>
                </div>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Document Image
              </label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                className="block w-full text-sm text-blue-600
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
            
            <div className="flex space-x-3">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                Take Photo
              </button>
              <button className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300">
                Gallery
              </button>
            </div>
          </div>
          
          {/* Enhancement Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Image Enhancement</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Brightness: {enhancementSettings.brightness}%
                  </label>
                </div>
                <input 
                  type="range" 
                  min="-100" 
                  max="100" 
                  value={enhancementSettings.brightness}
                  onChange={(e) => handleEnhancementChange("brightness", parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Contrast: {enhancementSettings.contrast}%
                  </label>
                </div>
                <input 
                  type="range" 
                  min="-100" 
                  max="100" 
                  value={enhancementSettings.contrast}
                  onChange={(e) => handleEnhancementChange("contrast", parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Sharpness: {enhancementSettings.sharpness}%
                  </label>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={enhancementSettings.sharpness}
                  onChange={(e) => handleEnhancementChange("sharpness", parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-medium mb-2">Document Processing</h3>
                <div className="space-y-3">
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
                    Auto-Detect Edges
                  </button>
                  <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700">
                    Perspective Correction
                  </button>
                  <button className="w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700">
                    Convert to PDF
                  </button>
                </div>
                
                <div className="mt-6">
                  <button 
                    onClick={handleSaveDocument}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 font-medium"
                  >
                    Save Document
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
