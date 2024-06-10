import { auth } from "@clerk/nextjs/server";
import { AppContextProvider, Controls, DiscGrid, Filters, Header, ScrollToTop } from "@components";
import { Stack } from "@mui/material";
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
			initialView={(Array.isArray(view) ? view[0] : view) as ViewOption}
			initialDiscSlug={Array.isArray(disc) ? disc[0] : disc}
		>
			<main>
				<Stack alignItems="center" spacing="0.75rem">
					<Header />
					<Filters />
					<Controls />
					<DiscGrid />
					<ScrollToTop />
				</Stack>
			</main>
		</AppContextProvider>
	);
}
