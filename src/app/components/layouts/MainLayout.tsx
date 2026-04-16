import { Outlet } from 'react-router'
import SideBarDesktop from '../sideBar/desktop/SideBarDesktop'
import './mainLayout.css'
import AppBarDesktop from '../appBar/desktop/AppBarDesktop'

const MainLayout = () => {
  return (
    <div className='MainLayoutContainer'>
        <SideBarDesktop />

        <main className='MainContent'>
            <AppBarDesktop />
            <Outlet />
        </main>
    </div>
  )
}

export default MainLayout