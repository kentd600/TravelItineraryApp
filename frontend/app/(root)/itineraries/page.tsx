'use client';

import ky from "ky"
import useSWR from "swr";

const fetcher = (url: string, options: {}) => ky.post(url, options).json()

function useItineraries (userId: string) {
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_WANDERER_API}/locations`, fetcher)

  return {
    itineraries: data,
    isLoading,
    isError: error
  }
}

export default function page() {
  
  
  async function handleClick() {
    const result = await ky.post(`${process.env.NEXT_PUBLIC_WANDERER_API}/itinerary/test`, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    console.log(result);
  }

  async function createItinerary() {
    const result = await ky.post(`${process.env.NEXT_PUBLIC_WANDERER_API}/itinerary/create`, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      json: {
        title: 'Test itinerary'
      }
    })
  }

  return (
    <div>
      <button type="button" onClick={createItinerary}>Create New Itinerary</button>
      <p>Or, continue with one of your existing itineraries:</p>
      <div>

      </div>
    </div>
  )
}