import React, { useEffect, useState } from "react";

import DiscDetail from "./DiscDetail";
import DiscGrid from "./DiscGrid";
import Form from "./Form";
import Header from "./Header";
import Overlay from "./Overlay";

import Config from "../helpers/config";
import { stringIncludesString, stringArrayIncludesString, getArrayIntersection } from "../helpers/util";
import { IDisc } from "../types/abstract";
import { CSSClasses, NUM_DISCS_TO_RENDER_INCR } from "../types/constants";

const Main: React.FC = () => {
	const [allDiscs, setAllDiscs] = useState<IDisc[]>([]);
	const [filteredDiscs, setFilteredDiscs] = useState<IDisc[]>([]);
	const [filteredDiscsByName, setFilteredDiscsByName] = useState<IDisc[]>([]);
	const [filteredDiscsByBrand, setFilteredDiscsByBrand] = useState<IDisc[]>([]);
	const [filteredDiscsByCategory, setFilteredDiscsByCategory] = useState<IDisc[]>([]);
	const [filteredDiscsByStability, setFilteredDiscsByStability] = useState<IDisc[]>([]);
	const [renderedDiscs, setRenderedDiscs] = useState<IDisc[]>([]);
	const [numDiscsToRender, setNumDiscsToRender] = useState(NUM_DISCS_TO_RENDER_INCR);

	const [detailEnabled, setDetailEnabled] = useState(true);
	const [detailVisible, setDetailVisible] = useState(false);
	const [activeDetailDisc, setActiveDetailDisc] = useState<IDisc | null>(null);
	const [activeDetailDiscColor, setActiveDetailDiscColor] = useState("");
	const [activeDetailDiscBackgroundColor, setActiveDetailDiscBackgroundColor] = useState("");
	const [spinClass, setSpinClass] = useState(CSSClasses.spinInDetail);
	const [showOverlay, setShowOverlay] = useState(false);

	const [nameFilterValue, setNameFilterValue] = useState("");
	const [brandFilterValue, setBrandFilterValue] = useState<string[]>([]);
	const [categoryFilterValue, setCategoryFilterValue] = useState<string[]>([]);
	const [stabilityFilterValue, setStabilityFilterValue] = useState<string[]>([]);
	const [filterInputsDisabed, setFilterInputsDisabled] = useState(false);
	const [sortAtoZ, setSortAtoZ] = useState(true);

	useEffect(() => {
		(async () => {
			let allDiscsFromServer = await fetchAllDiscsFromServer();
			allDiscsFromServer = sortDiscs(allDiscsFromServer);
			setAllDiscs(allDiscsFromServer);
			resetFilteredDiscs(allDiscsFromServer);
		})();
	}, []);

	useEffect(() => {
		const sortedDiscs = sortDiscs(allDiscs);
		setAllDiscs(sortedDiscs);
		applyFilters(true);
	}, [sortAtoZ]);

	useEffect(() => {
		setRenderedDiscs(filteredDiscs.slice(0, numDiscsToRender));
	}, [filteredDiscs, numDiscsToRender]);

	useEffect(() => {
		applyFilters();
	}, [nameFilterValue, brandFilterValue, categoryFilterValue, stabilityFilterValue]);

	const fetchAllDiscsFromServer = async (): Promise<IDisc[]> => {
		const res: Response = await fetch(`${Config.Public.API_URL}/disc`);
		const data: IDisc[] = await res.json();
		return data;
	};

	const applyFilters = (applySort?: boolean) => {
		setNumDiscsToRender(NUM_DISCS_TO_RENDER_INCR);

		if (
			!nameFilterValue &&
			brandFilterValue.length === 0 &&
			categoryFilterValue.length === 0 &&
			stabilityFilterValue.length === 0 &&
			!applySort
		) {
			resetFilteredDiscs(allDiscs);
		} else {
			const newFilteredDiscsByName = allDiscs.filter((disc) => {
				return nameFilterValue ? stringIncludesString(disc.name, nameFilterValue) : true;
			});

			const newFilteredDiscsByBrand = allDiscs.filter((disc) => {
				return brandFilterValue.length > 0 ? stringArrayIncludesString(brandFilterValue, disc.brand, true) : true;
			});

			const newFilteredDiscsByCategory = allDiscs.filter((disc) => {
				return categoryFilterValue.length > 0 ? stringArrayIncludesString(categoryFilterValue, disc.category, true) : true;
			});

			const newFilteredDiscsByStability = allDiscs.filter((disc) => {
				return stabilityFilterValue.length > 0 ? stringArrayIncludesString(stabilityFilterValue, disc.stability, true) : true;
			});

			const newFilteredDiscs = getArrayIntersection(
				newFilteredDiscsByName,
				newFilteredDiscsByBrand,
				newFilteredDiscsByCategory,
				newFilteredDiscsByStability
			);

			setFilteredDiscs(newFilteredDiscs);
			setFilteredDiscsByName(newFilteredDiscsByName);
			setFilteredDiscsByBrand(newFilteredDiscsByBrand);
			setFilteredDiscsByCategory(newFilteredDiscsByCategory);
			setFilteredDiscsByStability(newFilteredDiscsByStability);
		}
	};

	const incrementNumDiscsToRender = () => {
		if (numDiscsToRender < filteredDiscs.length) setNumDiscsToRender(numDiscsToRender + NUM_DISCS_TO_RENDER_INCR);
	};

	const showDiscDetail = (data: IDisc, color: string, backgroundColor: string) => {
		if (!detailEnabled) return;
		setShowOverlay(true);
		setActiveDetailDisc(data);
		setActiveDetailDiscColor(color);
		setActiveDetailDiscBackgroundColor(backgroundColor);
		setDetailVisible(true);
		setSpinClass(CSSClasses.spinInDetail);
		setFilterInputsDisabled(true);
	};

	const hideDiscDetail = async () => {
		if (!showOverlay) return;
		setDetailEnabled(false);
		setShowOverlay(false);
		setSpinClass(CSSClasses.spinOutDetail);
		setFilterInputsDisabled(false);

		setTimeout(() => {
			setDetailVisible(false);
			setDetailEnabled(true);
		}, 500);
	};

	const resetFilteredDiscs = (discs: IDisc[]) => {
		setFilteredDiscs(discs);
		setFilteredDiscsByName(discs);
		setFilteredDiscsByBrand(discs);
		setFilteredDiscsByCategory(discs);
		setFilteredDiscsByStability(discs);
	};

	const toggleSortOrder = () => {
		setSortAtoZ(!sortAtoZ);
	};

	const sortDiscs = (discs: IDisc[]): IDisc[] => {
		return discs.sort((a, b) => {
			return (sortAtoZ ? 1 : -1) * a.name.toLowerCase().localeCompare(b.name.toLowerCase());
		});
	};

	return (
		<div className="main">
			<Overlay visible={showOverlay} onClick={hideDiscDetail} />
			<Header />
			<Form
				filteredDiscsByName={filteredDiscsByName}
				filteredDiscsByBrand={filteredDiscsByBrand}
				filteredDiscsByCategory={filteredDiscsByCategory}
				filteredDiscsByStability={filteredDiscsByStability}
				disabled={filterInputsDisabed}
				setNameFilterValue={setNameFilterValue}
				setBrandFilterValue={setBrandFilterValue}
				setCategoryFilterValue={setCategoryFilterValue}
				setStabilityFilterValue={setStabilityFilterValue}
				sortAtoZ={sortAtoZ}
			/>
			<DiscDetail
				data={activeDetailDisc}
				color={activeDetailDiscColor}
				backgroundColor={activeDetailDiscBackgroundColor}
				visible={detailVisible}
				spinClass={spinClass}
			/>
			<DiscGrid
				data={renderedDiscs}
				renderMoreDiscs={incrementNumDiscsToRender}
				showDiscDetail={showDiscDetail}
				count={filteredDiscs.length}
				toggleSortOrder={toggleSortOrder}
			/>
		</div>
	);
};

export default Main;
