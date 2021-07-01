import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from 'react-leaflet';
import AddMarkerDialogue from './AddMarkerDialogue';

export default function AddMarker(props) {
  const [openDialogue, setOpenDialogue] = useState(false);
  const [clickLat, setclickLat] = useState(null);
  const [clickLong, setclickLong] = useState(null);

  const map = useMapEvent('click', (e) => {
    console.log(e.latlng);
    if (props.editMode) {
      setOpenDialogue(true);
      setclickLat(e.latlng.lat);
      setclickLong(e.latlng.lng);
    }
  });

  const handleCloseDialogue = () => {
    console.log('Open Marker Dialogue: ', openDialogue);
    setOpenDialogue(false);
    console.log('Open Marker Dialogue changed to: ', openDialogue);
  };

  const handleReviewAdd = (location, rating, review, tripDate, dailyBudget) => {
    // console.log('Location: ', location);
    // console.log('review: ', review);
    // console.log('latitude1: ',clickLat);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        locationName: location,
        rating,
        review,
        tripDate,
        dailyBudget,
        coordinates: [clickLat, clickLong],
      }),
    };
    fetch('/api', requestOptions)
      .then((res) => res.json())
      .then((data) => {

        props.handleReviewAdd(data)
        setOpenDialogue(false);
      });
  };

  return (
    <AddMarkerDialogue
      openDialogue={props.editMode && openDialogue}
      onDialogueClose={handleCloseDialogue}
      latitude={clickLat}
      longitude={clickLong}
      onReviewAdd={handleReviewAdd}
    />
  );
}
