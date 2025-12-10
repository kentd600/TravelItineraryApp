import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import styles from './LocationEdit.module.css';
import ky from 'ky';
import { WandererContext, WdAppState } from '@/app/(root)/wanderer/context/WandererContext';
import { mutate } from 'swr';

function validateDates(startDate: string, endDate: string) {
  const objStartDate = new Date(startDate);
  const objEndDate = new Date(endDate);
  return (objStartDate <= objEndDate);
}

function formatDate(date: Date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const mFormatted = String(m).padStart(2, '0');
  const dFormatted = String(d).padStart(2, '0');
  return `${y}-${mFormatted}-${dFormatted}`;
}

export default function LocationEdit() {
  const ctx = useContext(WandererContext);
  const [errorMessage, setErrorMessage] = useState('Test error message.');
  const [reqState, setReqState] = useState(false);
  const [locationInvalid, setLocationInvalid] = useState(false);
  const [locationState, setLocationState] = useState({
    startDate: '',
    endDate: '',
    notes: ''
  });

  useEffect(() => {
    setLocationState(prev => {
      if (!ctx?.wanderState.selectedLocation) return prev;
      const { startDate, endDate, notes, justAdded } = ctx?.wanderState.selectedLocation;
      return {
        ...prev,
        startDate: justAdded ? '' : formatDate(new Date(startDate)),
        endDate: justAdded ? '' : formatDate(new Date(endDate)),
        notes: notes
      }
    })
  }, [])

  useEffect(() => {
    if (locationState.startDate !== '' && locationState.endDate !== '') {
      setLocationInvalid(false);
    } else {
      setLocationInvalid(true);
    }
  }, [locationState])

  function handleDateChange(e: ChangeEvent<HTMLInputElement>) {
    setLocationState(prev => {
        const temp = { ...prev, [e.target.id]: e.target.value };
        if (temp.startDate === '' || temp.endDate === '') {
          return { ...prev, [e.target.id]: e.target.value }
        } else if (validateDates(temp.startDate, temp.endDate)) {
          return { ...prev, [e.target.id]: e.target.value }
        } else {
          switch (e.target.id) {
            case 'startDate':
              return {
                ...prev,
                [e.target.id]: e.target.value,
                endDate: ''
              }
            case 'endDate':
              return {
                ...prev,
                [e.target.id]: e.target.value,
                startDate: ''
              }
            default:
              return prev
          }
        }
      }
    )
  }

  function handelChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setLocationState(prev => {
      switch(e.target.id) {
        case 'notes':
          return {
            ...prev,
            notes: e.target.value
          }
        default:
          return prev
      }
    })
  }

  async function handleSave() {
    if (reqState) return;
    if (!ctx) return;
    const { startDate, endDate, notes } = locationState;
    setReqState(true);
    const result = await ky.patch(`${process.env.NEXT_PUBLIC_WANDERER_API}/loc`, {
      credentials: 'include',
      json: {
        _id: ctx?.wanderState.selectedLocation?._id,
        _itinerary: ctx?.wanderState.currentItinerary,
        startDate,
        endDate,
        justAdded: false,
        notes
      }
    })
    mutate(`${process.env.NEXT_PUBLIC_WANDERER_API}/itinerary/${ctx.wanderState.currentItinerary}`);
    setReqState(false);
    ctx.dispatch({type: 'setAppState', payload: { appState: WdAppState.itineraryEdit }});
  }

  return (
    <>
      <div className={styles.toastContainer}>
        <div className={styles.toast}>{errorMessage}</div>
      </div>
      <div className={styles.locationEditContainer}>
        <div className={styles.datePickerContainer}>
          <div className={styles.datePicker}>
            <label htmlFor="startDate">Start Date:</label>
            <input 
              type="date"
              id='startDate'
              name='startDate'
              onChange={handleDateChange}
              className={styles.dateInput}
              value={locationState.startDate}
            />
          </div>
          <div className={styles.datePicker}>
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id='endDate'
              name='endDate'
              onChange={handleDateChange}
              className={styles.dateInput}
              value={locationState.endDate}
            />
          </div>
        </div>
        <div className={styles.notesContainer}>
          <label htmlFor="notes">Notes:</label>
          <textarea name="notes" id="notes" className={styles.notesInput} value={locationState.notes} onChange={handelChange}></textarea>
        </div>
        <button
          type='button'
          onClick={handleSave}
          disabled={locationInvalid}
          className={`globalButtonStyle ${styles.saveButton}`}
        >
          Save
        </button>
      </div>
    </>

  )
}