import { renderEl } from '@/utils/test-render';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import Homepage from './Homepage';
import { store } from '../../app/store';

describe('Home page', () => {
  test('page should render correctly', () => {
    const sampleStore = store;

    const { getByText } = renderEl(
      <Provider store={sampleStore}>
        <Router>
          <Homepage />
        </Router>
      </Provider>
    );

    expect(getByText('Start game')).toBeInTheDocument();
  });
});
