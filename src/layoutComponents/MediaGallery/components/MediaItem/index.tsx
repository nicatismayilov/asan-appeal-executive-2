import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Image from "components/Image";
import Icon from "components/Icon";

import useFileUrl from "hooks/useFileUrl";

import { File } from "types/file";

import "./styles.scss";

interface Props<T extends File> {
	file: T;
	index: number;
	onClick?: (file: T, index: number) => void;
	active?: boolean;
}

const MediaItem = <T extends File>(props: Props<T>) => {
	const { file, index, onClick, active = false } = props;
	const url = useFileUrl(file.path, { isThumbnail: true, isVideo: file.type === "VIDEO" });

	const handleClick = () => {
		onClick?.(file, index);
	};

	return (
		<div className='media-item-wrapper'>
			<div className='media-item' onClick={handleClick}>
				{file.type === "IMAGE" && <Image src={url} className='media-item--image' />}

				{file.type === "VIDEO" && (
					<>
						<Image src={url} className='media-item--image' />

						<div className='media-item--video-icon'>
							<Icon icon='video-call' />
						</div>
					</>
				)}

				{file.type === "AUDIO" && (
					<div className='media-item--audio'>
						<Icon icon='microphone' />
					</div>
				)}
			</div>

			<AnimatePresence>
				{active && (
					<motion.div
						initial={{ opacity: 0 }}
						exit={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='media-item-outline'
						transition={{ type: "spring", stiffness: 750, damping: 50 }}
					/>
				)}
			</AnimatePresence>
		</div>
	);
};

export default memo(MediaItem) as typeof MediaItem;
