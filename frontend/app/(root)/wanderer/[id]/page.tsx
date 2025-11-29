'use client';

import { authClient } from "@/app/_utility/auth-client";
import { useRouter } from "next/router";

import Wanderer from "./Wanderer";
import { redirect, RedirectType, useParams } from "next/navigation";
import Loading from "../../loading";
import { Suspense } from "react";
import { useAuthContext } from "../context/AuthContext";

export default function WandererPage() {
  const { isPending } = useAuthContext()!;
  const params = useParams();
  console.log(params);

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