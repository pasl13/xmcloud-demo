import React, { useState } from 'react';

type Official = {
  id: string;
  name: string;
};

interface OfficialsDropdownProps {
  officials: Official[] | undefined;
  onSelect: (officialId: string) => void;
}

const OfficialsDropdown = ({ officials, onSelect }: OfficialsDropdownProps): JSX.Element => {
  const [selectedOfficial, setSelectedOfficial] = useState('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelectedOfficial(selectedId);
    onSelect(selectedId);
  };

  // Sort the officials by name alphabetically
  const sortedOfficials = officials?.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="officials-dropdown my-4">
      <select
        id="officials-dropdown"
        value={selectedOfficial}
        onChange={handleSelectChange}
        disabled={!sortedOfficials || sortedOfficials.length === 0}
        className="
          block w-full                       /* Full width and block-level element */
          px-4 py-2                          /* Padding for comfortable interaction */
          border border-gray-300             /* Light gray border */
          rounded-lg                         /* Large rounded corners */
          shadow-sm                          /* Subtle shadow for depth */
          disabled:opacity-50 disabled:cursor-not-allowed /* Dimmed appearance and disallowed cursor when disabled */
        "
      >
        {/* Default option */}
        <option value="">-- Select an Official --</option>

        {/* Conditionally render options based on availability */}
        {sortedOfficials && sortedOfficials.length > 0 ? (
          sortedOfficials.map((official) => (
            <option key={official.id} value={official.id}>
              {official.name}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No Officials Available
          </option>
        )}
      </select>
    </div>
  );
};

export default OfficialsDropdown;
