import classnames from "classnames";

import Image from "components/Image";
import Video from "components/Video";

import useFileUrl from "hooks/useFileUrl";

import { File } from "../../types";

import "./styles.scss";

interface Props {
	file: File;
	index: number;
	onClick?: (file: File, index: number) => void;
	active?: boolean;
}

const MediaItem: React.FC<Props> = (props) => {
	const { file, index, onClick, active = false } = props;
	const url = useFileUrl(file.path, { isThumbnail: true, isVideo: file.type === "VIDEO" });

	const handleClick = () => {
		onClick?.(file, index);
	};

	return (
		<div className='p-relative'>
			<div
				className={classnames({
					"media-item": true,
					"media-item--active": active,
				})}
				onClick={handleClick}
			>
				{file.type === "IMAGE" && <Image src={url} className='media-item--image' />}

				{file.type === "VIDEO" && <Image src={url} className='media-item--image' />}
			</div>

			{active && <div className='media-item-active-indicator' />}
		</div>
	);
};

export default MediaItem;
