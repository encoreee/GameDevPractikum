import { renderEl } from '@/utils/test-render';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import HomePage from './HomePage';
import { store } from '../../app/store';

describe('Home page', () => {
  test('page should render correctly', () => {
    const sampleStore = store;

    const { getByText } = renderEl(
      <Provider store={sampleStore}>
        <Router>
          <HomePage />
        </Router>
      </Provider>
    );

    expect(getByText('start game')).toBeInTheDocument();
  });
});
