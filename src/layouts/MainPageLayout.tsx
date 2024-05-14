import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/header/Header'

function MainPageLayout(): React.JSX.Element {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}

export default MainPageLayout
