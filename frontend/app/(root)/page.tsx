'use client';

import styles from './page.module.css';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LenisRef, ReactLenis } from 'lenis/react';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import WandererHero from './_components/milliways/hero';
import { Matangi } from 'next/font/google';

function drawScaledImage(image: HTMLImageElement, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const widthRatio = canvas.width / image.width;
  const heightRatio = canvas.height / image.height;
  const ratio = Math.max(widthRatio, heightRatio);
  const shiftX = (canvas.width - image.width * ratio) / 2;
  const shiftY = (canvas.height - image.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, image.width, image.height, shiftX, shiftY, image.width * ratio, image.height * ratio);
}

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const lenisRef = useRef<LenisRef>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsClient(true);
    const images: HTMLImageElement[] = [];
    const imageSeq = { frame: 0 };
    const frameCount = 95;

    const canvas = canvasRef.current!
    const canvasCtx = canvas.getContext("2d")!;

    function updateCanvasSize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const img = images[imageSeq.frame];
      if (img) drawScaledImage(img, canvas, canvasCtx);
    }
    

    function loadImages() {
      for (let i = 0; i < frameCount; i++) {
        const img = document.createElement('img');
        img.src = `/vids/frames/${(i + 1).toString().padStart(4, '0')}.webp`
        images[i] = img;
      }
    }

    updateCanvasSize();
    loadImages();

    window.addEventListener('resize', updateCanvasSize)

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
        if (img) drawScaledImage(img, canvas, canvasCtx);
      }
    })

    images[0].onload = () => drawScaledImage(images[0], canvas, canvasCtx);

    lenisRef.current?.lenis?.on("scroll", ScrollTrigger.update);

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    
    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener('resize', updateCanvasSize)
    };
  }, [])

  useGSAP(() => {
    if(!logoRef.current) return;
    // gsap.to(logoRef.current, {
    //   scrollTrigger: {
    //     trigger: "#videoEnd",
    //     start: "top top",
    //     end: "bottom bottom",
    //     scrub: 1
    //   },
    //   x: 400,
    //   rotation: 360,
    //   ease: 'none',
    //   duration: 3
    // })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#videoEnd",
        start: "top top",
        end: "bottom bottom",
        scrub: 1
      }
    });
    tl.from(logoRef.current, { opacity: 0, scale: 0.5, transform: 'translateY(30vh)' })
    tl.to(logoRef.current, { duration: 0.3, opacity: 100, scale: 1, transform: 'translateY(0)' })
  }, { dependencies: [isClient] })

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
        <section className={styles.heroSection}>
          <canvas
            ref={canvasRef}
            className={styles.videoCanvas}
          />
          <div className={styles.logoSvgContainer}>
            {isClient && <WandererHero
              width={Math.min(window.innerWidth - 100, 1000)}
              height={Math.min((window.innerWidth - 100) * 0.6, 600)}
              className={styles.wandererHero}
              ref={logoRef}
            />}
          </div>
          <div id='videoEnd' className={styles.videoEnd}></div>
        </section>
      </ReactLenis>
    </>
  );
}
