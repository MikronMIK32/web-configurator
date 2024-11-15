import { useCallback, useRef, useState } from 'react';

export default function useCellDims() {
  const [dims, setDims] = useState({ w: 128, h: 128 });
  const isMeasuredRef = useRef(false);

  const onMeasure = useCallback((node: HTMLDivElement | null) => {
    if (isMeasuredRef.current || !node) return;
    isMeasuredRef.current = true;

    queueMicrotask(() => {
      if (node?.isConnected) {
        const { height, width } = node.getBoundingClientRect();
        setDims({ w: width, h: height });
      }
    });
  }, []);

  return { onMeasure, dims };
}
