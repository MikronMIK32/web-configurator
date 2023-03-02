import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export function useQuery() {
  const { search } = useLocation();

  return useMemo(
    () => Object.fromEntries(new URLSearchParams(search)),
    [search],
  );
}
