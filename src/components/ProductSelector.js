import React, { useState } from 'react';

const ProductSelector = ({category}) => {

  const [selectedStorage, setSelectedStorage] = useState('');
  

  const handleStorageSelect = (storage) => {
    setSelectedStorage(storage);
  };

  const mobileStorages = [
    { id: 1, name: '32GB' },
    { id: 2, name: '64GB' },
    { id: 3, name: '128GB' },
  ];

  return (
    <> 
    {category === 'Mobile' &&   <div className="mt-4 flex gap-4">
         {mobileStorages.map((storage) => (
             <button
             key={storage.id}
             className={`px-3 py-1 rounded ${
                 selectedStorage === storage.name
                 ? 'bg-blue-500 text-white'
                 : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => handleStorageSelect(storage.name)}
                >
                  {storage.name}
                </button>
              ))}
        </div>}
    </>
    

  );
};

export default ProductSelector;
