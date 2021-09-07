import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import GoogleMapReact from "google-map-react";
import classnames from "classnames";

import Icon from "components/Icon";

import EventBus from "eventBus";

import { GoogleApiMap } from "./types";

import { mapStylesLight, mapStylesDark } from "./mapStyles";

import "./styles.scss";

function toFixed3(n: number) {
	return +n.toFixed(3);
}

interface Props {
	height?: number | string;
	width?: number | string;
	longitude: number;
	latitude: number;
	center: { lat: number; lng: number };
	zoom?: number;
}

const bootstrapURLKeys: GoogleMapReact.BootstrapURLKeys = {
	key: "AIzaSyDyFjdIY7RT-iNZKleR3xEP9MvZ-nepJ54",
	region: "AZ",
	language: "az",
};

const Map: React.FC<Props> = (props) => {
	const { height = 200, width = 400, longitude, latitude, center, zoom = 13 } = props;
	const [darkMode, setDarkMode] = useState(false);
	const [controlledCenter, setControlledCenter] = useState<GoogleMapReact.Coords>(center);
	const [controlledZoom, setControlledZoom] = useState(zoom);
	const mapRef = useRef<GoogleApiMap>();

	const handleGoogleApiLoaded = (value: { map: any; maps: any; ref: Element | null }) => {
		const { map } = value;

		mapRef.current = map;
	};

	const handleMapChange = useCallback((value: GoogleMapReact.ChangeEventValue) => {
		setControlledCenter(value.center);
		setControlledZoom(value.zoom);
	}, []);

	const handleReset = () => {
		mapRef.current?.panTo({ lat: center.lat, lng: center.lng });
	};

	const handleZoomIncrement = () => {
		mapRef.current?.setZoom(controlledZoom + 1);
	};

	const handleZoomDecrement = () => {
		mapRef.current?.setZoom(controlledZoom - 1);
	};

	const options = useMemo<GoogleMapReact.MapOptions>(() => {
		return {
			disableDefaultUI: true,
			zoomControl: false,
			disableDoubleClickZoom: true,
			styles: darkMode ? mapStylesDark : mapStylesLight,
			scrollwheel: false,
			panControl: true,
			rotateControl: true,
		};
	}, [darkMode]);

	useEffect(() => {
		const unsubscribe = EventBus.subscribe("theme-change", (event) => {
			const { theme } = event;

			if (theme === "dark") setDarkMode(true);
			else setDarkMode(false);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<div className='map' style={{ height, width }}>
			<GoogleMapReact
				onGoogleApiLoaded={handleGoogleApiLoaded}
				bootstrapURLKeys={bootstrapURLKeys}
				defaultCenter={center}
				defaultZoom={zoom}
				yesIWantToUseGoogleMapApiInternals
				options={options}
				onChange={handleMapChange}
			>
				<div
					//@ts-ignore
					lat={latitude}
					lng={longitude}
					className={`marker marker--${darkMode ? "dark" : "light"}`}
				>
					<div className='marker-indicator' />
				</div>
			</GoogleMapReact>

			<div className='map-buttons'>
				<button
					className={classnames({
						"map-button map-button-reset mb-6 card": true,
						"map-button-reset--active":
							toFixed3(center.lat) !== toFixed3(controlledCenter.lat) ||
							toFixed3(center.lng) !== toFixed3(controlledCenter.lng),
					})}
					onClick={handleReset}
				>
					<Icon icon='near-me' />
				</button>

				<button onClick={handleZoomIncrement} className='map-button map-button-zoom card'>
					<Icon icon='plus-math' />
				</button>

				<button onClick={handleZoomDecrement} className='map-button map-button-zoom card'>
					<Icon icon='subtract' />
				</button>
			</div>
		</div>
	);
};

export default Map;
