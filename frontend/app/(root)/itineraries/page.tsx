'use client';

import ky from "ky"
import useSWR from "swr";
import ItineraryCard from "./_components/itineraryCard";

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
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_WANDERER_API}/itinerary`, fetcher)

  return {
    itineraries: data as itineraries,
    isLoading,
    isError: error
  }
}

export default function page() {
  const { itineraries } = useItineraries();

  async function createItinerary() {
    const result = await ky.post(`${process.env.NEXT_PUBLIC_WANDERER_API}/itinerary/create`, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      json: {
        title: 'Test itinerary'
      }
    }).json();
  }

  return (
    <div>
      <button type="button" onClick={createItinerary}>Create New Itinerary</button>
      <p>Or, continue with one of your existing itineraries:</p>
      <div>
        {itineraries ? itineraries.map(i => <ItineraryCard itinerary={i}/>) : null}
      </div>
    </div>
  )
}