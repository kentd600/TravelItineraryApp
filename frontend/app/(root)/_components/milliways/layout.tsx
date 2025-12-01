'use client';

import styles from './milliways.module.css';

import MilliwaysAuth from "./auth";
import MilliwaysNav from "./nav";

import { Londrina_Solid } from 'next/font/google';
import { classNames } from '@/app/_utility/utilityFuncs';

const font = Londrina_Solid({
  weight: "400"
})

export default function MilliwaysLayout() {
  //const layoutContainer = useRef<HTMLDivElement>(null);
  
  return (
    <>
      <div className={styles.layoutSpacer}></div>
      <div 
        className={classNames(styles.layoutContainer, font.className)}
      >
        <MilliwaysNav />
        <MilliwaysAuth />
      </div>
    </>
  )
}