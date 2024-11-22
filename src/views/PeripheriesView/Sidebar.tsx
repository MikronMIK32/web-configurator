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
        label: 'EEPROM',
        to: '/periphery/system/eeprom',
      },
      {
        label: 'PCC',
        to: '/periphery/system/pcc',
      },
      {
        label: 'ПДП',
        to: '/periphery/system/pdp',
      },
      // {
      //   label: 'Прерывания',
      //   to: '/periphery/system/interrupts',
      // },
      {
        label: 'GPIO',
        to: '/periphery/system/gpio',
      },
      {
        label: 'WDT',
        to: '/periphery/system/wdt',
      },
      {
        label: 'Bus WDT',
        to: '/periphery/system/bus-wdt',
      },
      {
        label: 'OTP',
        to: '/periphery/system/otp',
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
        label: 'TIMER16_0',
        to: '/periphery/timers/timer16_0',
      },
      {
        label: 'TIMER16_1',
        to: '/periphery/timers/timer16_1',
      },
      {
        label: 'TIMER16_2',
        to: '/periphery/timers/timer16_2',
      },
      // {
      //   label: 'TIMER32',
      //   to: '/periphery/timers/timer32',
      // },
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
    <Sidebar title="Список периферий" className={className}>
      <input
        css={[basicFieldCSS, { marginBottom: scale(2) }]}
        placeholder="Поиск"
        autoComplete="off"
        type="search"
        {...register('search')}
      />
      <Sidebar.Nav
        preExpanded={preExpanded}
        animationType="fadeIn"
        allowMultipleExpanded
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
