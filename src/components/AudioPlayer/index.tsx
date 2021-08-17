import { useEffect, useState, useCallback, SyntheticEvent, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Icon from "components/Icon";

import Slider from "components/VideoPlayer/components/Slider";

import generateKey from "utils/generateKey";

import "./styles.scss";

interface Props {
	source: string;
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

const AudioPlayer: React.FC<Props> = (props) => {
	const { source } = props;
	const [key, setKey] = useState(generateKey());
	const [playing, setPlaying] = useState(false);
	const [volume, setVolume] = useState("100");
	const [duration, setDuration] = useState(0);
	const [playbackPosition, setPlaybackPosition] = useState(0);
	const [volumeControlActive, setVolumeControlActive] = useState(false);
	const [muted, setMuted] = useState(false);
	const audioRef = useRef<HTMLAudioElement>(null);

	const handleReset = useCallback(() => {
		setPlaying(false);
		setVolume("100");
	}, []);

	const handleTogglePlay = () => {
		const audio = audioRef.current;

		if (!audio) return;

		if (audio.paused) {
			audio.play();
			setPlaying(true);
		} else {
			audio.pause();
			setPlaying(false);
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
		const audio = audioRef.current;

		if (audio) {
			const newVolume = +(+value / 100);

			audio.volume = newVolume;
			setVolume(value.toString());
		}
	};

	const handleToggleMute = () => {
		const audio = audioRef.current;

		if (audio) {
			if (audio.muted) setMuted(false);
			else setMuted(true);

			audio.muted = !audio.muted;
		}
	};

	const handlePlaybackPositionChange = (value: number) => {
		const audio = audioRef.current;

		if (audio) {
			const newPosition = +((duration * value) / 100);

			audio.currentTime = newPosition;
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
	}, [handleReset, source]);

	return (
		<div className='audio-player-container'>
			<audio
				key={key}
				src={source}
				ref={audioRef}
				onEnded={handleEnded}
				onTimeUpdate={handleTimeUpdate}
				onLoadedData={handleLoadedData}
				className='audio-player'
			/>

			<div className='audio-player-thumbnail'>
				<Icon icon='microphone' />
			</div>

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

export default AudioPlayer;
