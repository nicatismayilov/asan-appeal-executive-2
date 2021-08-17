import AudioPlayer from "components/AudioPlayer";

import useFileUrl from "hooks/useFileUrl";

import { File } from "types/file";

interface Props<T extends File> {
	file: T;
}

const AudioDisplay = <T extends File>(props: Props<T>) => {
	const { file } = props;
	const path = useFileUrl(file.path);

	return <AudioPlayer source={path} />;
};

export default AudioDisplay;
