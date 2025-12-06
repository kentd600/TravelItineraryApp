'use client';

import { authClient } from "@/app/_utility/auth-client";
import { WdContextProvider } from "../context/WandererContext";
import WandererOuter from "./WandererOuter";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "../../loading";

export default function WandererPage() {
  const { data: session, isPending, error } = authClient.useSession();
  const router = useRouter();
  useEffect(() => {
    if(!isPending && !session) {
      router.replace('/');
    }
  },[isPending, session])

  if(isPending) {
    return <Loading />
  }

  return (
    <WdContextProvider>
      <WandererOuter />
    </WdContextProvider>
  )
}