import { useState, useEffect } from "react";

export interface Options {
	isThumbnail?: boolean;
	isVideo?: boolean;
}

const thumbnailURL = `${process.env.REACT_APP_FILES_URL}/thumbnail_`;

const getURL = (url: string, options?: Options) => {
	if (options?.isThumbnail) {
		if (options.isVideo) {
			const videoImageURL = url.split(".")[0] + ".png";
			return `${thumbnailURL}${videoImageURL}`;
		}

		return `${thumbnailURL}${url}`;
	} else return `${process.env.REACT_APP_FILES_URL}/${url}`;
};

const useFileUrl = (url: string, options?: Options) => {
	const [fileURL, setFileURL] = useState(getURL(url, options));

	useEffect(() => {
		setFileURL(getURL(url, options));
	}, [options, url]);

	return fileURL;
};

export default useFileUrl;
