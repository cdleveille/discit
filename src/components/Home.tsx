"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { DiscCount, DiscGrid, Filters, Header, ScrollToTop } from "@components";
import { config } from "@services";

export const Home = () => {
	return (
		<ClerkProvider publishableKey={config.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
			<Header />
			<Filters />
			<DiscCount />
			<DiscGrid />
			<ScrollToTop />
		</ClerkProvider>
	);
};
