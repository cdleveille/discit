import { AppContextProvider, Controls, DiscGrid, Filters, Header, ScrollToTop } from "@components";
import { getBags, getDiscs } from "@services";

import type { ViewOption } from "@types";

export default async function HomePage({ searchParams }: { searchParams: Record<string, string | undefined> }) {
	const { disc, view } = searchParams;
	const [discs, bags] = await Promise.all([getDiscs(), getBags({ userId: null })]);
	return (
		<AppContextProvider discs={discs} bags={bags} initialView={view as ViewOption} initialDiscSlug={disc}>
			<main className="flex-column-center">
				<Header />
				<Filters />
				<Controls />
				<DiscGrid />
				<ScrollToTop />
			</main>
		</AppContextProvider>
	);
}
