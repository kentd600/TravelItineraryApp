'use client';

import Wanderer from "./Wanderer";
import { useParams } from "next/navigation";
import Loading from "../../loading";
import { Suspense, useContext, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import useSWR, { KeyedMutator, mutate } from "swr";
import ky from "ky";
import { WandererContext, WdContextProvider } from "../context/WandererContext";
import { RMapContextProvider } from "maplibre-react-components";
import { LocationDetails } from "../WandererTypes";

interface Itinerary {
  itinerary: { [key: string]: string },
  locations: LocationDetails[]
}

interface UseItineraryRes {
  itinerary: Itinerary
  isLoading: boolean,
  isError: any,
  mutate: KeyedMutator<Itinerary>
}

const fetcher = (url: string) => ky.get(url, {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
}).json()

function useItinerary(id: string) {
  const {
    data,
    error,
    isLoading,
    mutate
  } = useSWR(id ? `${process.env.NEXT_PUBLIC_WANDERER_API}/itinerary/${id}` : null, fetcher);

  return {
    itinerary: data,
    isLoading,
    isError: error,
    mutate
  }
}

export default function WandererPage() {
  const ctx = useContext(WandererContext);
  const { isPending } = useAuthContext()!;
  const params = useParams<{ id: string }>();

  useEffect(() => {
    if(!ctx) throw new Error('Missing context!');
    ctx.dispatch({ type: 'setItineraryId', payload: { itineraryId: params.id }});
  },[])

  const {
    itinerary,
    isLoading,
    isError,
    mutate
  } = useItinerary(ctx?.wanderState.currentItinerary!) as UseItineraryRes;

  useEffect(() => {
    if (!ctx) throw new Error('Missing context!');
    if (isLoading) return;
    if (!itinerary) return;
    ctx.dispatch({ type: 'setItineraryDetails', payload: { itineraries: itinerary.locations }});
  }, [itinerary])

  if (isPending) {
    return (
      <Loading />
    )
  }

  return (
    <Suspense fallback={<Loading />}>
        <RMapContextProvider>
          <Wanderer />
        </RMapContextProvider>
    </Suspense>
  )
}