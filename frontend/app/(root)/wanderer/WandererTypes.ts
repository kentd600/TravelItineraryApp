type docSubMap = { [key: string]: string } | null | undefined

export interface LocationDetails {
  _id: string
  _itinerary?: string
  details: {
    bbox: Number[],
    geoCoordinates: number[],
    geoType: string,
    coarseLocation?: string | null | undefined,
    continent?: docSubMap,
    country?: docSubMap,
    locality?: docSubMap,
    gid: string,
    name: string
  },
  startDate: string
  endDate: string,
  justAdded: Boolean,
  notes: string
}