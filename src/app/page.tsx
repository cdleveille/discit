"use client";

import { Controls, DiscGrid, Filters, Header, ScrollToTop } from "@components";

export default function HomePage() {
	return (
		<div className="flex-column-center">
			<Header />
			<Filters />
			<Controls />
			<DiscGrid />
			<ScrollToTop />
		</div>
	);
}
