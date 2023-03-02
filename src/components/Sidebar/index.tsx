import { scale } from '@scripts/helpers';
import { FC, ReactNode } from 'react';
import { colors } from '@scripts/colors';
import SidebarNav, { SidebarNavProps } from './Nav';
import SidebarGroup, { SidebarGroupProps } from './Group';

interface SidebarComposition {
  Nav: FC<SidebarNavProps>;
  Group: FC<SidebarGroupProps>;
}

interface SidebarProps {
  title: string;
  children: ReactNode | ReactNode[];
  className?: string;
}

const Sidebar = ({
  title,
  children,
  className,
}: SidebarProps & Partial<SidebarComposition>) => (
  <div
    css={{
      maxHeight: '100%',
      overflow: 'hidden',
      overflowY: 'auto',
      padding: scale(2),
    }}
    className={className}
  >
    <h4 css={{ marginBottom: scale(1), color: colors.white }}>{title}</h4>
    {children}
  </div>
);

Sidebar.Nav = SidebarNav;
Sidebar.Group = SidebarGroup;

export default Sidebar;
