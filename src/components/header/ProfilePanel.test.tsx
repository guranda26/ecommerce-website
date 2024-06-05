import { render, screen, fireEvent } from '@testing-library/react';
import ProfilePanel from './ProfilePanel';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import * as myToken from '../../../sdk/myToken';
import { clientMaker } from '../../../sdk/createClient';

vi.mock('../../../sdk/myToken', () => ({
  isExist: vi.fn(),
  getMyToken: vi.fn(),
}));

vi.mock('../../../sdk/createClient', () => ({
  clientMaker: vi.fn(),
}));

const mockApiRoot = {
  someMethod: vi.fn(),
  anotherMethod: vi.fn(),
};

describe('ProfilePanel Component', () => {
  const handleProfile = vi.fn();
  const mockUserContext = { apiRoot: mockApiRoot };

  const renderProfilePanel = (isLogin: boolean) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    myToken.isExist.mockReturnValue(isLogin);
    return render(
      <UserContext.Provider value={mockUserContext}>
        <BrowserRouter>
          <ProfilePanel handleProfile={handleProfile} />
        </BrowserRouter>
      </UserContext.Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login and register links when not logged in', () => {
    renderProfilePanel(false);

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.queryByText('My profile')).toBeNull();
    expect(screen.queryByText('Log out')).toBeNull();
  });

  it('renders profile link and logout button when logged in', () => {
    renderProfilePanel(true);

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('My profile')).toBeInTheDocument();
    expect(screen.getByText('Log out')).toBeInTheDocument();
    expect(screen.queryByText('Login')).toBeNull();
    expect(screen.queryByText('Register')).toBeNull();
  });

  it('calls handleProfile on link click', () => {
    renderProfilePanel(false);

    fireEvent.click(screen.getByText('Login'));
    expect(handleProfile).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Register'));
    expect(handleProfile).toHaveBeenCalled();
  });

  it('calls logOut on button click', () => {
    renderProfilePanel(true);

    fireEvent.click(screen.getByText('Log out'));
    expect(myToken.isExist).toHaveBeenCalled();
    expect(clientMaker).toHaveBeenCalled();
    expect(screen.queryByText('My profile')).toBeNull();
    expect(screen.queryByText('Log out')).toBeNull();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });
});
