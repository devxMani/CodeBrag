import React from 'react';

export const Card: React.FC<{ className?: string }> = ({ className, children }) => {
  return (
    <div className={`rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<{ className?: string }> = ({ className, children }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export const CardTitle: React.FC<{ className?: string }> = ({ className, children }) => {
  return <h2 className={`text-lg font-bold ${className}`}>{children}</h2>;
};

export const CardHeader: React.FC<{ className?: string }> = ({ className, children }) => {
  return <div className={`border-b pb-2 ${className}`}>{children}</div>;
};