import React from 'react';

const DebugPage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Tailwind CSS Debug Page</h1>
      
      <div className="space-y-4">
        <div className="bg-red-500 text-white p-4 rounded">Red Box (bg-red-500)</div>
        <div className="bg-green-500 text-white p-4 rounded">Green Box (bg-green-500)</div>
        <div className="bg-blue-500 text-white p-4 rounded">Blue Box (bg-blue-500)</div>
        
        <div className="flex space-x-4 mt-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Blue Button
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Green Button
          </button>
        </div>
        
        <div className="mt-6 p-4 border-2 border-dashed border-purple-500 rounded">
          <p className="text-lg text-gray-700">This is a bordered container with dashed border (border-2 border-dashed border-purple-500)</p>
        </div>
      </div>
    </div>
  );
};

export default DebugPage;