import VideoPlayer from "components/VideoPlayer";

import useFileUrl from "hooks/useFileUrl";

import { File } from "types/file";

interface Props<T extends File> {
	file: T;
}

const VideoDisplay = <T extends File>(props: Props<T>) => {
	const { file } = props;
	const path = useFileUrl(file.path);

	return <VideoPlayer src={path} />;
};

export default VideoDisplay;
