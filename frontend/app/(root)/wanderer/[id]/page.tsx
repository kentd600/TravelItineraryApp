'use client';

import { WdContextProvider } from "../context/WandererContext";
import WandererPage from "./WandererOuter";

export default function page() {
  return (
    <WdContextProvider>
      <WandererPage />
    </WdContextProvider>
  )
}