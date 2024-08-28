import React from 'react';

interface FileUploadProps {
  id: string;
  onFileSelect: (file: File | null) => void;
  accept: string;
  label?: string;
  placeholder?: string;
  className?: string;
  labelClass?: string;
  inputClass?: string;
  required?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  id,
  onFileSelect,
  accept,
  label = '',
  placeholder = '',
  className = '',
  labelClass = '',
  inputClass = '',
  required = false,
}: FileUploadProps): JSX.Element => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileSelect(file);
  };

  return (
    <div className={`component file-upload ${className}`}>
      {label && (
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
      )}
      <input
        type="file"
        id={id}
        accept={accept}
        onChange={handleFileChange}
        className={inputClass}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default FileUpload;
