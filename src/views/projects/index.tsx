import { NavLink } from 'react-router-dom';

import { colors } from '@scripts/colors';
import { scale } from '@scripts/helpers';
import typography from '@scripts/typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-regular-svg-icons';
import EditIcon from '@icons/custom/editCalendar.svg?react';
import Button from '@components/controls/Button';

const Placeholder = () => {
  return (
    <div
      css={{
        padding: scale(10),
        borderRadius: scale(3),
        background: 'rgba(255, 255, 255, 0.2)',
        display: 'grid',
        placeItems: 'center',
        gap: scale(1),
      }}
    >
      <FontAwesomeIcon size="5x" icon={faFolder} />
      <p>Проектов пока нет. Нажмите кнопку справа сверху, чтобы начать работу</p>
    </div>
  );
};

interface ProjectData {
  name: string;
  id: string;
  lastEditedDate: string;
}

const Project = ({ id, lastEditedDate, name }: Pick<ProjectData, 'name' | 'id' | 'lastEditedDate'>) => {
  return (
    <NavLink
      to={`/projects/${id}`}
      css={{
        padding: `${scale(3)}px ${scale(5)}px`,
        borderRadius: scale(2),
        background: 'rgba(255, 255, 255, 0.0)',
        ':hover': {
          background: 'rgba(255, 255, 255, 0.2)',
        },
        display: 'flex',
        flexDirection: 'column',
        gap: scale(1),
      }}
    >
      <FontAwesomeIcon size="5x" icon={faFolder} />
      <p
        css={{
          ...typography('labelLarge'),
        }}
      >
        {name}
      </p>
      {lastEditedDate && (
        <p
          css={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            marginTop: -4,
            opacity: 0.5,
            ...typography('paragraphSmall'),
          }}
        >
          <EditIcon width={scale(2)} height={scale(2)} />
          {lastEditedDate}
        </p>
      )}
    </NavLink>
  );
};

// Создание или переход к существующему проекту
export default function ProjectsView() {
  const projects: ProjectData[] = [
    {
      id: '1',
      lastEditedDate: '',
      name: 'Проект 1',
    },
  ];

  return (
    <div
      css={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        color: '#fff',
        background: [
          'linear-gradient(60deg, rgb(10, 20, 30) 20%, rgb(10, 12, 15) 80%)',
          'radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))',
        ].join(),
        padding: scale(5),
      }}
    >
      <div
        css={{
          padding: scale(6),
          background: 'hsla(0,0%,100%,.08)',
          backdropFilter: 'blur(2px)',
          borderRadius: scale(2),
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          css={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: scale(3),
          }}
        >
          <h1
            css={{
              ...typography('h3'),
              position: 'relative',
              width: 'fit-content',
              '::after': {
                content: '""',
                position: 'absolute',
                bottom: -4,
                display: 'block',
                width: '40%',
                height: 4,
                borderRadius: 4,
                background: colors.primary,
              },
            }}
          >
            Проекты
          </h1>
          <Button
            variant="inverse"
            css={{
              height: 'fit-content',
            }}
          >
            Создать
          </Button>
        </div>
        {projects.length ? (
          <div
            css={{
              display: 'flex',
              gap: scale(2),
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: '100%',
            }}
          >
            {projects.map(project => (
              <Project key={project.id} {...project} />
            ))}
          </div>
        ) : (
          <Placeholder />
        )}
      </div>
      <div />
    </div>
  );
}
