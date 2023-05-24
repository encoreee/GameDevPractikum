import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const renderEl = (el: React.ReactElement) => {
  return {
    user: userEvent.setup(),
    ...render(el),
  };
};

export * from '@testing-library/react';
export { renderEl };
