import { Outlet } from 'react-router'
import './App.css'
import AppLayout from './AppLayout'
import AppNav from './AppNav'

function App() {
  return (
    <AppLayout
      nav={<AppNav />}
      outlet={<Outlet />}
    />
  )
}

export default App
