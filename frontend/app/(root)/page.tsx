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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    const imageSeq = { frame: 0 };
    const frameCount = 95;

    const canvas = canvasRef.current!
    const canvasCtx = canvas.getContext("2d");

    canvas.width = 1920;
    canvas.height = 1080;

    function loadImages() {
      for (let i = 0; i < frameCount; i++) {
        const img = document.createElement('img');
        img.src = `/vids/frames/${(i + 1).toString().padStart(4, '0')}.webp`
        images[i] = img;
      }
    }

    loadImages();

    gsap.to(imageSeq, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: "#videoEnd",
        start: "top top",
        end: "bottom bottom",
        scrub: true
      },
      onUpdate: () => {
        const img = images[imageSeq.frame];
        if (img) canvasCtx?.drawImage(img, 0, 0);
      }
    })

    images[0] = document.createElement('img');
    images[0].src = '/vids/frames/0001.webp';
    images[0].onload = () => canvasCtx?.drawImage(images[0], 0, 0);

    // tl.fromTo(
    //   videoRef.current,
    //   {
    //     currentTime: 0
    //   },
    //   {
    //     currentTime: videoRef.current!.duration || 1
    //   }
    // )

    lenisRef.current?.lenis?.on("scroll", ScrollTrigger.update);
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, [])

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
        <section className={styles.heroSection}>
          <canvas
            ref={canvasRef}
            className={styles.videoCanvas}
          />
          <div id='videoEnd' className={styles.videoEnd}></div>
        </section>
      </ReactLenis>
    </>
  );
}
