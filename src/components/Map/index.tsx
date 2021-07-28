import { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon as LeafletIcon, Map as MapType } from "leaflet";
import "leaflet/dist/leaflet.css";

import generateKey from "utils/generateKey";

import marker from "../Icon/svg/marker.svg";
import "./styles.scss";

// const accessToken =
// 	"pk.eyJ1IjoibmlqYXQtaXNtYXlpbG92IiwiYSI6ImNrcDFxNWJ2cjBzeDEycG13MGNib2VrZHMifQ.9oTJT7rViSnwYyR0mGARvw";

const markerIcon = new LeafletIcon({
	iconUrl: marker,
	iconSize: [40, 40],
	iconAnchor: [20, 40],
});

interface Props {
	height?: number | string;
	width?: number | string;
	longitude: number;
	latitude: number;
	center: [number, number];
	zoom?: number;
}

const Map: React.FC<Props> = (props) => {
	const { height = 200, width = 400, longitude, latitude, center, zoom = 13 } = props;
	const [map, setMap] = useState<MapType>();
	const containerKeyRef = useRef(generateKey());
	// const [viewport, setViewport] = useState({
	// 	zoom,
	// 	latitude,
	// 	longitude,
	// 	width,
	// 	height,
	// });

	useEffect(() => {
		containerKeyRef.current = generateKey();
	}, [height, width]);

	return (
		<div className='map' style={{ height, width }}>
			<MapContainer
				key={containerKeyRef.current}
				center={center}
				zoom={zoom}
				scrollWheelZoom
				whenCreated={setMap}
			>
				<TileLayer
					attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=yLrkX2sfm5T5v5JXn69sU3DkgsDJSAafw7OCMYIIQVq4p0wdykcTUPjP55KJQqAM'
				/>

				<Marker icon={markerIcon} position={[latitude, longitude]}></Marker>
			</MapContainer>

			<button
				style={{ position: "absolute" }}
				onClick={() => map?.flyTo(center, zoom, { duration: 0.5 })}
			>
				reset
			</button>
		</div>
	);
};

export default Map;
