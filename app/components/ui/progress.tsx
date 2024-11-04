import React from 'react';

export const Progress: React.FC<{ value: number; className?: string }> = ({ value, className }) => {
  // Ensure value is between 0 and 100
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={`relative w-full h-2 bg-gray-200 rounded ${className}`}>
      <div
        className="absolute top-0 left-0 h-full bg-blue-500 rounded"
        style={{ width: `${clampedValue}%` }} // Use clamped value for width
      />
    </div>
  );
};