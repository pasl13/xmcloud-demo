import React, { useState } from 'react';

type GovernmentTabsProps = {
  governments: {
    id: string;
    name: string;
  }[];
  onTabSelect: (governmentId: string) => void;
};

const GovernmentTabs = ({ governments, onTabSelect }: GovernmentTabsProps): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState(governments[0]?.id || '');

  const handleTabClick = (governmentId: string) => {
    setSelectedTab(governmentId);
    onTabSelect(governmentId);
  };

  return (
    <div className="flex space-x-4 border-b-2 border-gray-200 mb-4">
      {governments.map((government) => (
        <button
          key={government.id}
          className={`py-2 px-4 border-b-2 transition-colors ${
            selectedTab === government.id
              ? 'border-blue-500 text-blue-500 font-semibold'
              : 'border-transparent text-gray-500 hover:text-blue-500'
          }`}
          onClick={() => handleTabClick(government.id)}
        >
          {government.name}
        </button>
      ))}
    </div>
  );
};

export default GovernmentTabs;
