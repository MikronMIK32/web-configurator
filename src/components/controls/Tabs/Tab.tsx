import { SVGRIcon } from "@customTypes/index";
import { scale } from "@scripts/helpers";
import typography from "@scripts/typography";
import cn from "classnames";
import { HTMLProps, ReactNode } from "react";
import { Tab as ReactTab } from "react-tabs";

export interface TabsTabProps
  extends Omit<HTMLProps<HTMLLIElement>, "size" | "tabIndex"> {
  /** Heading content */
  children: ReactNode;
  /** Disabled tab */
  disabled?: boolean;
  /** Icon */
  Icon?: SVGRIcon;
  baseClass?: string;
  selected?: boolean;
}

export const TabsTab = ({
  children,
  className,
  Icon,
  baseClass,
  selected,
  ...props
}: TabsTabProps) => {
  const tabBaseClass = `${baseClass}__tab`;
  const classes = cn(tabBaseClass, className, selected && "selected");

  return (
    <ReactTab
      className={classes}
      selected={selected}
      {...props}
      selectedClassName="selected"
      disabledClassName="disabled"
      css={{
        ...typography("labelSmall"),
      }}
    >
      <>
        {Icon && <Icon width={scale(3)} height={scale(3)} />}
        {children}
      </>
    </ReactTab>
  );
};

export default TabsTab;
