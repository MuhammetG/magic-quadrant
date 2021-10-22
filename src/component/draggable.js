import React, { useEffect, useState } from 'react';
import './draggable.css';
import useDragging from '../hooks/useDragging';

function Draggable({ posX, posY, text, onMove, deleted }) {
  const [ref, x, y, isDragging, move] = useDragging();

  useEffect(() => {
    move(posX, posY);
  }, [posX, posY]);

  useEffect(() => {
    if (x >= 0 && y >= 0) onMove(x, y);
  }, [x, y]);

  return (
    <div
      className='draggable-container'
      ref={ref}
      style={{
        visibility: deleted ? 'hidden' : 'visible',
        left: (x || 0) > 500 ? 500 : x || 0,
        top: (y || 0) > 500 ? 500 : y || 0,
        maxWidth: 500 - (x || 0),
      }}
    >
      <div
        className='draggable'
        style={{
          background: isDragging ? 'blue' : 'gray',
        }}
      />
      <div className='draggable-text'>{text}</div>
    </div>
  );
}

export default Draggable;
