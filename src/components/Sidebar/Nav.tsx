import Accordion, { AccordionProps } from "@components/controls/Accordion";

export interface SidebarNavProps extends AccordionProps {}

const SidebarNav = ({ children, ...props }: SidebarNavProps) => (
  <Accordion animationType="fadeIn" {...props}>
    {children}
  </Accordion>
);

export default SidebarNav;
