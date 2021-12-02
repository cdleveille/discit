import { useEffect, useState } from "react";

import Background from "./Background";
import DiscDetail from "./DiscDetail";
import DiscGrid from "./DiscGrid";
import Form from "./Form";
import Header from "./Header";
import Overlay from "./Overlay";
import { ClientConfig } from "../helpers/clientconfig";
import { IDisc } from "../types/abstract";

const API_URL = ClientConfig.Public.NEXT_PUBLIC_API_URL;
const NUM_DISCS_TO_RENDER_INCR = 100;

const Main = () => {
	const [discs, setDiscs] = useState([] as IDisc[]);
	const [filteredDiscs, setFilteredDiscs] = useState([] as IDisc[]);
	const [renderedDiscs, setRenderedDiscs] = useState([] as IDisc[]);
	const [detailEnabled, setDetailEnabled] = useState(true);
	const [detailVisible, setDetailVisible] = useState(false);
	const [activeDetailDisc, setActiveDetailDisc] = useState({} as IDisc);
	const [activeDetailDiscColor, setActiveDetailDiscColor] = useState("#ffc000");
	const [showOverlay, setShowOverlay] = useState(false);
	const [spinClass, setSpinClass] = useState("spin-in");
	const [filterInputsDisabed, setFilterInputsDisabled] = useState(false);
	const [numDiscsToRender, setNumDiscsToRender] = useState(NUM_DISCS_TO_RENDER_INCR);

	useEffect(() => {
		(async () => {
			const discsFromServer = await fetchDiscsFromServer();
			setDiscs(discsFromServer);
			updateFilteredDiscs(discsFromServer);
			updateRenderedDiscs(discsFromServer);
		})();
	}, []);

	useEffect(() => {
		updateRenderedDiscs(filteredDiscs);
	}, [numDiscsToRender, filteredDiscs]);

	const updateFilteredDiscs = (newFilteredDiscs: IDisc[]) => {
		setFilteredDiscs(newFilteredDiscs);
	};

	const updateNumDiscsToRender = () => {
		setNumDiscsToRender(numDiscsToRender + NUM_DISCS_TO_RENDER_INCR);
	};

	const updateRenderedDiscs = (filteredDiscsToRender: IDisc[]) => {
		setRenderedDiscs(filteredDiscsToRender.slice(0, numDiscsToRender));
	};

	const fetchDiscsFromServer = async (): Promise<IDisc[]> => {
		const res: Response = await fetch(`${API_URL}/disc`);
		const data: IDisc[] = await res.json();
		return data;
	};

	const showDiscDetail = (data: IDisc, color: string) => {
		if (!detailEnabled) return;
		setShowOverlay(true);
		setActiveDetailDisc(data);
		setActiveDetailDiscColor(color);
		setDetailVisible(true);
		setSpinClass("spin-in");
		setFilterInputsDisabled(true);
	};

	const hideDiscDetail = async () => {
		if (!showOverlay) return;
		setDetailEnabled(false);
		setShowOverlay(false);
		setSpinClass("spin-out");
		setFilterInputsDisabled(false);

		setTimeout(() => {
			setDetailVisible(false);
			setDetailEnabled(true);
		}, 500);
	};

	const onNameInputChange = async (value: string) => {
		setNumDiscsToRender(NUM_DISCS_TO_RENDER_INCR);
		if (!value) {
			updateFilteredDiscs(discs);
		} else {
			const newFilteredDiscs = discs.filter((disc) => {
				return disc.name.toLowerCase().match(value.toLowerCase());
			});

			updateFilteredDiscs(newFilteredDiscs);
		}
	};

	return (
		<div className="main">
			<Background onClick={hideDiscDetail} />
			<Overlay visible={showOverlay} />
			<Header />
			<Form data={discs} disabled={filterInputsDisabed} onNameInputChange={onNameInputChange} />
			<DiscDetail data={activeDetailDisc} color={activeDetailDiscColor} visible={detailVisible} spinClass={spinClass} />
			<DiscGrid data={renderedDiscs} updateNumDiscsToRender={updateNumDiscsToRender} showDiscDetail={showDiscDetail} />
		</div>
	);
};

export default Main;
