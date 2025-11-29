import type { FeaturePropertiesV2 } from "@stadiamaps/api";
import type { docSubMap, LocationDetails } from "../model/LocationModel.js";

export function normalizeFeatureProperties(feature: FeaturePropertiesV2) {
  const normalized: LocationDetails = {
    bbox: feature.bbox!,
    geoCoordinates: feature.geometry!.coordinates,
    geoType: feature.geometry!.type,
    coarseLocation: feature.properties.coarseLocation,
    continent: feature.properties.context?.whosonfirst.continent as docSubMap,
    country: feature.properties.context?.whosonfirst.country as docSubMap,
    locality: feature.properties.context?.whosonfirst.locality as docSubMap,
    gid: feature.properties.gid,
    name: feature.properties.name
  }

  return normalized
}