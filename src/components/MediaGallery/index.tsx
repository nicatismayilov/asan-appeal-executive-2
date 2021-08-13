import { useState, useCallback, useRef, useEffect } from "react";
import { motion, Transition } from "framer-motion";
import { useRect } from "@reach/rect";

import MediaItem from "./components/MediaItem";

import { File } from "./types";

import "./styles.scss";

export * from "./types";

interface Props {
	files: File[];
}

const slideStepSize = 400;

const transition: Transition = { bounceDamping: 10, bounceStiffness: 100 };

const MediaGallery: React.FC<Props> = (props) => {
	const { files } = props;
	const [activeItem, setActiveItem] = useState({ file: files[0], index: 0 });
	const [x, setX] = useState(0);
	const [canPrevious, setCanPrevious] = useState(false);
	const [canNext, setCanNext] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const galleryRef = useRef<HTMLDivElement>(null);
	const containerRect = useRect(containerRef);
	const galleryRect = useRect(galleryRef);

	const handleMediaItemClick = useCallback((file: File, index: number) => {
		setActiveItem({ file, index });
	}, []);

	const handleNext = () => {
		if (galleryRect && containerRect) {
			const offset = galleryRect.width - containerRect.width - Math.abs(x);

			if (offset < slideStepSize) setX((prev) => prev - offset);
			else setX((prev) => prev - slideStepSize);
		}
	};

	const handlePrev = () => {
		if (galleryRect && containerRect) {
			if (Math.abs(x) < slideStepSize) setX((prev) => prev + Math.abs(x));
			else setX((prev) => prev + slideStepSize);
		}
	};

	useEffect(() => {
		if (containerRect && galleryRect) {
			setCanNext(galleryRect.width - containerRect.width - Math.abs(x) !== 0);
			setCanPrevious(Math.abs(x) !== 0);
		}
	}, [containerRect, galleryRect, x]);

	return (
		<div className='media-gallery-container' ref={containerRef}>
			<motion.div
				className='media-gallery'
				animate={{ x }}
				ref={galleryRef}
				transition={transition}
			>
				{[...files, ...files, ...files, ...files, ...files, ...files].map((file, idx) => {
					const key = file.path + idx.toString();
					const active = activeItem.file.path === file.path && activeItem.index === idx;

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

			<div style={{ position: "absolute" }}>
				<button disabled={!canPrevious} onClick={handlePrev}>
					Prev
				</button>
				<button disabled={!canNext} onClick={handleNext}>
					Next
				</button>
			</div>
		</div>
	);
};

export default MediaGallery;
