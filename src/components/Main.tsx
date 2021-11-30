import { useEffect, useState } from "react";

import DiscGrid from "./DiscGrid";
import Header from "./Header";
import { ClientConfig } from "../helpers/clientconfig";
import { IDisc } from "../types/abstract";

const API_URL = ClientConfig.Public.NEXT_PUBLIC_API_URL;
const NUM_DISCS_TO_RENDER = 100;

const Main = () => {
	const [nextDiscToRenderIndex, setNextDiscToRenderIndex] = useState(0);
	// eslint-disable-next-line no-unused-vars
	const [discs, setDiscs] = useState([] as IDisc[]);
	const [filteredDiscs, setFilteredDiscs] = useState([] as IDisc[]);
	const [renderedDiscs, setRenderedDiscs] = useState([] as IDisc[]);

	const renderMoreDiscs = () => {
		if (renderedDiscs.length < filteredDiscs.length) {
			const endIndex = nextDiscToRenderIndex + NUM_DISCS_TO_RENDER;
			const newDiscsToRender = filteredDiscs.slice(nextDiscToRenderIndex, endIndex);

			setRenderedDiscs([...renderedDiscs, ...newDiscsToRender]);
			setNextDiscToRenderIndex(endIndex);
		}
	};

	useEffect(() => {
		(async () => {
			const discsFromServer = await fetchDiscsFromServer();
			setDiscs(discsFromServer);
			setFilteredDiscs(discsFromServer);
			setRenderedDiscs(discsFromServer.splice(0, NUM_DISCS_TO_RENDER));
			setNextDiscToRenderIndex(NUM_DISCS_TO_RENDER);
		})();
	}, []);

	const fetchDiscsFromServer = async (): Promise<IDisc[]> => {
		const res: Response = await fetch(`${API_URL}/disc`);
		const data: IDisc[] = await res.json();
		return data;
	};

	return (
		<div className="main">
			<Header />
			<DiscGrid data={renderedDiscs} renderMoreDiscs={renderMoreDiscs} />
		</div>
	);
};

export default Main;
