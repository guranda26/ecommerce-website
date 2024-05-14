import React from 'react'
import { Outlet } from 'react-router-dom'

function RootLayout(): React.JSX.Element {
  return (
    <div className='container'>
      <Outlet />
    </div>
  )
}

export default RootLayout
