/// <reference lib="dom" />

import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppContextProvider, Main } from "@components";
import { Config } from "@utils";

window.addEventListener("load", async () => {
	if (!Config.IS_PROD) return;
	if (!navigator.serviceWorker) return;
	if (navigator.serviceWorker.controller) return;
	await navigator.serviceWorker.register("sw.js");
});

const rootEle = document.getElementById("root");
if (!rootEle) throw new Error("Element with id 'root' not found");
const root = createRoot(rootEle);
root.render(
	<ClerkProvider publishableKey={Config.CLERK_PUBLISHABLE_KEY}>
		<QueryClientProvider client={new QueryClient()}>
			<AppContextProvider>
				<BrowserRouter>
					<Routes>
						<Route index path="/" element={<Main />} />
						<Route path="/:name_slug" element={<Main />} />
					</Routes>
				</BrowserRouter>
			</AppContextProvider>
		</QueryClientProvider>
	</ClerkProvider>
);
