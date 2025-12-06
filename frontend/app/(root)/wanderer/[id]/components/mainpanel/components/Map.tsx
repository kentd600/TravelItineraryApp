'use client';

import { useRef, useContext, useEffect, useState } from 'react';
import './maplibre-gl.css';
import { RLayer, RMap, RMarker, RSource } from 'maplibre-react-components';
import './Map.css';
import { WandererContext } from '../../../../context/WandererContext';
import { GeocodingApi } from '@stadiamaps/api';

import MapAddControl from './MapAddControl';
import MapSearchControl from './MapSearchControl';
import { type Map } from 'maplibre-gl';
import { LocationDetails } from '@/app/(root)/wanderer/WandererTypes';

function generateRouteGeoJson(locs: LocationDetails[] | null | undefined) {
  if (!locs) return;
  const features = locs.map((loc, idx) => {
    const next = locs[idx + 1];
    if(!loc.startDate && !loc.endDate) return null;
    if(!next) return null;
    return {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [loc.details.geoCoordinates, next.details.geoCoordinates]
      }
    }
  })
  return {
    'type': 'FeatureCollection',
    'features': features.filter(f => !!f)
  }
}

export default function WandererMap () {
  const ctx = useContext(WandererContext);
  const rMap = useRef<Map>(null);
  const [lineGeoJson, setLineGeoJson] = useState<any>();
  const [geoApi, setGeoApi] = useState(new GeocodingApi());
  if (!ctx) throw new Error("Context missing.");

  useEffect(() => {
    setLineGeoJson(generateRouteGeoJson(ctx.wanderState.itineraryDetailsSorted))
  },[ctx.wanderState.itineraryDetailsSorted])

  return (
    <>
      <RMap
        id='wanderer-map'
        mapStyle="https://tiles.stadiamaps.com/styles/osm_bright.json"
        onLoad={(evt) => evt.target.setProjection({ type: 'globe' })}
        minZoom={1.5}
        ref={rMap}
      >
        {ctx.wanderState.itineraryDetailsSorted?.map((loc, idx) => 
          <RMarker
            longitude={loc.details.geoCoordinates[0]}
            latitude={loc.details.geoCoordinates[1]}
            key={`${loc.details.gid}_${idx}`}
          />
        )}
        <RSource data={lineGeoJson} id='lineSource' type='geojson'/>
        <RLayer
          source='lineSource'
          id='route-lines'
          type='line'
          paint={{
            'line-color': '#a3f02f',
            'line-width': 8,
          }}
        />
        <MapAddControl />
        <MapSearchControl api={geoApi}/>
      </RMap>
    </>
  )
}