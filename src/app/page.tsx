import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { AppContextProvider, Controls, DiscGrid, Filters, Header, ScrollToTop } from "@components";
import { getBags, getDiscs } from "@services";

import type { ViewOption } from "@types";

export default async function HomePage({ searchParams }: { searchParams: Record<string, string | undefined> }) {
	const { userId } = auth();
	const { disc, view } = searchParams;
	const [discs, bags = []] = await Promise.all([getDiscs(), userId ? getBags({ userId }) : []]);
	return (
		<ClerkProvider>
			<AppContextProvider discs={discs} bags={bags} initialView={view as ViewOption} initialDiscSlug={disc}>
				<main className="flex-column-center">
					<Header />
					<Filters />
					<Controls />
					<DiscGrid />
					<ScrollToTop />
				</main>
			</AppContextProvider>
		</ClerkProvider>
	);
}
