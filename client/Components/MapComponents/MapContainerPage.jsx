import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  useMapEvents,
} from 'react-leaflet';
import { makeStyles } from '@material-ui/core/styles';

import AddMarker from './AddMarker';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { Icon } from 'leaflet';

const useStyles = makeStyles((theme) => ({
  map: {
    width: '100%',
    height: '100vh',
  },
}));
//let parkData = JSON.parse(parkDatageo);

function MyComponent(props) {
  const [zoomTo, setZoom] = useState(true);

  const map = useMapEvent('click', () => {
    if (zoomTo) {
      map.flyTo(props.mycenter);
      setZoom(false);
    }
  });
  return null;
}

//const center = [33.84608391501071, -97.8515660762787];
const zoom = 7;

export default function MapContainerComponent() {
  const classes = useStyles();

  const [activePark, setActivePark] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [center, setCenter] = useState([38.898526981644686, -77.0411653433972]);

  useEffect(() => {
    console.log('I am using effect to get data');
    fetch('/api')
      .then((res) => res.json())
      .then((res) => {
        setReviews(res);
        console.log(res[0].reviewer);
        if (/prasad/.test(res[0].reviewer))
          setCenter([38.898526981644686, -77.0411653433972]);
        if (/kaden/.test(res[0].reviewer))
          setCenter([40.75797292387303, -111.92979875441208]);
        if (/deva/.test(res[0].reviewer))
          setCenter([40.80663759635265, -73.95084919184343]);
        console.log(res);
        //setCards(res.plantList || []);
      });
  }, []);
  //console.log(cards);

  function handleReviewAdd(event) {
    console.log('Event: ', event);
    let newReviews = [...reviews, event];
    console.log('New Reviews: ', newReviews);
    setReviews(newReviews || []);
  }

  const handleEditChange = () => {
    console.log('Edit Mode: ', editMode);
    if (editMode) {
      setEditMode(false);
    } else {
      setEditMode(true);
    }

    console.log('Edit Mode changed to: ', editMode);

    // if (editMode) {

    // }
  };

  return (
    <div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={editMode}
              onChange={handleEditChange}
              name="editMode"
            />
          }
          label="Toggle Edit Mode to Add a Marker"
        />
      </div>

      <MapContainer
        center={center}
        zoom={zoom}
        className={classes.map}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <AddMarker editMode={editMode} handleReviewAdd={handleReviewAdd} />

        {reviews.map((review) => (
          <Marker
            key={review._id}
            position={[
              review.location.coordinates[0],
              review.location.coordinates[1],
            ]}
            eventHandlers={{
              click: () => {
                console.log('marker clicked');
                // setOpen(true);
              },
            }}
            // icon={icon}
          >
            <Popup
              position={[
                review.location.coordinates[0],
                review.location.coordinates[1],
              ]}
            >
              <div>
                <h2>{review.locationName}</h2>
                <p>{review.review}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        <MyComponent mycenter={center} />
      </MapContainer>
    </div>
  );
}
