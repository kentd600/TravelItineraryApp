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

interface CreateResJson {
 id: string
}

type CreateRes = CreateResJson | null | undefined

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

function checkValidity(value: string, itineraries: itineraries) {
  const blank = value === '';
  const duped = !!itineraries?.find(itinerary => value === itinerary.title);
  const valid = !blank && !duped;
  let errMessage = '';
  if (blank) {
    errMessage = 'Itinerary must have a title!'
  } else if (duped) {
    errMessage = 'Itinerary name must be unique!'
  } 
  return {
    valid,
    errMessage
  }
}

export default function page() {
  const { itineraries, isError, isLoading } = useItineraries();
  const [reqState, setReqState] = useState(false);
  const [formState, setFormState] = useState({
    input: '',
    valid: true,
    errMessage: ''
  });
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
    if (reqState) return;
    const { valid, errMessage } = checkValidity(formState.input, itineraries);
    if (!valid) {
      setFormState(prev => ({
        ...prev,
        valid,
        errMessage
      }))
      return;
    }
    setReqState(true);
    const result: CreateRes = await ky.post(`${process.env.NEXT_PUBLIC_WANDERER_API}/itinerary/create`, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      json: {
        title: formState.input
      }
    }).json();
    setReqState(false);
    router.push(`/wanderer/${result!.id}`);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { valid, errMessage } = checkValidity(e.target.value, itineraries);
    setFormState(prev => ({
      ...prev,
      input: e.target.value,
      valid,
      errMessage
    }));
  }

  return (
    <div className={styles.itinerariesPage}>
      <form className={styles.createItineraryForm}>
        <div className={styles.titleInputContainer}>
          <label htmlFor="itineraryName">Give your itinerary a title:</label>
          <input
            type="text"
            id="itineraryName"
            name="itineraryName"
            onChange={handleChange}
            value={formState.input}
          />
          <p className={styles.warning}>{formState.valid ? null : formState.errMessage}</p>
        </div>
        <button
          type="button"
          onClick={createItinerary}
          className={`globalButtonStyle ${styles.createButton}`}
        >
            Create New Itinerary!
        </button>
      </form>
      {itineraries && itineraries.length > 0 ? <div className={styles.itinerariesContainer}>
        <p>Or, continue with one of your existing itineraries:</p>
        {itineraries ? itineraries.map((i, idx) => {
          const keyVal = `itineraryCard_${idx}`;
          return <ItineraryCard key={keyVal} itinerary={i}/>
        }) : null}
      </div> : null}
    </div>
  )
}