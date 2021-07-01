import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from 'react-leaflet';
import { makeStyles } from '@material-ui/core/styles';

import AddMarker from './AddMarker';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { Icon } from 'leaflet';
import * as parkData from '../../../data/Skateboard_Parks.geojson';

const useStyles = makeStyles((theme) => ({
  map: {
    width: '100%',
    height: '100vh',
  },
}));
//let parkData = JSON.parse(parkDatageo);

const center = [45.450391044188173, -75.471003922411484];
const zoom = 13;
const position = [51.505, -0.09];

export default function MapContainerComponent() {
  const classes = useStyles();

  const [activePark, setActivePark] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [openDialogue, setOpenDialogue] = useState(false);
  


  useEffect(() => {
    console.log('I am using effect to get data');
    fetch('/api')
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        //setCards(res.plantList || []);
      });
  }, []);
  //console.log(cards);

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
        center={[45.4, -75.7]}
        zoom={12}
        className={classes.map}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <AddMarker editMode={editMode} />

        {parkData.features.map((park) => (
          <Marker
            key={park.properties.PARK_ID}
            position={[
              park.geometry.coordinates[1],
              park.geometry.coordinates[0],
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
                park.geometry.coordinates[1],
                park.geometry.coordinates[0],
              ]}
            >
              <div>
                <h2>{park.properties.NAME}</h2>
                <p>{park.properties.DESCRIPTIO}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
