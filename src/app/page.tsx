"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { DiscCount, DiscGrid, Filters, Header, ScrollToTop } from "@components";
import { config } from "@services";

export default function HomePage() {
	return (
		<ClerkProvider publishableKey={config.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
			<main>
				<Header />
				<Filters />
				<DiscCount />
				<DiscGrid />
				<ScrollToTop />
			</main>
		</ClerkProvider>
	);
}
