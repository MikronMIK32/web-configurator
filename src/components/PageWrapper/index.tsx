import { ReactNode, useEffect } from 'react';

export interface PageWrapperProps {
  title: string;
  children: ReactNode | ReactNode[];
}

const PageWrapper = ({ title, children }: PageWrapperProps) => {
  useEffect(() => {
    document.title = title || '';
  }, [title]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default PageWrapper;
