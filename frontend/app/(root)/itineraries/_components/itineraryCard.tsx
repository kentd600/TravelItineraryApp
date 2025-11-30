import ky from "ky";
import { redirect, RedirectType } from "next/navigation";
import { ReactNode, useState } from "react";
import { mutate } from "swr";

export default function ItineraryCard ({ itinerary }: { itinerary: Record<string, any> }) {
  const { title, _id } = itinerary;
  const [reqState, setReqState] = useState(false);

  function handleClick() {
    redirect(`/wanderer/${_id}`, RedirectType.push);
  }

  async function deleteItinerary() {
    if(reqState) return;
    setReqState(true);
    const result = await ky.delete(`${process.env.NEXT_PUBLIC_WANDERER_API}/itinerary/${_id}`, {
      credentials: 'include'
    })
    setReqState(false);
    mutate(`${process.env.NEXT_PUBLIC_WANDERER_API}/itinerary`);
  }

  return (
    <div>
      <h1>{title}</h1>
      <button type="button" onClick={handleClick}>Edit</button>
      <button type="button" onClick={deleteItinerary}>Delete</button>
    </div>
  )
}