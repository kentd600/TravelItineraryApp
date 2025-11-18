"use client";

import { useRef, useState } from 'react';
import styles from './milliways.module.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { classNames } from '@/app/_utility/utilityFuncs';

gsap.registerPlugin(useGSAP);

const authPopped = {
  width: 500,
  height: 'auto',
  right: 0,
  duration: 0.2,
}

const authHidden = {
  width: 100,
  height: 0,
  right: 0,
  duration: 0.2,
}

export default function MilliwaysAuth() {

  const authContainer = useRef<HTMLDivElement>(null);
  const authPopOut = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP();
  const [poppedState, setPoppedState] = useState<boolean>(false);

  const expandAuth = contextSafe(() => {
    gsap.to(authPopOut.current, authPopped);
  })

  const hideAuth = contextSafe(() => {
    gsap.to(authPopOut.current, authHidden);
  })

  const togglePopout = () => {
    if (poppedState) {
      hideAuth();
      setPoppedState(false);
    } else {
      expandAuth();
      setPoppedState(true);
    }
  }

  return (
    <div
      className={styles.authContainer}
      ref={authContainer}
    >
      <button
        onClick={togglePopout}
        className={classNames(styles.authToggle, styles.milliButton)}
      >
        Login
      </button>
      <div
        ref={authPopOut}
        className={styles.authPopOut}
      >
        <form
          action=""
          className={styles.authForm}
        >
          <label htmlFor="username">Username</label>
          <input type="text" name='username'/>
          <label htmlFor="password">Password</label>
          <input type="password" name='password'/>
          <button className={classNames(styles.milliButton, styles.loginButton)}>Login/Signup</button>
        </form>
      </div>
    </div>
  );
}