import { useState } from 'react';
import { useStore } from 'react-redux';

import { useGenerateProject } from '@api/generator';

import Button from '@components/controls/Button';
import Loader from '@components/controls/Loader';

import { RootState } from '@store/index';

import { colors } from '@scripts/colors';
import { scale } from '@scripts/helpers';

const ExportView = () => {
  const generateProject = useGenerateProject();
  const store = useStore<RootState>();

  // eslint-disable-next-line prefer-destructuring
  const isLoading = generateProject.isLoading;

  const [data, setData] = useState<{
    error?: string;
    link?: string;
    isLoaded: boolean;
  }>({
    isLoaded: false,
  });

  return (
    <div css={{ paddingTop: scale(2) }}>
      {isLoading && <Loader message="Отправка запроса..." />}
      <p
        css={{
          background: colors.grey100,
          padding: scale(2),
          borderRadius: scale(1),
          maxWidth: scale(120),
          marginBottom: scale(2),
        }}
      >
        В ближайшее время здесь появится сводка по проекту. Будут учтены заполненность перифирий, наличие пересечений и
        ошибок в данных. Пока что вслепую позволяем передать запрос на API генератора кода.
      </p>
      {data.isLoaded && (
        <div
          css={{
            maxWidth: scale(120),
            marginBottom: scale(2),
            padding: scale(2),
            borderRadius: scale(1),
            ...(data.error
              ? {
                  background: colors.error,
                  color: colors.white,
                }
              : {
                  background: colors.success,
                  color: colors.black,
                }),
          }}
        >
          {data.error ? (
            data.error
          ) : (
            <p>
              Ваша ссылка на скачивание:
              <Button as="a" href={data.link?.replace('https', 'http')} download>
                скачать
              </Button>
            </p>
          )}
        </div>
      )}
      <Button
        disabled={data.isLoaded}
        onClick={async () => {
          try {
            const result = await generateProject.mutateAsync(store.getState());

            setData({
              isLoaded: true,
              link: result.data.link,
            });
          } catch (err: any) {
            console.error(err);
            setData({
              isLoaded: true,
              error: err.message,
            });
          }
        }}
      >
        Сгенерировать архив проекта
      </Button>
    </div>
  );
};

export default ExportView;
