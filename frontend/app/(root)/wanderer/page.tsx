import { redirect, RedirectType } from "next/navigation";
import WandererPage from "./[id]/page";

export default function WandererRoot({ params }: { params: { slug: string } }) {
  if (!params.slug) redirect('/itineraries', RedirectType.replace);
  return (
    <WandererPage />
  )
}