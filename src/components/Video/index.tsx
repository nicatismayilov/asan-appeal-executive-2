import { useRef } from "react";

import "./styles.scss";

interface Props {
	src: string;
}

const Video: React.FC<Props> = (props) => {
	const { src } = props;
	const videoRef = useRef<HTMLVideoElement>(null);

	return (
		<div className='video-container' style={{ height: "100%" }}>
			<video style={{ height: "100%" }} ref={videoRef}>
				<source src={src} />
			</video>

			<button onClick={() => videoRef.current?.play()}>Seek</button>
		</div>
	);
};

export default Video;
