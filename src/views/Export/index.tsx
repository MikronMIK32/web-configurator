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
      <Button
        onClick={async () => {
          try {
            await generateProject.mutateAsync(store.getState());
          } catch (err: any) {
            console.error(err);
            alert(err.message);
          }
        }}
      >
        Сгенерировать архив проекта
      </Button>
    </div>
  );
};

export default ExportView;
