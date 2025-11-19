"use client";

import React, { useRef, useState } from 'react';
import styles from './milliways.module.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { classNames } from '@/app/_utility/utilityFuncs';

gsap.registerPlugin(useGSAP);

const authPopped = {
  width: 500,
  duration: 0.2,
  scaleY: 1
}

const authHidden = {
  width: 100,
  duration: 0.2,
  scaleY: 0
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

  function handleClickOutside(evt: MouseEvent) {
    if (authContainer.current && evt.target instanceof Node) {
      if (!authContainer.current.contains(evt.target)) {
        hideAuth();
        setPoppedState(false);
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }

  const togglePopout = () => {
    if (poppedState) {
      hideAuth();
      setPoppedState(false);
    } else {
      expandAuth();
      setPoppedState(true);
      document.addEventListener('mousedown', handleClickOutside);
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
          <fieldset className={styles.formFieldset}>
            <legend hidden>Login Form</legend>
            <div className={styles.formField}>
              <label htmlFor="username">Username</label>
              <input type="text" name='username'/>
            </div>
            <div className={styles.formField}>
              <label htmlFor="password">Password</label>
              <input type="password" name='password'/>
            </div>
            <button className={classNames(styles.milliButton, styles.loginButton)}>Login/Signup</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}