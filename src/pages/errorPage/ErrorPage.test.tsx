import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import { expect, vi, it, describe } from 'vitest';

vi.mock('../../assets/images/404.png', () => ({
  default: 'mocked-404.png',
}));

describe('ErrorPage', () => {
  it('renders 404 error page', () => {
    vi.mock('react-router-dom', async () => {
      const actual =
        await vi.importActual<typeof import('react-router-dom')>(
          'react-router-dom'
        );
      return {
        ...actual,
        useRouteError: vi.fn().mockImplementation(() => ({ status: 404 })), // Mock implementation
      };
    });
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    expect(screen.getByAltText('Error page image')).toHaveAttribute(
      'src',
      'mocked-404.png'
    );
    expect(screen.getByText('PageNotFound')).toBeInTheDocument();
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});
