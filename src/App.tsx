import { useSelector } from 'react-redux';

import GlobalStyles from '@components/GlobalStyles';

import { ErrorBoundary } from '@components/ErrorBoundary';
import ProjectView from '@views/project';
import { AuthState } from '@store/auth';
import AuthView from '@views/auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProjectsView from '@views/projects';
import { RootState } from './store';

function ProjectRouter() {
  return (
    <Routes>
      <Route path="/" element={<ProjectsView />} />
      <Route path="/projects" element={<ProjectsView />} />
      <Route path="/projects/:id/*" element={<ProjectView />} />
    </Routes>
  );
}

const basename = process.env.BASE_URL;

function App() {
  const authState = useSelector<RootState, AuthState>(state => state.auth);
  const isAuth = !!authState.user || !localStorage.getItem('TEST_AUTH'); // TODO: решить делаем ли авторизацию обязательной

  return (
    <ErrorBoundary>
      <BrowserRouter basename={basename}>
        <GlobalStyles />
        {!isAuth ? <AuthView /> : <ProjectRouter />}
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
