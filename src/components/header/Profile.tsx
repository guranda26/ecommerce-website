import React, { useCallback, useRef, useState } from 'react';
import './header.css';
import ProfilePanel from './ProfilePanel';

function Profile(): React.JSX.Element {
  const profilePanelRef = useRef<HTMLDivElement>(null);
  const profileBtnRef = useRef<HTMLButtonElement>(null);

  const [openPanel, setOpenPanel] = useState(false);

  const handleClickOutside = useCallback((event: Event) => {
    const target = event.target as Element;
    if (
      profilePanelRef.current &&
      !profilePanelRef.current.contains(target) &&
      !profileBtnRef.current!.contains(target)
    ) {
      close();
    }
  }, []);

  const open = () => {
    profilePanelRef.current!.classList.remove('visually-hidden');
    setOpenPanel(true);
    document.addEventListener('mousedown', handleClickOutside);
  };

  const close = () => {
    profilePanelRef.current!.classList.add('visually-hidden');
    setOpenPanel(false);
    document.removeEventListener('mousedown', handleClickOutside);
  };

  const handleProfile = () => {
    if (openPanel) {
      close();
    } else {
      open();
    }
  };

  return (
    <>
      <button
        ref={profileBtnRef}
        className="profile-btn"
        title="Profile"
        onClick={handleProfile}
        type="button"
      ></button>
      <div ref={profilePanelRef} className="profile-panel visually-hidden">
        <ProfilePanel />
      </div>
    </>
  );
}

export default Profile;
