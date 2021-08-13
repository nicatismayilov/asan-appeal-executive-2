export type LatLng = {
	lat: number;
	lng: number;
};

export interface GoogleApiMap {
	panTo: (latlng: LatLng) => void;
	panBy: (x: number, y: number) => void;
	setCenter: (latlng: LatLng) => void;
	setTilt: (tilt: number) => void;
	setZoom: (zoom: number) => void;
}
