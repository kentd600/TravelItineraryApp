"use client";

import styles from './milliways.module.css';

import MilliwaysAuth from "./auth";
import MilliwaysNav from "./nav";

import { Story_Script } from 'next/font/google';
import { classNames } from '@/app/_utility/utilityFuncs';
import { useRef } from 'react';

const font = Story_Script({
  weight: "400"
})

export default function MilliwaysLayout() {
  const layoutContainer = useRef<HTMLDivElement>(null);
  
  return (
    <>
      <div className={styles.layoutSpacer}></div>
      <div 
        className={classNames(styles.layoutContainer, font.className)}
        ref={layoutContainer}
      >
        <MilliwaysNav />
        <MilliwaysAuth />
      </div>
    </>
  )
}