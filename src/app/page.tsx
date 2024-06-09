import { auth } from "@clerk/nextjs/server";
import { AppContextProvider, Controls, DiscGrid, Filters, Header, ScrollToTop } from "@components";
import { getBags, getDiscs } from "@services";

import type { ViewOption } from "@types";

export default async function HomePage({
	searchParams
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const { userId } = auth();
	const { disc, view } = searchParams;
	const [discs, bags] = await Promise.all([getDiscs(), userId ? getBags({ userId }) : []]);

	return (
		<AppContextProvider
			discs={discs}
			bags={bags}
			initialView={view as ViewOption}
			initialDiscSlug={Array.isArray(disc) ? disc[0] : disc}
		>
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
