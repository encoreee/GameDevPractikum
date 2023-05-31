import { renderEl } from '@/utils/test-render';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import LeaderboardPage from './LeaderboardPage';
import { store } from '../../app/store';

describe('Leaderboard page', () => {
  test('page should be correctly rendered', () => {
    const sampleStore = store;

    const { getByText } = renderEl(
      <Provider store={sampleStore}>
        <Router>
          <LeaderboardPage />
        </Router>
      </Provider>
    );

    expect(getByText('Leaders')).toBeInTheDocument();
  });
});
