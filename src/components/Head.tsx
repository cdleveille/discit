import Head from "next/head";
import React from "react";

export const HeadContent: React.FC = () => {
	return (
		<Head>
			<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
			<link rel="manifest" href="/manifest.json" />
			<link rel="apple-touch-icon" sizes="180x180" href="/img/icon-180x180.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/img/icon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/img/icon-16x16.png" />
			<link rel="mask-icon" href="/img/safari-pinned-tab.svg" color="#ffffff" />
			<meta name="msapplication-TileColor" content="#ffffff" />
			<meta name="theme-color" content="#ffffff" />
			<title>DiscIt</title>
		</Head>
	);
};

export default HeadContent;
