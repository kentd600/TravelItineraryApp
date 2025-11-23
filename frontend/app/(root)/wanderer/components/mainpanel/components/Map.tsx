import { useContext, useState } from 'react';
import './maplibre-gl.css';
import { RMap } from 'maplibre-react-components';
import './Map.css';
import { WandererContext } from '../../../context/WandererContext';
import { GeocodingApi } from '@stadiamaps/api';

import MapAddControl from './MapAddControl';
import MapSearchControl from './MapSearchControl';

export default function WandererMap () {
  const ctx = useContext(WandererContext);
  const [geoApi, setGeoApi] = useState(new GeocodingApi());
  if (!ctx) throw new Error("Context missing.");

  return (
    <>
      <RMap
        id='wanderer-map'
        mapStyle="https://tiles.stadiamaps.com/styles/osm_bright.json"
        onLoad={(evt) => evt.target.setProjection({ type: 'globe' })}
        minZoom={1.5}
      >
        <MapAddControl />
        <MapSearchControl api={geoApi}/>
      </RMap>
    </>
  )
}