"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from './milliways.module.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { classNames } from '@/app/_utility/utilityFuncs';
import { authClient } from '@/app/_utility/auth-client';
import { redirect, RedirectType } from 'next/navigation';
import { useAuthContext } from '../../wanderer/context/AuthContext';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const {
    data: session,
    isPending,
    error,
    refetch
  } = authClient.useSession();

  const authContainer = useRef<HTMLDivElement>(null);
  const authPopOut = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP();
  const [poppedState, setPoppedState] = useState(false);
  const [inputState, setInputState] = useState({
    email: '',
    password: ''
  })

  const expandAuth = contextSafe(() => {
    gsap.to(authPopOut.current, {...authPopped, width: Math.min(500, window.innerWidth)});
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

  function handleInput(evt: React.ChangeEvent<HTMLInputElement>) {
    setInputState(prev => ({
      ...prev,
      [evt.target.name]: evt.target.value
    }))
  }

  function togglePopout() {
    if (poppedState) {
      hideAuth();
      setPoppedState(false);
    } else {
      expandAuth();
      setPoppedState(true);
      document.addEventListener('mousedown', handleClickOutside);
    }
  }

  async function handleLogin() {
    const { data, error } = await authClient.signIn.email({
      ...inputState
    },{
      credentials: 'include'
    });
    console.log(data);
    if (error) return;
    if (data) {
      togglePopout();
      setInputState({
        email: '',
        password: ''
      })
      const {
        data: session
      } = await authClient.getSession();
      console.log(session);
      redirect('/wanderer', RedirectType.push);
    }
  }

  async function handleSignout() {
    await authClient.signOut();
    refetch();
    router.push('/');
  }

  return (
    <div
      className={styles.authContainer}
      ref={authContainer}
    >
      {!session ?
      <button
        type='button'
        onClick={togglePopout}
        className={classNames(styles.authToggle, styles.milliButton)}
      >
        Login
      </button> : 
      <button
        type='button'
        onClick={handleSignout}
        className={classNames(styles.authToggle, styles.milliButton)}
      >
        Sign Out
      </button>}
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
              <label htmlFor="email">Username</label>
              <input type="text" name='email' onChange={handleInput} value={inputState.email}/>
            </div>
            <div className={styles.formField}>
              <label htmlFor="password">Password</label>
              <input type="password" name='password' onChange={handleInput} value={inputState.password}/>
            </div>
            <button
              className={classNames(styles.milliButton, styles.loginButton)}
              type='button'
              onClick={handleLogin}
            >Log In</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}