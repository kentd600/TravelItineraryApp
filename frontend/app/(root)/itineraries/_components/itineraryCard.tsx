import { redirect, RedirectType } from "next/navigation";
import { ReactNode } from "react";

export default function ItineraryCard ({ itinerary }: { itinerary: Record<string, any> }) {
  const { title, _id } = itinerary;

  function handleClick() {
    redirect(`/wanderer/${_id}`, RedirectType.push);
  }

  return (
    <div>
      <h1>{title}</h1>
      <button type="button" onClick={handleClick}>Edit</button>
    </div>
  )
}