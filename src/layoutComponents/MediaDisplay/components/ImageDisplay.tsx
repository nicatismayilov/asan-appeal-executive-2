import Image from "components/Image";

import useFileUrl from "hooks/useFileUrl";

import { File } from "types/file";

interface Props<T extends File> {
	file: T;
}

const ImageDisplay = <T extends File>(props: Props<T>) => {
	const { file } = props;
	const path = useFileUrl(file.path);

	return <Image src={path} className='media-display--image' />;
};

export default ImageDisplay;
