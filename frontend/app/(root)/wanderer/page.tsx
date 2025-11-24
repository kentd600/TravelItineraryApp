'use client';

import { authClient } from "@/app/_utility/auth-client";

import Wanderer from "./Wanderer";
import { redirect, RedirectType } from "next/navigation";
import Loading from "./loading";
import { Suspense } from "react";
import { useAuthContext } from "./context/AuthContext";

export default function WandererPage() {
  const { isPending } = useAuthContext()!;

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