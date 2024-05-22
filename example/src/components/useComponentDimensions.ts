import {RefObject, useState, useLayoutEffect} from 'react';

export function useComponentDimensions<T extends HTMLElement>(
  target: RefObject<T> | T | null
) {
  const [dimensions, setDimensions] = useState({width: 0, height: 0});

  const updateDimensions = ({width, height}: DOMRect) => {
    const newWidth = Math.round(width);
    const newHeight = Math.round(height);

    setDimensions((prevDimensions) => {
      if (
        newWidth !== prevDimensions.width ||
        newHeight !== prevDimensions.height
      ) {
        return {width: newWidth, height: newHeight};
      }

      return prevDimensions;
    });
  };

  useLayoutEffect(() => {
    const targetElement =
      target && 'current' in target ? target.current : target;

    if (!targetElement) {
      return;
    }

    updateDimensions(targetElement.getBoundingClientRect());
  }, [target]);

  return dimensions;
}
