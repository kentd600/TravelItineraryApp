import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import styles from './LocationEdit.module.css';
import ky from 'ky';
import { WandererContext } from '@/app/(root)/wanderer/context/WandererContext';

function validateDates(startDate: string, endDate: string) {
  const objStartDate = new Date(startDate);
  const objEndDate = new Date(endDate);
  return (objStartDate <= objEndDate);
}

export default function LocationEdit() {
  const ctx = useContext(WandererContext);
  const [errorMessage, setErrorMessage] = useState('Test error message.');
  const [reqState, setReqState] = useState(false);
  const [locationInvalid, setLocationInvalid] = useState(false);
  const [locationState, setLocationState] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    if (locationState.startDate !== '' && locationState.endDate !== '') {
      setLocationInvalid(false);
    } else {
      setLocationInvalid(true);
    }
  }, [locationState])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { startDate, endDate } = locationState;
    setLocationState(prev => {
        const temp = { ...prev, [e.target.id]: e.target.value };
        if (temp.startDate === '' || temp.endDate === '') {
          return { ...prev, [e.target.id]: e.target.value }
        } else if (validateDates(temp.startDate, temp.endDate)) {
          return { ...prev, [e.target.id]: e.target.value }
        } else {
          return prev
        }
      }
    )
  }

  async function handleSave() {
    if (reqState) return;
    if (!ctx) return;
    const { startDate, endDate } = locationState;
    setReqState(true);
    const result = await ky.patch(`${process.env.NEXT_PUBLIC_WANDERER_API}/loc`, {
      credentials: 'include',
      json: {
        _id: ctx?.wanderState.selectedLocation?._id,
        _itinerary: ctx?.wanderState.currentItinerary,
        startDate,
        endDate
      }
    })
    setReqState(false);
  }

  return (
    <>
      <div className={styles.toastContainer}>
        <div className={styles.toast}>{errorMessage}</div>
      </div>
      <div className={styles.locationEditContainer}>
        <div className={styles.datePickerContainer}>
          <div className={styles.datePicker}>
            <label htmlFor="startDate">Start Date</label>
            <input 
              type="date"
              id='startDate'
              name='startDate'
              onChange={handleChange}
              value={locationState.startDate}
            />
          </div>
          <div className={styles.datePicker}>
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id='endDate'
              name='endDate'
              onChange={handleChange}
              value={locationState.endDate}
            />
          </div>
        </div>
        <button type='button' onClick={handleSave} disabled={locationInvalid}>Save</button>
      </div>
    </>

  )
}