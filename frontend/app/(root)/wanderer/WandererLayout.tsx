import { type ReactNode } from "react";
import styles from './WandererLayout.module.css';

interface LayoutProps {
  sidePanel: ReactNode,
  mainPanel: ReactNode,
}

export default function WandererLayout({ sidePanel, mainPanel }: LayoutProps) {

  return (
    <div className={styles.wandererContainer}>
      <div className={styles.sidePanelContainer}>
        {sidePanel}
      </div>
      <div className={styles.mainPanelContainer}>
        {mainPanel}
      </div>
    </div>
  )
}