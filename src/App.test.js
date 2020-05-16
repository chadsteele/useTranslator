import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders english in app', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/english/i);
  expect(linkElement).toBeInTheDocument();
});

//need more tests!