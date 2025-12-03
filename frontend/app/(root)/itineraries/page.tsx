'use client';

import ky from "ky"
import useSWR, { mutate } from "swr";
import ItineraryCard from "./_components/itineraryCard";
import { ChangeEvent, useEffect, useState } from "react";
import styles from './page.module.css';
import Loading from "../loading";
import { authClient } from "@/app/_utility/auth-client";
import { useRouter } from "next/navigation";

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
  const { data, error, isLoading, mutate } = useSWR(`${process.env.NEXT_PUBLIC_WANDERER_API}/itinerary`, fetcher);

  return {
    itineraries: data as itineraries,
    isLoading,
    isError: error
  }
}

export default function page() {
  const { itineraries, isError, isLoading } = useItineraries();
  const [formState, setFormState] = useState<string>('');
  const router = useRouter();
  const { data: session, isPending, error } = authClient.useSession();
  useEffect(() => {
    if(!isPending && !session) {
      router.replace('/');
    }
  },[session, isPending, router]);

  if (isLoading || isPending) {
    return <Loading />
  }

  async function createItinerary() {
    if (formState === '') return;
    const result: itineraries = await ky.post(`${process.env.NEXT_PUBLIC_WANDERER_API}/itinerary/create`, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      json: {
        title: formState
      }
    }).json();
    mutate(`${process.env.NEXT_PUBLIC_WANDERER_API}/itinerary`);
    setFormState('');
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormState(e.target.value);
  }

  return (
    <div className={styles.itinerariesPage}>
      <form className={styles.createItineraryForm}>
        <div className={styles.titleInputContainer}>
          <label htmlFor="itineraryName">Give your itinerary a name:</label>
          <input
            type="text"
            id="itineraryName"
            name="itineraryName"
            onChange={handleChange}
            value={formState}
          />
        </div>
        <button
          type="button"
          onClick={createItinerary}
        >
            Create New Itinerary
        </button>
      </form>
      <div className={styles.itinerariesContainer}>
        <p>Or, continue with one of your existing itineraries:</p>
        {itineraries ? itineraries.map((i, idx) => {
          const keyVal = `itineraryCard_${idx}`;
          return <ItineraryCard key={keyVal} itinerary={i}/>
        }) : null}
      </div>
    </div>
  )
}