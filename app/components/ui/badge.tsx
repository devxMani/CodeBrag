import React from 'react';

export const Badge: React.FC<{ variant?: string; className?: string }> = ({ variant, className, children }) => {
  const baseClasses = "inline-block rounded-full px-3 py-1 text-sm";
  const variantClasses = variant === "outline" ? "border border-gray-300" : "bg-blue-500 text-white";

  return <span className={`${baseClasses} ${variantClasses} ${className}`}>{children}</span>;
};