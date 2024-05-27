import React from 'react';
import { Outlet } from 'react-router-dom';

function RootLayout(): React.JSX.Element {
  return <Outlet />;
}

export default RootLayout;
