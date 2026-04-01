import React from 'react';

export const Card = ({ children, className = '', style = {}, hover = true, glow = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`card-component ${hover ? 'card-hover' : ''} ${glow ? 'card-glow' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
