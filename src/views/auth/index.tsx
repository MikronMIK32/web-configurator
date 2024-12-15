import Button from '@components/controls/Button';
import Form from '@components/controls/Form';
import Input from '@components/controls/Input';
import { css } from '@emotion/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { colors } from '@scripts/colors';
import { scale } from '@scripts/helpers';
import typography from '@scripts/typography';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const firstAnim = css`
  animation: opacityAnimation 3s linear infinite;

  @keyframes opacityAnimation {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.6; /* Adjust minimum opacity as needed */
    }
    100% {
      opacity: 1;
    }
  }
`;

const secondAnim = css`
  animation: moveRight 8s linear infinite;

  @keyframes moveRight {
    0% {
      transform: translate(-55%, -56%);
    }
    50% {
      transform: translate(-50%, -60%);
    }
    100% {
      transform: translate(-55%, -56%);
    }
  }
`;

export default function AuthView() {
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'all',
    resolver: zodResolver(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    ),
  });

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
        display: 'grid',
        gridTemplateColumns: `1fr 600px`,
        gap: '128px',
        paddingLeft: 32,
        paddingRight: 32,
        alignItems: 'center',
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
        <h1
          css={{
            ...typography('h3'),
            position: 'relative',
            width: 'fit-content',
            marginBottom: scale(3),
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
          Вход
        </h1>
        <div
          css={{
            marginBottom: scale(4),
          }}
        >
          Для использования конфигуратора, войдите в существующий аккаунт,
          <br />
          или{' '}
          <button
            type="button"
            css={{
              color: colors.primary,
              textDecoration: 'underline',
              fontSize: '1rem',
            }}
          >
            создайте новый
          </button>
        </div>
        <Form
          methods={form}
          onSubmit={vals => {
            console.log(vals);
          }}
          css={{
            display: 'flex',
            gap: scale(2),
            maxWidth: 300,
            flexDirection: 'column',
          }}
        >
          <Form.Field
            block
            name="username"
            label="Логин"
            labelCSS={{
              color: '#ececec',
            }}
          />
          <Form.Field
            block
            name="password"
            type="password"
            label="Пароль"
            labelCSS={{
              color: '#ececec',
            }}
          />
          <div
            css={{
              display: 'flex',
              gap: scale(2),
              flexDirection: 'row',
              marginTop: scale(2),
            }}
          >
            <Button type="submit">Войти</Button>
            <Button type="submit" variant="inverse">
              Создать аккаунт
            </Button>
          </div>
        </Form>
      </div>
      <div
        css={{
          width: scale(50),
          height: scale(50),
          position: 'relative',
          marginTop: scale(8),
        }}
      >
        <span
          css={[
            firstAnim,
            {
              position: 'absolute',
              width: '95%',
              height: '75%',
              top: '50%',
              left: '50%',
              transform: 'translate(-55%, -60%) rotate(335deg) scale(1.2)',
              borderRadius: '100%',
              background: '#101e15',
              filter: 'blur(15px)',
            },
          ]}
        />

        <span
          css={[
            secondAnim,
            {
              position: 'absolute',
              width: '73%',
              height: '74%',
              top: '60%',
              left: '58%',
              transform: 'translate(-55%, -56%)',
              borderRadius: '100%',
              background: 'rgba(170, 127, 38, 0.38)',
              filter: 'blur(26px)',
            },
          ]}
        />
        <img
          src="https://mik32.ru/circuit.png"
          width={400}
          css={{
            position: 'absolute',
          }}
        />

        <span
          css={{
            position: 'absolute',
            width: '56%',
            height: '42%',
            top: '13%',
            left: '21%',
            transform: 'translate(-55%, -56%) rotate(0) ',
            borderRadius: '100%',
            background: 'rgb(38 255 147 / 25%)',
            filter: 'blur(50px)',
          }}
        />
      </div>
    </div>
  );
}
