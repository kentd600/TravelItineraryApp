'use client';

import { authClient } from "@/app/_utility/auth-client";
import React, { useState } from "react";
import styles from './signup.module.css';
import { Story_Script } from 'next/font/google';
import { classNames } from '@/app/_utility/utilityFuncs';

type inputField = string | null

interface userInfo {
  email: string,
  password: string,
  name: string,
}

interface userInput {
  email: inputField,
  password: inputField,
  name: inputField
}

async function signUp(userInfo: userInfo) {
  const { email, password, name } = userInfo;
  const { data, error } = await authClient.signUp.email({
  email,
  password,
  name,
  callbackURL: '/itineraries'
  }, {
    onRequest: (ctx) => {
      console.log(ctx);
    },
    onSuccess: (ctx) => {
      console.log(ctx);
    },
    onError: (ctx) => {
      console.log(ctx);
    }
  });
  console.log( data, error );
}

async function handleSignup(formState: userInput) {
  if (!formState.email || !formState.name || !formState.password) return;
  signUp(formState as userInfo);
}

export default function() {
  const [formState, setFormState] = useState<userInput>({
    email: null,
    password: null,
    name: null
  });

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setFormState(prev => ({
      ...prev, [evt.target.name]: evt.target.value
    }))
  }

  return (
    <div className={classNames(styles.signupPage)}>
      <div className={styles.signupInfoContainer}>
        <h2>Sign Up:</h2>
        <p>Sign up to start building travel itineraries with Wanderer.</p>
      </div>
      <form className={styles.signupForm}>
        <fieldset className={styles.formFieldset}>
          <legend hidden>Signup Form</legend>
          <div className={styles.formField}>
            <label htmlFor="email">Email:</label>
            <input type="text" onChange={handleChange} name="email" required/>
          </div>
          <div className={styles.formField}>
            <label htmlFor="password">Password:</label>
            <input type="password" onChange={handleChange} name="password" />
          </div>
          <div className={styles.formField}>
            <label htmlFor="name">Name:</label>
            <input type="text" onChange={handleChange} name="name" />
          </div>
          <button type="button" className={styles.signupButton} onClick={() => handleSignup(formState)}>Signup</button>
        </fieldset>
      </form>
    </div>
  )
}