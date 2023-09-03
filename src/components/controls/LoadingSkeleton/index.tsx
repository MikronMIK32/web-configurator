import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { colors } from '@scripts/colors';

export interface SkeletonProps {
  height?: number;
  width?: number;
  count?: number;
  duration?: number;
  circle?: boolean;
  className?: string;
}

const LoadingSkeleton = (props: SkeletonProps) => (
  <SkeletonTheme baseColor={colors?.grey300} highlightColor={colors?.white}>
    <Skeleton {...props} />
  </SkeletonTheme>
);

export default LoadingSkeleton;
