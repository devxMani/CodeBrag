import React from 'react';

export const Button: React.FC<{ variant?: string; size?: string; className?: string }> = ({ variant, size, className, children }) => {
  const baseClasses = "rounded-md font-semibold focus:outline-none";
  const variantClasses = variant === "outline" ? "border border-gray-300" : "bg-blue-500 text-white";
  const sizeClasses = size === "icon" ? "p-2" : "px-4 py-2";

  return (
    <button className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}>
      {children}
    </button>
  );
};