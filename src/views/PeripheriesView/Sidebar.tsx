import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import NavLink from '@components/NavLink';
import Sidebar from '@components/Sidebar';

import { scale } from '@scripts/helpers';
import { useFieldCSS } from '@scripts/hooks/useFieldCSS';

interface LinkData {
  label: string;
  to: string;
}

interface LinkGroup {
  label: string;
  links: LinkData[];
}

const items: LinkGroup[] = [
  {
    label: 'Система',
    links: [
      {
        label: 'Монитор питания',
        to: '/periphery/system/vcc-monitor',
      },
      {
        label: 'Монитор тактирования',
        to: '/periphery/system/cycle-monitor',
      },
      {
        label: 'ПДП',
        to: '/periphery/system/pdp',
      },
      {
        label: 'Тактирование',
        to: '/periphery/system/cycle',
      },
      {
        label: 'Прерывания',
        to: '/periphery/system/interrupts',
      },
      {
        label: 'GPIO',
        to: '/periphery/system/gpio',
      },
      {
        label: 'WDT',
        to: '/periphery/system/wdt',
      },
      {
        label: "Bus' WDT",
        to: '/periphery/system/bus-wdt',
      },
    ],
  },
  {
    label: 'Аналоговые блоки',
    links: [
      {
        label: 'АЦП',
        to: '/periphery/analog/adc',
      },
      {
        label: 'Температурный сенсор',
        to: '/periphery/analog/temp',
      },
      {
        label: 'ЦАП',
        to: '/periphery/analog/dac',
      },
    ],
  },
  {
    label: 'Таймеры',
    links: [
      {
        label: 'RTC',
        to: '/periphery/timers/rtc',
      },
      {
        label: 'TIMER32',
        to: '/periphery/timers/timer32',
      },
      {
        label: 'TIMER16',
        to: '/periphery/timers/timer16',
      },
    ],
  },
  {
    label: 'Интерфейсы',
    links: [
      {
        label: 'I2C0',
        to: '/periphery/interface/i2c0',
      },
      {
        label: 'I2C1',
        to: '/periphery/interface/i2c1',
      },
      {
        label: 'SPI0',
        to: '/periphery/interface/spi0',
      },
      {
        label: 'SPI1',
        to: '/periphery/interface/spi1',
      },
      {
        label: 'SPIFI',
        to: '/periphery/interface/spifi',
      },
      {
        label: 'USART',
        to: '/periphery/interface/usart',
      },
    ],
  },
  {
    label: 'Криптография',
    links: [
      {
        label: 'Крипто-блок',
        to: '/periphery/crypto/block',
      },
      {
        label: 'CRC',
        to: '/periphery/crypto/crc',
      },
    ],
  },
];

// const NavLink = ({ link, label }: LinkData) => {
//   const match = useMatch(`${link}/*`);

//   return (
//     <Link
//       to={link}
//       css={{
//         color: colors.link,
//         textDecoration: 'none',
//         padding: `${scale(1)}px ${scale(2)}px`,
//         borderRadius: scale(3, true),
//         border: `1px solid ${colors.grey200}`,
//         ...(match && {
//           borderColor: colors.link,
//           background: colors.link,
//           color: colors.white,
//           cursor: 'default',
//         }),
//         ...(!match && {
//           ':hover': {
//             border: `1px solid ${colors.link}`,
//           },
//         }),
//       }}
//     >
//       {label}
//     </Link>
//   );
// };

const SidebarContainer = ({ isDark, className }: { isDark: boolean; className?: string }) => {
  const { pathname } = useLocation();

  const activeGroupId = useMemo<string>(() => {
    let groupIndex = 0;

    for (let i = 0; i < items.length; i += 1) {
      const groupItems = items[i].links;

      if (groupItems.map(e => e.to).includes(pathname)) {
        groupIndex = i;
        break;
      }
    }
    return `${groupIndex}`;
  }, [pathname]);

  const { basicFieldCSS } = useFieldCSS({});
  const { register, watch } = useForm({
    defaultValues: {
      search: '',
    },
  });

  const search = watch('search');
  const filteredItems = useMemo(
    () =>
      items.filter(el => {
        const term = search.toLowerCase();
        if (el.label.toLowerCase().includes(term)) return true;

        const concat = el.links
          .map(e => e.label)
          .join(',')
          .toLowerCase();
        return concat.includes(term);
      }),
    [search]
  );

  const preExpanded = useMemo<string[]>(() => {
    if (filteredItems.length < 3) return ['0', '1'];

    return [activeGroupId];
  }, [activeGroupId, filteredItems]);

  return (
    <Sidebar title="Список перифирий" className={className}>
      <input
        css={[basicFieldCSS, { marginBottom: scale(2) }]}
        placeholder="Поиск"
        autoComplete="off"
        {...register('search')}
      />
      <Sidebar.Nav
        preExpanded={preExpanded}
        animationType="fadeIn"
        allowMultipleExpanded={false}
        allowZeroExpanded
        variant={isDark ? 'dark' : 'primary'}
        isIconVertical
      >
        {filteredItems &&
          filteredItems.map((group, index) => (
            <Sidebar.Group id={`${index}`} key={index} title={group.label}>
              <div
                css={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: scale(1),
                }}
              >
                {group.links.map(({ to, label }, index) => (
                  <NavLink variant={isDark ? 'dark' : 'primary'} key={index} to={to}>
                    {label}
                  </NavLink>
                ))}
              </div>
            </Sidebar.Group>
          ))}
      </Sidebar.Nav>
    </Sidebar>
  );
};

export default SidebarContainer;
