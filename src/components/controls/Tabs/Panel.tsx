import cn from "classnames";
import { HTMLProps, ReactNode } from "react";
import { TabPanel as ReactTabPanel } from "react-tabs";

export interface TabsPanelProps extends HTMLProps<HTMLDivElement> {
  /** Panel content */
  children: ReactNode;
  baseClass?: string;
}

export const TabsPanel = ({
  children,
  className,
  baseClass,
  ...props
}: TabsPanelProps) => {
  const panelBaseClass = `${baseClass}__panel`;
  const classes = cn(panelBaseClass, className);

  return (
    <ReactTabPanel className={classes} selectedClassName="selected" {...props}>
      {children}
    </ReactTabPanel>
  );
};

export default TabsPanel;
