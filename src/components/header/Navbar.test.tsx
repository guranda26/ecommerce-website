import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { describe, it, expect, vi } from 'vitest';

describe('Navbar Component', () => {
  const handleBurgerBtn = vi.fn();

  const renderNavbar = () => {
    return render(
      <BrowserRouter>
        <Navbar handleBurgerBtn={handleBurgerBtn} />
      </BrowserRouter>
    );
  };

  it('renders all nav links correctly', () => {
    renderNavbar();

    expect(screen.getByTitle('Home')).toBeInTheDocument();
    expect(screen.getByTitle('Catalog')).toBeInTheDocument();
    expect(screen.getByTitle('About us')).toBeInTheDocument();
  });

  it('calls handleBurgerBtn on nav link click', () => {
    renderNavbar();

    const homeLink = screen.getByTitle('Home');
    fireEvent.click(homeLink);
    expect(handleBurgerBtn).toHaveBeenCalled();

    const catalogLink = screen.getByTitle('Catalog');
    fireEvent.click(catalogLink);
    expect(handleBurgerBtn).toHaveBeenCalled();

    const aboutLink = screen.getByTitle('About us');
    fireEvent.click(aboutLink);
    expect(handleBurgerBtn).toHaveBeenCalled();
  });
});
