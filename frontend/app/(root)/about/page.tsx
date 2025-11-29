import { authClient } from "@/app/_utility/auth-client"
import Image from "next/image"


export default async function AboutPage() {
  const {
    data: session
  } = await authClient.getSession();
  console.log(session);
  return (
    <>
      <section>
        <h2>About Wanderer</h2>
        <p>This app aims to be an inspiring travel itinerary planner that helps to give your dream trips a concrete vision.</p>
      </section>
    </>
  )
}