const generateKey = (): string => {
	const now = new Date();
	const base36 = now.getTime().toString(36);
	const base24 = now.getTime().toString(24);
	const base16 = now.getTime().toString(16);
	const salt = Math.random().toString(28);
	const key = `${base36}-${base24}-${base16}-${salt}`;

	return key;
};

export default generateKey;
