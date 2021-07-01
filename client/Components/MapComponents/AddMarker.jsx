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
  //const [edit, setEdit] = useState(props.editMode)

  const [openDialogue, setOpenDialogue] = useState(false);
  const [clickLat, setclickLat] = useState(null)
  const [clickLong, setclickLong] = useState(null)

  const map = useMapEvent('click', (e) => {
    //map.setCenter(e.location);
    console.log(e.latlng);
    if (props.editMode) {
      setOpenDialogue(true);
      setclickLat(e.latlng.lat)
      setclickLong(e.latlng.lng)

    }
  });

  const handleCloseDialogue = () => {
    console.log('Open Marker Dialogue: ', openDialogue);
    setOpenDialogue(false);
    console.log('Open Marker Dialogue changed to: ', openDialogue);
  };
  return (
    <AddMarkerDialogue
      openDialogue={props.editMode && openDialogue}
      onDialogueClose={handleCloseDialogue}
      latitude = {clickLat}
      longitude = {clickLong}
    />
  );
}
