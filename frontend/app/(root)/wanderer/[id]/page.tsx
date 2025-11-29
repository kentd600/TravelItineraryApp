'use client';

import Wanderer from "./Wanderer";
import { useParams } from "next/navigation";
import Loading from "../../loading";
import { Suspense } from "react";
import { useAuthContext } from "../context/AuthContext";
import useSWR, { mutate } from "swr";
import ky from "ky";

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
  const { isPending } = useAuthContext()!;
  const params = useParams<{ id: string }>();
  const { itinerary } = useItinerary(params.id);
  console.log(itinerary);

  if (isPending) {
    return (
      <Loading />
    )
  }

  return (
    <Suspense fallback={<Loading />}>
      <Wanderer />
    </Suspense>
  )
}