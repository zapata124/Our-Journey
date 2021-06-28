import React from 'react';
import {
	GoogleMap,
	useLoadScript,
	Marker,
	InfoWindow,
} from '@react-google-maps/api';
import { formatRelative } from 'data-fns';

// import usePlacesAutocomplete, {
// 	getGeocode,
// 	getLatLgn,
// } from "use-places-autocomplete";
// import{
// 	Combobox,
// 	ComboboxInput,
// 	ComboboxPopover,
// 	ComboboxList,
// 	ComboboxOption,
// } from "@reach/combobox";
import '@reach/combobox/styles.css';

import mapStyles from './mapStyles';

const libraries = ['places'];
const mapContainerStyle = {
	width: '90vw',
	height: '100vh',
};

const center = {
	lat: 39.321,
	lng: -111.950684,
};

const options = {
	styles: mapStyles,
	disableDefaultUI: true,
	zoomControl: true,
};

export default function App() {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: 'AIzaSyDGbK9d6uevtoiG6D0Hskjxz2AS838JoTY',
		libraries,
	});
	const [markers, setMarkers] = React.useState([]);
	const [selected, setSelected] = React.useState(null);

	const onMapClick = React.useCallback(event => {
		setMarkers(current => [
			...current,
			{
				lat: event.latLng.lat(),
				lng: event.latLng.lng(),
				time: new Date(),
			},
		]);
	}, []);

	const mapRef = React.useRef();
	const onMapLoad = React.useCallback(map => {
		mapRef.current = map;
	}, []);

	if (loadError) return 'Error loading maps';
	if (!isLoaded) return 'loading Maps';

	return (
		<div>
			<h1>Our Journey</h1>
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				zoom={8}
				center={center}
				options={options}
				onClick={onMapClick}
				onLoad={onMapLoad}
			>
				{markers.map(marker => (
					<Marker
						key={marker.time.toISOString()}
						position={{ lat: marker.lat, lng: marker.lng }}
						// icon={{
						// 	url: "./arma.jpeg",
						// 	scaledSize: new window.google.maps.Size(30,30),
						// 	origin: new window.google.maps.Point(0,0),
						// 	anchor: new window.google.maps.Point(15,15),
						// }}
						onClick={() => {
							setSelected(marker);
						}}
					/>
				))}

				{selected ? (
					<InfoWindow
						position={{ lat: selected.lat, lng: selected.lng }}
						// onCloseClick={() => {
						// 	setSelected(null);
						// }}
					>
						<div>
							<h2>Favorite Location!</h2>
							<p>Spotted {formatRelative(selected.time, new Date())}</p>
						</div>
					</InfoWindow>
				) : null}
			</GoogleMap>
		</div>
	);
}
