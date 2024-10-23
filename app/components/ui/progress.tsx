import React from 'react';

export const Progress: React.FC<{ value: number; className?: string }> = ({ value, className }) => {
  return (
    <div className={`relative w-full h-2 bg-gray-200 rounded ${className}`}>
      <div
        className="absolute top-0 left-0 h-full bg-blue-500 rounded"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};