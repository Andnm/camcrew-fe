import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  ...props 
}) => {
  const baseClasses = 'font-semibold transition-colors rounded-lg inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-orange-500 hover:bg-orange-600 text-white',
    secondary: 'border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white',
    ghost: 'text-orange-500 hover:text-orange-600'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <button 
      className={classes} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;