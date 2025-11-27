import { ReactNode } from "react";

export default function ItineraryCard ({ itinerary }: { itinerary: Record<string, any> }) {
  const { title } = itinerary;
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}