import type { AppProps } from "next/app";
import "../styles/styles.css";

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default MyApp;
