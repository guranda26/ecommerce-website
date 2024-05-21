import { render, screen } from '@testing-library/react';
import MainPage from './MainPage';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

// Mocking the components
vi.mock('../../components/features/Features', () => ({
  default: () => <div>Features Component</div>,
}));
vi.mock('../../components/services/Services', () => ({
  default: () => <div>Support Component</div>,
}));
vi.mock('../../components/collection/Collection', () => ({
  default: () => <div>Collection Component</div>,
}));
vi.mock('../../components/beutifyYourSpace/BeutifyYourSpace', () => ({
  default: () => <div>BeutifyYourSpace Component</div>,
}));
vi.mock('../../components/rooms/Rooms', () => ({
  default: () => <div>Rooms Component</div>,
}));
vi.mock('../../components/howItWorks/HowItWorks', () => ({
  default: () => <div>HowItWorks Component</div>,
}));

describe('MainPage', () => {
  it('renders all components', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Features Component')).toBeInTheDocument();
    expect(screen.getByText('Support Component')).toBeInTheDocument();
    expect(screen.getByText('Collection Component')).toBeInTheDocument();
    expect(screen.getByText('BeutifyYourSpace Component')).toBeInTheDocument();
    expect(screen.getByText('Rooms Component')).toBeInTheDocument();
    expect(screen.getByText('HowItWorks Component')).toBeInTheDocument();
  });
});
