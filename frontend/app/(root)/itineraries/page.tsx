'use client';

import ky from "ky"
import useSWR, { mutate } from "swr";
import ItineraryCard from "./_components/itineraryCard";
import { ChangeEvent, useState } from "react";

const fetcher = (url: string) => ky.get(url, {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
}).json()

type itineraries = Record<string, any>[] | undefined | null;

interface itinerariesResponse {
  itineraries: itineraries,
  isLoading: boolean,
  isError: Error
}

function useItineraries (): itinerariesResponse {
  const { data, error, isLoading, mutate } = useSWR(`${process.env.NEXT_PUBLIC_WANDERER_API}/itinerary`, fetcher)

  return {
    itineraries: data as itineraries,
    isLoading,
    isError: error
  }
}

export default function page() {
  const { itineraries } = useItineraries();
  const [formState, setFormState] = useState<string>('');

  async function createItinerary() {
    const result: itineraries = await ky.post(`${process.env.NEXT_PUBLIC_WANDERER_API}/itinerary/create`, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      json: {
        title: formState
      }
    }).json();
    console.log(result);
    mutate(`${process.env.NEXT_PUBLIC_WANDERER_API}/itinerary`);
    setFormState('');
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormState(e.target.value);
  }

  return (
    <div>
      <form>
        <label htmlFor="itineraryName"></label>
        <input
          type="text"
          id="itineraryName"
          name="itineraryName"
          onChange={handleChange}
          value={formState}
        />
        <button
          type="button"
          onClick={createItinerary}
        >
            Create New Itinerary
        </button>
      </form>
      <p>Or, continue with one of your existing itineraries:</p>
      <div>
        {itineraries ? itineraries.map((i, idx) => {
          const keyVal = `itineraryCard_${idx}`;
          return <ItineraryCard key={keyVal} id={keyVal} itinerary={i}/>
        }) : null}
      </div>
    </div>
  )
}