import { useState, useEffect, useRef, useCallback } from "react";

import Spinner from "components/Spinner";
import Icon from "components/Icon";

import "./styles.scss";

interface Props {
	src: string;
	alt?: string;
	lazyLoad?: boolean;
	placeholder?: string;
	className?: string;
}

const ImageComponent: React.FC<Props> = (props) => {
	const { src, alt = "", placeholder, lazyLoad = true, className } = props;
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(false);
	const [imageSource, setImageSource] = useState<string>();
	const imageWrapperRef = useRef<HTMLDivElement>(null);

	const handleLoad = useCallback(() => {
		setIsLoaded(true);
		setImageSource(src);
	}, [src]);

	const handleError = useCallback(() => {
		setIsLoaded(true);
		setImageSource(placeholder);
		setError(true);
	}, [placeholder]);

	useEffect(() => {
		let observer: IntersectionObserver;
		let preloader = new Image();

		if (lazyLoad && "IntersectionObserver" in window) {
			observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						observer.disconnect();

						setError(false);
						setIsLoaded(false);

						preloader.addEventListener("load", handleLoad);
						preloader.addEventListener("error", handleError);

						preloader.src = src;
					}
				});
			});

			observer.observe(imageWrapperRef.current || document.createElement("div"));
		}

		return () => {
			observer.disconnect();
			preloader.removeEventListener("load", handleLoad);
			preloader.removeEventListener("error", handleError);
		};
	}, [handleError, handleLoad, lazyLoad, src]);

	return (
		<div className='image-wrapper' ref={imageWrapperRef}>
			{isLoaded && <img src={imageSource} alt={alt} className={`image ${className || ""}`} />}

			{!isLoaded && (
				<div className='image-spinner'>
					<Spinner size={50} />
				</div>
			)}

			{error && (
				<div className='image-not-found'>
					<Icon icon='no-image' height={50} width={50} />
				</div>
			)}
		</div>
	);
};

export default ImageComponent;
