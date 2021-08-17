import { useState, useRef, useEffect, useCallback, SyntheticEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Icon from "components/Icon";

import Slider from "./components/Slider";

import generateKey from "utils/generateKey";

import "./styles.scss";

interface Props {
	src: string;
}

const getVolumeLevel = (volume: number) => {
	if (volume === 0) return "mute";
	else if (volume > 0 && volume <= 35) return "low-volume";
	else if (volume > 35 && volume <= 75) return "medium-volume";
	else return "speaker";
};

const getPlaybackPosString = (time: number, precision: "hour" | "minute" | "second") => {
	const t = +time.toFixed(0);

	const hourCount = Math.ceil(t / 3600);
	const minuteCount = Math.ceil((t - hourCount * 60) / 60);
	const secondCount = t - minuteCount * 60;

	if (precision === "hour") return `${hourCount}:${minuteCount}:${secondCount}`;
	else if (precision === "minute") return `${minuteCount}:${secondCount}`;
	else return `${secondCount}`;
};

const VideoPlayer: React.FC<Props> = (props) => {
	const { src } = props;
	const [playing, setPlaying] = useState(false);
	const [key, setKey] = useState(generateKey());
	const [volume, setVolume] = useState("100");
	const [duration, setDuration] = useState(0);
	const [playbackPosition, setPlaybackPosition] = useState(0);
	const [volumeControlActive, setVolumeControlActive] = useState(false);
	const [muted, setMuted] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);

	const handleReset = useCallback(() => {
		setPlaying(false);
		setVolume("100");
	}, []);

	const handleTogglePlay = () => {
		const videoElement = videoRef.current;

		if (videoElement) {
			if (videoElement.paused) {
				videoElement.play();
				setPlaying(true);
			} else {
				videoElement.pause();
				setPlaying(false);
			}
		}
	};

	const handleEnded = () => {
		handleReset();
	};

	const handleTimeUpdate = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
		if (e.type === "timeupdate") {
			const { currentTime } = e.nativeEvent.target as HTMLVideoElement;

			setPlaybackPosition(+currentTime.toFixed(3));
		}
	};

	const handleLoadedData = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
		if (e.type === "loadeddata") {
			const { duration } = e.nativeEvent.target as HTMLVideoElement;

			setDuration(duration);
		}
	};

	const handleVolumeChange = (value: number) => {
		const videoElement = videoRef.current;

		if (videoElement) {
			const newVolume = +(+value / 100);

			videoElement.volume = newVolume;
			setVolume(value.toString());
		}
	};

	const handleToggleMute = () => {
		const videoElement = videoRef.current;

		if (videoElement) {
			if (videoElement.muted) setMuted(false);
			else setMuted(true);

			videoElement.muted = !videoElement.muted;
		}
	};

	const handlePlaybackPositionChange = (value: number) => {
		const videoElement = videoRef.current;

		if (videoElement) {
			const newPosition = +((duration * value) / 100);

			videoElement.currentTime = newPosition;
			setPlaybackPosition(newPosition);
		}
	};

	const handleVolumeControlMouseEnter = () => {
		setVolumeControlActive(true);
	};

	const handleVolumeControlMouseLeave = () => {
		setVolumeControlActive(false);
	};

	useEffect(() => {
		setKey(generateKey());
		handleReset();
	}, [handleReset, src]);

	return (
		<div className='video-player-container'>
			<video
				key={key}
				className='video-player'
				ref={videoRef}
				onEnded={handleEnded}
				onTimeUpdate={handleTimeUpdate}
				onLoadedData={handleLoadedData}
				onClick={handleTogglePlay}
			>
				<source src={src} />
			</video>

			<div className='video-player-controls'>
				<button onClick={handleTogglePlay} className='video-player-control'>
					<Icon icon={playing ? "pause" : "play"} />
				</button>

				<div className='d-flex align-center justify-between w-100 mx-5'>
					<div className='video-player-slider'>
						<Slider
							value={+((playbackPosition / duration) * 100)}
							onChange={handlePlaybackPositionChange}
						/>
					</div>
					<div className='video-player-playback-position'>
						{getPlaybackPosString(playbackPosition, "minute")} /{" "}
						{getPlaybackPosString(duration, "minute")}
					</div>
				</div>

				<div
					className='d-flex align-center p-relative'
					onMouseEnter={handleVolumeControlMouseEnter}
					onMouseLeave={handleVolumeControlMouseLeave}
				>
					<button className='video-player-control' onClick={handleToggleMute}>
						<Icon icon={muted ? "mute" : getVolumeLevel(+volume)} />
					</button>

					<AnimatePresence>
						{volumeControlActive && (
							<motion.div
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								initial={{ opacity: 0 }}
								className='video-player-volume-slider'
							>
								<Slider value={+volume} onChange={handleVolumeChange} vertical />
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
};

export default VideoPlayer;
