import { useState, useEffect } from "react";

const useFileUrl = (url: string) => {
	const [fileURL, setFileURL] = useState(`${process.env.REACT_APP_FILES_URL}/${url}`);

	useEffect(() => {
		setFileURL(`${process.env.REACT_APP_FILES_URL}/${url}`);
	}, [url]);

	return fileURL;
};

export default useFileUrl;
