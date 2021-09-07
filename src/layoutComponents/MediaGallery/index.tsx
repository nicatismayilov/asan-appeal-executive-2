import { useState, useCallback, useRef, useEffect } from "react";
import { motion, Transition } from "framer-motion";
import { useRect } from "@reach/rect";

import Icon from "components/Icon";

import MediaItem from "./components/MediaItem";

import { File } from "types/file";

import "./styles.scss";

interface Props<T extends File> {
	files: T[];
	activeFile: T | undefined;
	activeIndex?: number;
	onChange?: (file: T, index: number) => void;
}

const slideStepSize = 400;

const transition: Transition = { bounceDamping: 10, bounceStiffness: 100 };

const MediaGallery = <T extends File>(props: Props<T>) => {
	const { files, activeFile, activeIndex = -1, onChange } = props;

	const [x, setX] = useState(0);
	const [canPrevious, setCanPrevious] = useState(false);
	const [canNext, setCanNext] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const galleryRef = useRef<HTMLDivElement>(null);
	const containerRect = useRect(containerRef);
	const galleryRect = useRect(galleryRef);

	const handleMediaItemClick = useCallback(
		(file: T, index: number) => {
			onChange?.(file, index);
		},
		[onChange]
	);

	const handleNext = () => {
		if (galleryRect && containerRect && canNext) {
			const offset = galleryRect.width - containerRect.width - Math.abs(x);

			if (offset < slideStepSize) setX((prev) => prev - offset);
			else setX((prev) => prev - slideStepSize);
		}
	};

	const handlePrev = () => {
		if (galleryRect && containerRect && canPrevious) {
			if (Math.abs(x) < slideStepSize) setX((prev) => prev + Math.abs(x));
			else setX((prev) => prev + slideStepSize);
		}
	};

	useEffect(() => {
		if (containerRect && galleryRect) {
			const isAtRightEnd = galleryRect.width - containerRect.width - Math.abs(x) === 0;
			const isSlidable = galleryRect.width > containerRect.width;

			setCanNext(!isAtRightEnd && isSlidable);
			setCanPrevious(Math.abs(x) !== 0);
		}
	}, [containerRect, galleryRect, x]);

	return (
		<div className='media-gallery-wrapper'>
			<div className='media-gallery-container' ref={containerRef}>
				<motion.div
					className='media-gallery'
					animate={{ x }}
					ref={galleryRef}
					transition={transition}
				>
					{files.map((file, idx) => {
						const key = file.path + idx.toString();
						const active = activeFile?.path === file.path && activeIndex === idx;

						return (
							<MediaItem
								key={key}
								file={file}
								index={idx}
								onClick={handleMediaItemClick}
								active={active}
							/>
						);
					})}
				</motion.div>
			</div>

			<button
				className='media-gallery-control media-gallery-control--prev'
				disabled={!canPrevious}
				onClick={handlePrev}
			>
				<Icon icon='double-up' />
			</button>

			<button
				className='media-gallery-control media-gallery-control--next'
				disabled={!canNext}
				onClick={handleNext}
			>
				<Icon onClick={(e) => e.stopPropagation()} icon='double-up' />
			</button>
		</div>
	);
};

export default MediaGallery;
