import { FC, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

import Accordion from '@components/controls/Accordion';

import { colors } from '@scripts/colors';
import typography from '@scripts/typography';

export interface PageAccordionProps {
  className?: string;
  children: ReactNode | ReactNode[];
}

interface PageAccordionItem {
  children: ReactNode[] | ReactNode;
  title: ReactNode;
  uuid: string;
}

const AccordionItem = ({ children, title, uuid }: PageAccordionItem) => {
  const { formState } = useFormContext();
  const errors = formState.errors?.[uuid];
  let errorsLength = 0;

  if (Array.isArray(errors)) {
    errorsLength = errors.length;
  } else if (typeof errors === 'object') {
    if (errors.message) {
      errorsLength = 1;
    } else {
      errorsLength = Object.keys(errors).length;
    }
  }
  return (
    <Accordion.Item uuid={uuid}>
      <Accordion.Heading>
        <Accordion.Button>
          <div css={{ display: 'flex' }}>
            <span>{title}</span>
            {!!errorsLength && (
              <span
                css={{
                  marginLeft: 8,
                  width: 16,
                  height: 16,
                  background: colors.negative,
                  borderRadius: '100%',
                  color: colors.white,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  ...typography('labelExtraSmall'),
                }}
              >
                {errorsLength}
              </span>
            )}
          </div>
        </Accordion.Button>
      </Accordion.Heading>
      <Accordion.Panel>{children}</Accordion.Panel>
    </Accordion.Item>
  );
};

export interface PageAccordionCompositionProps {
  Item: typeof AccordionItem;
}

const PageAccordion: FC<PageAccordionProps> & PageAccordionCompositionProps = ({ children, className }) => (
  <Accordion bordered className={className}>
    {children}
  </Accordion>
);

PageAccordion.Item = AccordionItem;

export default PageAccordion;
