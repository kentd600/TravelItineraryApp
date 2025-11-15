import React, { useContext, useEffect, useState, useRef } from "react";
import { WandererContext } from "../../../context/WandererContext";
import { useRControl } from "maplibre-react-components";
import { createPortal } from "react-dom";
import { LayerId, type FeaturePropertiesV2, type GeocodingApi } from "@stadiamaps/api";
import { type Map } from "maplibre-gl";
import { useMap } from "maplibre-react-components";

interface MapSearchControlProps {
  api: GeocodingApi
}

interface AutocompleteState {
  input: string,
  results: FeaturePropertiesV2[] | null,
  loading: boolean,
  resultsVisible: boolean
}

export default function MapSearchControl ({ api }: MapSearchControlProps) {
  const map: Map = useMap();
  const [autocompState, setAutocompState] = useState<AutocompleteState>({
    input: "",
    results: null,
    loading: false,
    resultsVisible: false
  });
  const ctx = useContext(WandererContext);
  const controllerRef = useRef<AbortController | null>(null);
  const apiHitTimeRef = useRef<number | null>(null);
  const resultsContainer = useRef<HTMLDivElement | null>(null);
  const { container } = useRControl({
    position: "top-left"
  });

  const layerStates = {
    default: ['locality', 'country'] as LayerId[]
  }

  useEffect(() => {
    if (!autocompState.input || autocompState.input.length <= 3) return;
    triggerAutoComplete(autocompState.input);
  }, [autocompState.input])

  const triggerAutoComplete = async (text: string) => {
    setAutocompState(prev => ({ ...prev, loading: true }))
    if (!apiHitTimeRef.current) { apiHitTimeRef.current = new Date().getTime() };
    const curTime = new Date().getTime();
    const deltaTime = curTime - apiHitTimeRef.current;
    if (deltaTime < 500) {
      return
    } else {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;
      try {
        const res = await api.autocompleteV2({
          text,
          lang: "en",
          layers: layerStates.default
        }, { signal: controller.signal })
        apiHitTimeRef.current = new Date().getTime();
        setAutocompState(prev => ({
          ...prev,
          results: res.features.slice(0,5),
          loading: false
        }));
      } catch (err: any) {
        setAutocompState(prev => ({ ...prev, loading: false }));
        const causeError = (err as any)?.cause?.error;
        if (causeError && (causeError as any).name === "AbortError") {
          return;
        }
      }
    };
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
    setAutocompState(prev => ({ ...prev, input: evt.target.value }));
    if(evt.target.value === "") {
      setAutocompState(prev => ({
        ...prev,
        loading: false,
        results: null,
        resultsVisible: false
      }))
    } else if (autocompState.resultsVisible === false) {
      setAutocompState(prev => ({ ...prev, resultsVisible: true }));
    }
  }

  const selectResult = (target: FeaturePropertiesV2) => {
    ctx?.dispatch({type: 'selectLocation', payload: { location: target }})
    /*ctx?.setWanderState(prev => ({
      ...prev,
      selectedCity: target
    }));*/
  }

  const handleKeyDown = async (evt: React.KeyboardEvent<HTMLInputElement>) => {
    switch (evt.key) {
      case "Enter":
        if (!autocompState.input || autocompState.input === "") return;
        if (!autocompState.results || autocompState.results.length < 1 || autocompState.loading) return;
        setAutocompState(prev => ({ ...prev, resultsVisible: false }));
        const res = await api.placeDetailsV2({ ids: [autocompState.results[0].properties.gid] });
        selectResult(res.features[0]);
        break;
      default: null
    }
  }

  const handleAutocompleteResultClick = async (evt: React.MouseEvent<HTMLElement>) => {
    setAutocompState(prev => ({ ...prev, resultsVisible: false }));
    if(evt.currentTarget instanceof HTMLElement) {
      const idx: number = parseInt(evt.currentTarget.dataset.idx!);
      const selectedResult = autocompState.results![idx];
      const res = await api.placeDetailsV2({ ids: [selectedResult.properties.gid] })
      selectResult(res.features[0]);
    }
  }

  return createPortal(
    <div className="search-control__container">
      <div className="search-control__input-container">
        <input
          className="search-control__text-input"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={autocompState.input}
          type="text"
        />
      </div>
      {autocompState.resultsVisible ? <div 
        className="search-control__results_container"
        ref={resultsContainer}
      >
        {autocompState.results ? autocompState.results.map((feature, idx) => {
          return (
            <div
              className="search-control__feature-result"
              onClick={handleAutocompleteResultClick}
              key={`autocompleteResult_${idx}`}
              data-idx={idx}
            >
              <h3
                style={{color: "black", userSelect: 'none'}}
              >
                {feature.properties.name}, {feature.properties.coarseLocation}
              </h3>
            </div>
          )
        }) : null}
      </div> : null}
    </div>,
    container
  )
}