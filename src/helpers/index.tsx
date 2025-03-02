export const debounce = (func: (userName: string) => void, delay: number) => {
	let timeoutId: ReturnType<typeof setTimeout>;

	return (userName: string) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => func(userName), delay);
	};
};
