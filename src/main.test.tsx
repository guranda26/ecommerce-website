import { render } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import '@testing-library/jest-dom';
import App from './App';

describe('Main App Rendering', () => {
  it('renders App', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
