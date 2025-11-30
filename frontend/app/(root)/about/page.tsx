'use client';

import { authClient } from "@/app/_utility/auth-client"
import Image from "next/image"


export default function AboutPage() {
  const {
    data: session,
    isPending,
    error
  } = authClient.useSession();

  return (
    <>
      <section>
        <h2>About Wanderer</h2>
        <p>This app aims to be an inspiring travel itinerary planner that helps to give your dream trips a concrete vision.</p>
      </section>
    </>
  )
}