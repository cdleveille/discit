import { useAuth } from "@clerk/clerk-react";
import { useCallback, useEffect, useState } from "react";

import { About, BagAdd, BagDelete, BagEdit, DiscDetail, SignIn } from "@components";
import { INITIAL_FILTERS_ENABLED, INITIAL_FILTER_VALUES, View } from "@constants";
import { AppContext } from "@contexts";
import { useApi, usePersistedState } from "@hooks";
import type { TBag, TDisc, TModalProps } from "@types";

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [view, setView] = usePersistedState(View.Search, "view");
	const [selectedBagId, setSelectedBagId] = usePersistedState<string | null>(
		null,
		"selected-bag-id"
	);
	const [selectedBag, setSelectedBag] = useState<TBag | null>(null);

	const [filteredDiscs, setFilteredDiscs] = useState<TDisc[]>([]);
	const [filterValues, setFilterValues] = useState(INITIAL_FILTER_VALUES);
	const [filtersEnabled, setFiltersEnabled] = useState(INITIAL_FILTERS_ENABLED);

	const [modalContent, setModalContent] = useState<React.ReactNode>(null);
	const [modalProps, setModalProps] = useState<Partial<TModalProps>>({});

	const [isSortAZ, setIsSortAZ] = useState(true);

	const toggleSortOrder = () => setIsSortAZ(current => !current);

	const { userId, isLoaded } = useAuth();

	const { getDiscs, getBags } = useApi();
	const { data: discs } = getDiscs();
	const { data: bags } = getBags(userId);

	useEffect(() => {
		const bag = bags?.find(b => b.id === selectedBagId) ?? bags?.[0] ?? null;
		setSelectedBag(bag);
	}, [bags, selectedBagId]);

	const onModalClose = useCallback(() => {
		setModalContent(null);
		setModalProps({});
	}, []);

	const showSignInModal = () => setModalContent(<SignIn />);

	const showAboutModal = () => {
		setModalProps({ showCloseBtn: true });
		setModalContent(<About />);
	};

	const showDiscDetailModal = useCallback((disc: TDisc) => {
		setModalContent(<DiscDetail disc={disc} />);
	}, []);

	const showBagAddModal = () => {
		setModalProps({ showCloseBtn: true });
		setModalContent(<BagAdd onClose={onModalClose} />);
	};

	const showBagEditModal = (bag: TBag) => {
		setModalProps({ showCloseBtn: true });
		setModalContent(<BagEdit bag={bag} onClose={onModalClose} />);
	};

	const showBagDeleteModal = (bag: TBag) => {
		setModalProps({ showCloseBtn: true });
		setModalContent(<BagDelete bag={bag} onClose={onModalClose} />);
	};

	if (!discs || (!bags && !isLoaded)) return null;

	return (
		<AppContext.Provider
			value={{
				discs,
				view,
				setView,
				modalContent,
				modalProps,
				setModalProps,
				onModalClose,
				showSignInModal,
				showAboutModal,
				showDiscDetailModal,
				filteredDiscs,
				setFilteredDiscs,
				filterValues,
				setFilterValues,
				filtersEnabled,
				setFiltersEnabled,
				bags,
				selectedBag,
				setSelectedBagId,
				isSortAZ,
				toggleSortOrder,
				showBagAddModal,
				showBagEditModal,
				showBagDeleteModal
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
