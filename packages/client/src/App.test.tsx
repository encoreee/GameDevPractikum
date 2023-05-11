import { render, screen } from '@testing-library/react';

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
);
const MyMockComponent = () => <div>Hello World</div>;

test('Example test', async () => {
  render(<MyMockComponent />);

  expect(screen.getByText('Hello World')).toBeDefined();
});
