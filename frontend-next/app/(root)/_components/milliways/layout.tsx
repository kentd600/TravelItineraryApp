"use client";

import styles from './milliways.module.css';

import MilliwaysAuth from "./auth";
import MilliwaysNav from "./nav";

import { Barrio } from 'next/font/google';
import { classNames } from '@/app/_utility/utilityFuncs';

const barrio = Barrio({
  weight: "400"
})

export default function MilliwaysLayout() {
  return (
    <div className={classNames(styles.layoutContainer, barrio.className)}>
      <MilliwaysNav />
      <MilliwaysAuth />
    </div>
  )
}