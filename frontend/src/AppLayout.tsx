import type { ReactNode } from "react"
import "./AppLayout.css";

interface AppLayout {
  nav: ReactNode,
  outlet: ReactNode,
}

export default function AppLayout({ nav, outlet }: AppLayout) {
  return (
    <div className="App__container">
      <h1>Welcome!</h1>
      <div className="Nav__container">
        {nav}
      </div>
      <div className="Outlet__container">
        {outlet}
      </div>
    </div>
  )
}