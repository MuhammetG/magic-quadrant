import { useEffect, useRef, useState } from 'react';

const useDragging = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState({ x: 250, y: 250 });
  const ref = useRef(null);

  function onMouseMove(e) {
    if (!isDragging) return;
    setPos({
      x: e.x - ref.current.offsetWidth / 2,
      y: e.y - ref.current.offsetHeight / 2,
    });
    e.stopPropagation();
    e.preventDefault();
  }

  function move(x, y) {
    setPos({ x, y });
  }

  function onMouseUp(e) {
    setIsDragging(false);
    e.stopPropagation();
    e.preventDefault();
  }

  function onMouseDown(e) {
    if (e.button !== 0) return;
    setIsDragging(true);

    setPos({
      x: e.x - ref.current.offsetWidth / 2,
      y: e.y - ref.current.offsetHeight / 2,
    });

    e.stopPropagation();
    e.preventDefault();
  }

  // When the element mounts, attach an mousedown listener
  useEffect(() => {
    ref.current.addEventListener('mousedown', onMouseDown);

    return () => {
      if (ref.current) ref.current.removeEventListener('mousedown', onMouseDown);
    };
  }, [ref.current]);

  // Everytime the isDragging state changes, assign or remove
  // the corresponding mousemove and mouseup handlers
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mousemove', onMouseMove);
    } else {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [isDragging]);

  return [ref, pos.x, pos.y, isDragging, move];
};

export default useDragging;
