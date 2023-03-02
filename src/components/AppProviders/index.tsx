import store, { persistor } from '@store/index';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export interface AppProvidersProps {
  children: ReactNode | ReactNode[];
}

const AppProviders = ({ children }: AppProvidersProps) => (
  <Provider store={store}>
    <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);

export default AppProviders;
