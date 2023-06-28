import { renderEl } from '@/utils/test-render';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import ProjectsPage from './ProfilePage';
import { store } from '../../app/store';

describe('Profile page', () => {
  test('page should be correctly rendered', async () => {
    const sampleStore = store;

    const { getByText } = renderEl(
      <Provider store={sampleStore}>
        <Router>
          <ProjectsPage />
        </Router>
      </Provider>
    );

    expect(getByText('Galaga')).toBeInTheDocument();
    expect(getByText('cancel')).toBeInTheDocument();
  });
});
