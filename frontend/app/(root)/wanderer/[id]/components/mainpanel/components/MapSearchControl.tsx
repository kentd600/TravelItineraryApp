import React, { useContext, useEffect, useState, useRef } from "react";
import { WandererContext } from "../../../../context/WandererContext";
import { useRControl } from "maplibre-react-components";
import { createPortal } from "react-dom";
import { LayerId, type FeaturePropertiesV2, type GeocodingApi } from "@stadiamaps/api";
import { type Map } from "maplibre-gl";
import { useMap } from "maplibre-react-components";
import styles from './MapSearchControl.module.css';
import ky from "ky";
import { LocationDetails } from "@/app/(root)/wanderer/WandererTypes";

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
  const [autocompState, setAutocompState] = useState<AutocompleteState>({
    input: "",
    results: null,
    loading: false,
    resultsVisible: false
  });
  const ctx = useContext(WandererContext);
  const controllerRef = useRef<AbortController | null>(null);
  const apiHitTimeRef = useRef<number>(new Date().getTime());
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
    const curTime = new Date().getTime();
    const deltaTime = curTime - apiHitTimeRef.current;
    if (deltaTime < 500) {
      setAutocompState(prev => ({ ...prev, loading: false }))
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

  const selectResult = async (target: LocationDetails) => {
    if (!ctx) throw new Error('Missing context!');
    ctx.dispatch({type: 'selectLocation', payload: { location: target }});
  }

  const handleKeyDown = async (evt: React.KeyboardEvent<HTMLInputElement>) => {
    switch (evt.key) {
      case "Enter":
        if (!autocompState.input || autocompState.input === "") return;
        if (!autocompState.results || autocompState.results.length < 1 || autocompState.loading) return;
        setAutocompState(prev => ({ ...prev, resultsVisible: false }));
        const res = await ky.post<Promise<LocationDetails>>(`${process.env.NEXT_PUBLIC_WANDERER_API}/loc/placedetails`, {
          json: {
            id: autocompState.results[0].properties.gid
          }
        }).json();
        console.log(res);
        selectResult(res);
        break;
      default: null
    }
  }

  const handleAutocompleteResultClick = async (evt: React.MouseEvent<HTMLElement>) => {
    setAutocompState(prev => ({ ...prev, resultsVisible: false }));
    if(evt.currentTarget instanceof HTMLElement) {
      const idx: number = parseInt(evt.currentTarget.dataset.idx!);
      const selectedResult = autocompState.results![idx];
      const res = await ky.post<Promise<LocationDetails>>(`${process.env.NEXT_PUBLIC_WANDERER_API}/loc/placedetails`, {
        json: {
          id: selectedResult.properties.gid
        }
      }).json();
      console.log(res);
      selectResult(res);
    }
  }

  return createPortal(
    <div className={styles.searchControlContainer}>
      <div className={styles.searchControlInputContainer}>
        <input
          className={styles.searchControlInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={autocompState.input}
          type="text"
        />
      </div>
      {autocompState.resultsVisible ? <div 
        className={styles.resultsContainer}
        ref={resultsContainer}
      >
        {autocompState.results ? autocompState.results.map((feature, idx) => {
          return (
            <div
              className={styles.autocompleteResultContainer}
              onClick={handleAutocompleteResultClick}
              key={`autocompleteResult_${idx}`}
              data-idx={idx}
            >
              <h3
                className={styles.resultText}
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