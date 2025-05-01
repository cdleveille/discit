import type * as shared from "discit-types";

import type { View } from "@constants";

export type TDisc = shared.TDisc;
export type TBag = shared.TBag;

export type TAppContext = {
	discs: TDisc[];
	view: View;
	setView: TReactStateSetter<View>;
	modalContent: React.ReactNode;
	modalProps: Partial<TModalProps>;
	setModalProps: TReactStateSetter<Partial<TModalProps>>;
	onModalClose: () => void;
	showSignInModal: () => void;
	showAboutModal: () => void;
	showDiscDetailModal: (disc: TDisc) => void;
	filteredDiscs: TDisc[];
	setFilteredDiscs: TReactStateSetter<TDisc[]>;
	filterValues: TFilterValues;
	setFilterValues: TReactStateSetter<TFilterValues>;
	filtersEnabled: TFiltersEnabled;
	setFiltersEnabled: TReactStateSetter<TFiltersEnabled>;
	bags: TBag[] | undefined;
	selectedBag: TBag | null;
	setSelectedBagId: TReactStateSetter<string | null>;
	isSortAZ: boolean;
	toggleSortOrder: () => void;
	showBagAddModal: () => void;
	showBagEditModal: (bag: TBag) => void;
	showBagDeleteModal: (bag: TBag) => void;
};

export type TReactStateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type TModalProps = {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
	showCloseBtn?: boolean;
};

export type TFilterOptions = {
	name: string[];
	brand: string[];
	category: string[];
	stability: string[];
	speed: string[];
	glide: string[];
	turn: string[];
	fade: string[];
};

export type TFilterValues = {
	name: string;
	brand: string[];
	category: string[];
	stability: string[];
	speed: string[];
	glide: string[];
	turn: string[];
	fade: string[];
};

export type TFiltersEnabled = {
	name: boolean;
	brand: boolean;
	category: boolean;
	stability: boolean;
	speed: boolean;
	glide: boolean;
	turn: boolean;
	fade: boolean;
};

export type THeaders = Headers | Record<string, string>;
