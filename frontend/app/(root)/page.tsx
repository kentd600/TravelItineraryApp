'use client';

import styles from './page.module.css';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LenisRef, ReactLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, [])

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
        <section className={styles.heroSection}>
          <canvas></canvas>
          <div className={styles.heroContent}>
            <div className={styles.heroHeader}></div>
          </div>
          <Image src='/img/city.jpg' alt='city' width={1000} height={2000}/>
        </section>
      </ReactLenis>
    </>
  );
}
