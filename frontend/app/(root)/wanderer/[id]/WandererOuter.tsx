'use client';

import Wanderer from "./Wanderer";
import { useParams } from "next/navigation";
import Loading from "../../loading";
import { Suspense, useContext, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import useSWR, { mutate } from "swr";
import ky from "ky";
import { WandererContext, WdContextProvider } from "../context/WandererContext";
import { RMapContextProvider } from "maplibre-react-components";

const fetcher = (url: string) => ky.get(url, {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
}).json()

function useItinerary (id: string) {
  const { data, error, isLoading, mutate } = useSWR(`${process.env.NEXT_PUBLIC_WANDERER_API}/itinerary/${id}`, fetcher);

  return {
    itinerary: data,
    isLoading,
    isError: error
  }
}

export default function WandererPage() {
  const ctx = useContext(WandererContext);
  const { isPending } = useAuthContext()!;
  const params = useParams<{ id: string }>();
  const { itinerary } = useItinerary(params.id);

  useEffect(() => {
    ctx?.dispatch({ type: 'setItineraryId', payload: { itineraryId: params.id }})
  }, [])

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