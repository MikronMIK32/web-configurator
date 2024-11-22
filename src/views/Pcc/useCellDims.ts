import { useCallback, useRef, useState } from 'react';

export default function useCellDims() {
  const [dims, setDims] = useState({ w: 128, h: 128 });
  const isMeasuredRef = useRef(false);

  const ref = useRef<HTMLDivElement>();

  const fn = (node: HTMLDivElement) => {
    isMeasuredRef.current = true;
    const { height, width } = node.getBoundingClientRect();
    setDims({ w: width, h: height });
  };

  const onMeasure = useCallback((node: HTMLDivElement | null) => {
    if (isMeasuredRef.current || !node) return;
    ref.current = node;

    if (node?.isConnected) {
      fn(node);
    } else {
      queueMicrotask(() => {
        if (node?.isConnected) {
          fn(node);
        }
      });
    }
  }, []);

  const updateLast = useCallback(() => {
    if (ref.current) fn(ref.current)
  }, []);

  return { onMeasure, dims, updateLast };
}
