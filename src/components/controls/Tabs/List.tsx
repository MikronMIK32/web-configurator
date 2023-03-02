import cn from "classnames";
import {
  Children,
  HTMLProps,
  ReactNode,
  cloneElement,
  isValidElement,
} from "react";
import { TabList as ReactTabList } from "react-tabs";

export interface TabsListProps
  extends Omit<HTMLProps<HTMLUListElement>, "size"> {
  /** Tabs.Tab components */
  children: ReactNode;
  baseClass?: string;
  horizontalScroll?: boolean;
}

export const TabsList = ({
  children,
  className,
  baseClass,
  horizontalScroll,
  ...props
}: TabsListProps) => {
  const listBaseClass = `${baseClass}__list`;
  const classes = cn(listBaseClass, className);

  return (
    <ReactTabList
      className={classes}
      css={{
        ...(horizontalScroll && {
          maxWidth: "100%",
          overflowY: "hidden",
          overflowX: "auto",
        }),
      }}
      {...props}
    >
      {children &&
        Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement<any>(child, {
              baseClass,
            });
          }
        })}
    </ReactTabList>
  );
};

export default TabsList;
