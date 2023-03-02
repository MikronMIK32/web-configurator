import { Accordion } from "@components/controls/Accordion";
import { ReactNode } from "react";

export interface SidebarGroupProps {
  id: string;
  title: string;
  children: ReactNode | ReactNode[];
}

const SidebarGroup = ({ id, title, children }: SidebarGroupProps) => (
  <Accordion.Item uuid={id}>
    <Accordion.Heading>
      <Accordion.Button>{title}</Accordion.Button>
    </Accordion.Heading>
    <Accordion.Panel>{children}</Accordion.Panel>
  </Accordion.Item>
);

export default SidebarGroup;
