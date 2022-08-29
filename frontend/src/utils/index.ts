export function uri(route: string) {
	return new URL(route, process.env.REACT_APP_API_ENDPOINT).href;
}
