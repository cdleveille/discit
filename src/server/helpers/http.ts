export const getContentType = (pathname: string) => {
	if (pathname.endsWith(".html")) return "text/html";
	if (pathname.endsWith(".css")) return "text/css";
	if (pathname.endsWith(".js")) return "text/javascript";
	if (pathname.endsWith(".json")) return "application/json";
	if (pathname.endsWith(".png")) return "image/png";
	if (pathname.endsWith(".jpg") || pathname.endsWith(".jpeg")) return "image/jpeg";
	if (pathname.endsWith(".svg")) return "image/svg+xml";
	return "text/plain";
};
