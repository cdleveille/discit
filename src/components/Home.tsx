import { DiscContextProvider, Header, ScrollToTop } from "@components";
import { useApi } from "@hooks";

export const Home = async () => {
	const { getDiscs } = useApi();
	return (
		<main className="main">
			<Header />
			<DiscContextProvider discs={await getDiscs()} />
			<ScrollToTop />
		</main>
	);
};
