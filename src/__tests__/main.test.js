import { render, screen } from '@testing-library/react';
import App from 'pages/main';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/omdb url/i);
  expect(linkElement).toBeInTheDocument();
});
