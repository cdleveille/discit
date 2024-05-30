import { DiscContextProvider } from "@components";
import { useApi } from "@hooks";

export const Home = async () => {
	const { getDiscs } = useApi();
	return <DiscContextProvider discs={await getDiscs()} />;
};
