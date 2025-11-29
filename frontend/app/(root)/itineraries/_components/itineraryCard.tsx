import { ReactNode } from "react";

export default function ItineraryCard ({ itinerary, id }: { itinerary: Record<string, any>, id: string }) {
  const { title } = itinerary;
  return (
    <div id={id}>
      <h1>{title}</h1>
    </div>
  )
}