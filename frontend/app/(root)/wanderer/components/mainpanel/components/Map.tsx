import { useContext, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import { RMap } from 'maplibre-react-components';
import './Map.css';
import { WandererContext } from '../../../context/WandererContext';
import { GeocodingApi } from '@stadiamaps/api';

import MapAddControl from './MapAddControl';
import MapSearchControl from './MapSearchControl';

/*
function SearchControl () {
  const ctx = useContext(WandererContext);
  if (!ctx) return;
  const { setWanderState } = ctx;
  const map: Map = useMap();
  const [searchTerm, setSearchTerm] = useState('');
  const [geoApi, setGeoApi] = useState(new GeocodingApi());
  const { container } = useRControl({
    position: "top-left"
  });

  const handleSearchTermChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(() => evt.target.value);
  }

  const handleSearchEnterPress = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if(evt.key !== "Enter") return;
    handleClick();
  }

  const handleClick = async () => {
    if (!map || searchTerm === "") return;
    const res = await geoApi.search({ text: searchTerm });
    setWanderState(prev => ({
      ...prev,
      selectedCity: res
    }))
    const coordinates = res.features[0].geometry.coordinates;
    map.flyTo({ 
      center: new LngLat(coordinates[0], coordinates[1]),
      curve: 2,
      zoom: 9
    });
  };

  return createPortal(
    <div className="rmap-control__search-container">
      <input
        className="rmap-control__search-input"
        onChange={handleSearchTermChange}
        type='text'
        value={searchTerm}
        onKeyDown={handleSearchEnterPress}
      />
      <input
        className="rmap-control__search-button"
        type='button'
        onClick={handleClick}
        value='Search!'
      />
    </div>,
    container
  )
}
*/

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