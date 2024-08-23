import React from 'react';

interface DropdownProps {
  id: string;
  value: string;
  options: { id: string; label: string }[];
  onSelect: (selectedId: string) => void;
  placeholder: string;
  label?: string;
  className?: string;
  labelClass?: string;
  selectClass?: string;
  required?: boolean;
  sort?: boolean;
}

const Dropdown = ({
  id,
  value,
  options,
  onSelect,
  placeholder,
  label = '',
  className = '',
  labelClass = '',
  selectClass = '',
  required = false,
  sort = false,
}: DropdownProps): JSX.Element => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    console.log(selectedId);
    onSelect(selectedId);
  };

  const sortedOptions = sort
    ? [...options].sort((a, b) => a.label.localeCompare(b.label))
    : options;

  return (
    <div className={`component dropdown ${className}`}>
      {label && (
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={handleSelectChange}
        className={selectClass}
        required={required}
        disabled={!sortedOptions || sortedOptions.length === 0}
      >
        <option value="">{placeholder}</option>
        {sortedOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
