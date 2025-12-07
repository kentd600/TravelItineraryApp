'use client';

import styles from './page.module.css';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LenisRef, ReactLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

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
  const logoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
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

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#videoEnd",
        start: "top top",
        end: "bottom bottom",
        scrub: 1
      }
    })

    timeline.addLabel('start')
      .from(styles.logoSvgContainer, { scale: 0.3 })
      .to(styles.logoSvgContainer, { sale: 2 })
      .addLabel('end');

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

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
        <section className={styles.heroSection}>
          <canvas
            ref={canvasRef}
            className={styles.videoCanvas}
          />
          <div className={styles.logoSvgContainer} ref={logoContainerRef}>
            <Image
              className={styles.wandererHero}
              src='/svg/WandererHeroFinal.svg'
              height={Math.min(window.innerWidth - 100, 1000) * 0.6}
              width={Math.min(window.innerWidth - 100, 1000)}
              alt='Wanderer logo.'
              unoptimized
            />
          </div>
          <div id='videoEnd' className={styles.videoEnd}></div>
        </section>
      </ReactLenis>
    </>
  );
}
