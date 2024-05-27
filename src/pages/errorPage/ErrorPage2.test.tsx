import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import { expect, vi, it, describe } from 'vitest';

vi.mock('../../assets/images/planet.png', () => ({
  default: 'mocked-planet.png',
}));

describe('ErrorPage', () => {
  it('renders generic error page for other errors', () => {
    vi.mock('react-router-dom', async () => {
      const actual =
        await vi.importActual<typeof import('react-router-dom')>(
          'react-router-dom'
        );
      return {
        ...actual,
        useRouteError: vi.fn().mockImplementation(() => ({ status: 500 })), // Mock implementation
      };
    });

    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    expect(screen.getByAltText('Error page image')).toHaveAttribute(
      'src',
      'mocked-planet.png'
    );
    expect(screen.getByText('Something went wrong:')).toBeInTheDocument();
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});
