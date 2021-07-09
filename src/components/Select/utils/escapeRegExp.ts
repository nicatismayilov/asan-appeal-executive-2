const escapeRegExp = (text: string): string => {
	return text.replace(/[°"§%()[\]{}=\\?´`'#<>|,;.:+_-]+/g, "\\$&");
};

export default escapeRegExp;
