import React, { useState } from 'react';
import { Button } from '@nextui-org/react';

interface AddPrimeMinisterProps {
  itemId: string;
  title: string;
  titleEn: string;
  officials: { key: string; name: string }[];
}

const AddPrimeMinister = ({
  itemId,
  title,
  titleEn,
  officials,
}: AddPrimeMinisterProps): JSX.Element => {
  console.log("officials", officials);
  const [primeMinister, setPrimeMinister] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrimeMinister(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log('Prime Minister:', primeMinister, 'Related Info:', {
      itemId,
      title,
      titleEn,
      officials,
    });
    // Further processing logic
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-lg font-bold text-gray-800">Add Prime Minister</h2>
      <div>
        <label htmlFor="primeMinister" className="block text-lg font-medium text-gray-700">
          Prime Minister
        </label>
        <input
          type="text"
          id="primeMinister"
          value={primeMinister}
          onChange={handleChange}
          className="mt-2 block w-full p-3 text-lg border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <Button type="submit" color="primary" size="lg">
        Add Prime Minister
      </Button>
    </form>
  );
};

export default AddPrimeMinister;
