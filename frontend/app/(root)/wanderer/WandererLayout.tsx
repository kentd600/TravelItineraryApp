import { type ReactNode } from "react";
import "./WandererLayout.css";

interface LayoutProps {
  sidePanel: ReactNode,
  mainPanel: ReactNode,
}

export default function WandererLayout({ sidePanel, mainPanel }: LayoutProps) {

  return (
    <div className="wanderer__container">
      <div className="side-panel__container">
        {sidePanel}
      </div>
      <div className="main-panel__container">
        {mainPanel}
      </div>
    </div>
  )
}