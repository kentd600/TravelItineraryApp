import React, { useContext, useEffect, useState, useRef } from "react";
import { WandererContext } from "../../../../context/WandererContext";
import { useRControl } from "maplibre-react-components";
import { createPortal } from "react-dom";
import { LayerId, type FeaturePropertiesV2, type GeocodingApi } from "@stadiamaps/api";
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
  resultsVisible: boolean,
  preSelected: number
}

export default function MapSearchControl ({ api }: MapSearchControlProps) {
  const [autocompState, setAutocompState] = useState<AutocompleteState>({
    input: "",
    results: null,
    loading: false,
    resultsVisible: false,
    preSelected: 0
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
          loading: false,
          preSelected: 0
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
        setAutocompState(prev => ({
          ...prev,
          resultsVisible: false,
          preSelected: 0
        }));
        const res = await ky.post<Promise<LocationDetails>>(`${process.env.NEXT_PUBLIC_WANDERER_API}/loc/placedetails`, {
          json: {
            id: autocompState.results[autocompState.preSelected].properties.gid
          }
        }).json();
        selectResult(res);
        break;
      case "ArrowDown":
        setAutocompState(prev => ({
            ...prev,
           preSelected: prev.preSelected < 4 ? prev.preSelected + 1 : 4
        }))
        evt.preventDefault();
        break;
      case "ArrowUp":
        setAutocompState(prev => ({
          ...prev,
          preSelected: prev.preSelected > 0 ? prev.preSelected - 1 : 0
        }))
        evt.preventDefault();
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
      selectResult(res);
    }
  }

  function updateSelectOnMouseEnter(evt: React.MouseEvent<HTMLDivElement>) {
    const { idx } = evt.currentTarget.dataset;
    setAutocompState(prev => ({
      ...prev,
      preSelected: parseInt(idx!)
    }))
  }

  function handleInputFocus(evt: React.FocusEvent<HTMLInputElement>) {
    if(autocompState.results && autocompState.results.length > 0) {
      setAutocompState(prev => ({
        ...prev,
        resultsVisible: true
      }))
    }
  }

  return createPortal(
    <div className={styles.searchControlContainer}>
      <div className={styles.searchControlInputContainer}>
        <input
          className={styles.searchControlInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
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
              className={`${styles.autocompleteResultContainer} ${idx === autocompState.preSelected ? styles.selected : null}`}
              onClick={handleAutocompleteResultClick}
              onMouseEnter={updateSelectOnMouseEnter}
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