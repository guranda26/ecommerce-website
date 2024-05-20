import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from './App';

// Mock the child components used in the routes
vi.mock('./src/layouts/MainPageLayout', () => ({
  default: () => <div>MainPageLayout</div>,
}));
vi.mock('./src/layouts/RootLayout', () => ({
  default: () => <div>RootLayout</div>,
}));
vi.mock('./src/pages/catalog/Catalog', () => ({
  default: () => <div>Catalog</div>,
}));
vi.mock('./src/pages/errorPage/ErrorPage', () => ({
  default: () => <div>ErrorPage</div>,
}));
vi.mock('./src/pages/login/Login', () => ({
  default: () => <div>Login</div>,
}));
vi.mock('./src/pages/mainPage/MainPage', () => ({
  default: () => <div>MainPage</div>,
}));
vi.mock('./src/pages/register/Register', () => ({
  default: () => <div>RegistrationForm</div>,
}));

describe('App Routing', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
  });

  it('renders MainPageLayout and MainPage for root route', () => {
    render(<App />);

    expect(screen.getByText('Discover Our New Collection')).toBeInTheDocument();
  });

  it('renders Catalog for /catalog route', () => {
    window.history.pushState({}, 'Catalog Page', '/catalog');

    render(<App />);

    // // Catalog Example Page
    expect(screen.getByText('Catalog Example page')).toBeInTheDocument();
  });

  it('renders Login for /login route', () => {
    window.history.pushState({}, 'Login Page', '/login');

    render(<App />);

    // Login Example Page
    expect(screen.getByText('Login Example page')).toBeInTheDocument();
  });

  it('renders RegistrationForm for /register route', () => {
    window.history.pushState({}, 'Register Page', '/register');

    render(<App />);
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('renders ErrorPage for an invalid route', () => {
    window.history.pushState({}, 'Invalid Route', '/invalid-route');
    render(<App />);

    expect(screen.getByText('PageNotFound')).toBeInTheDocument();
  });
});
