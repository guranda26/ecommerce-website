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
      setOpenPanel(false);
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  const open = () => {
    setOpenPanel(true);
    document.addEventListener('mousedown', handleClickOutside);
  };

  const close = () => {
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
      {openPanel && (
        <div ref={profilePanelRef} className="profile-panel">
          <ProfilePanel handleProfile={handleProfile} />
        </div>
      )}
    </>
  );
}

export default Profile;
