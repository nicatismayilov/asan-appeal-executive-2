import { useRef } from "react";
import { useRect } from "@reach/rect";

import ImageDisplay from "./components/ImageDisplay";
import VideoDisplay from "./components/VideoDisplay";
import AudioDisplay from "./components/AudioDisplay";

import { File } from "types/file";

import "./styles.scss";

interface Props<T extends File> {
	file?: T;
}

const MediaDisplay = <T extends File>(props: Props<T>) => {
	const { file } = props;
	const mediaDisplayRef = useRef<HTMLDivElement>(null);
	const mediaDisplayRect = useRect(mediaDisplayRef);

	if (!file) return null;

	return (
		<div
			ref={mediaDisplayRef}
			className='media-display'
			style={{ height: mediaDisplayRect ? mediaDisplayRect.width * 0.75 : undefined }}
		>
			{file.type === "IMAGE" && <ImageDisplay file={file} />}

			{file.type === "VIDEO" && <VideoDisplay file={file} />}

			{file.type === "AUDIO" && <AudioDisplay file={file} />}
		</div>
	);
};

export default MediaDisplay;
