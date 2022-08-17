export function backend(route: string) {
	return `${process.env.REACT_APP_API_ENDPOINT}/${route}`;
}
