import React, { useState } from 'react';

interface Item {
  itemId: string;
  name: string;
}

interface MultilistWithSearchProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  selectedItems: Item[];
  setSelectedItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const MultilistWithSearch = ({
  items,
  setItems, 
  selectedItems,
  setSelectedItems,

}: MultilistWithSearchProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  const handleSelect = (item: Item) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
      setItems(items.filter((i) => i.itemId !== item.itemId)); // Remove from the items list
    }
  };

  const handleDeselect = (item: Item) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
    setItems([...items, item]); // Add back to the items list
  };

  return (
    <div className="flex space-x-8">
      <div className="w-2/3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search officials"
          className="p-2 border rounded mb-4 w-full focus:ring focus:border-blue-500"
        />
        <h3 className="font-semibold text-lg mb-2">All Officials</h3>
        <ul className="space-y-2 border rounded p-4 bg-gray-50">
          {paginatedItems.map((item) => (
            <li
              key={item.itemId}
              onClick={() => handleSelect(item)}
              className="cursor-pointer hover:bg-blue-100 p-2 rounded"
            >
              {item.name}
            </li>
          ))}
        </ul>
        <div className="flex justify-between w-full mt-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-1/2 px-4 py-2 border rounded mr-2 bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={endIndex >= filteredItems.length}
            className="w-1/2 px-4 py-2 border rounded ml-2 bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
      <div className="border-l border-gray-300"></div>
      <div className="w-1/3">
        <h3 className="font-semibold text-lg mb-2">Selected Officials</h3>
        <ul className="space-y-2 border rounded p-4 bg-gray-50">
          {selectedItems.map((item) => (
            <li
              key={item.itemId}
              onClick={() => handleDeselect(item)}
              className="cursor-pointer hover:bg-red-100 p-2 rounded"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MultilistWithSearch;
