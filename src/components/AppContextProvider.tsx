"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@clerk/nextjs";
import { DiscDetail, Modal, NewBag, SignIn } from "@components";
import { INITIAL_FILTER_VALUES, View } from "@constants";
import { AppContext } from "@contexts";
import { useQueryString } from "@hooks";

import type { AppContextProviderProps, Bag, Disc, FilterValues, ModalProps, ViewOption } from "@types";

export const AppContextProvider = ({
	children,
	discs: _discs,
	bags: _bags,
	initialView,
	initialDiscSlug
}: AppContextProviderProps) => {
	const initialDisc = initialDiscSlug ? _discs.find(disc => disc.name_slug === initialDiscSlug) ?? null : null;

	const [discs, setDiscs] = useState(_discs);
	const [filteredDiscs, setFilteredDiscs] = useState(_discs);

	const [bags, setBags] = useState<Bag[]>([]);
	const [selectedBag, setSelectedBag] = useState<Bag | null>(null);
	const [filterValues, setFilterValues] = useState<FilterValues>(INITIAL_FILTER_VALUES);

	const [view, setView] = useState<ViewOption>(initialView ?? View.SEARCH);

	const { userId } = useAuth();
	const { updateQueryString } = useQueryString();

	useEffect(() => {
		const userBags = userId ? _bags.filter(({ user_id }) => user_id === userId) : [];
		setBags(userBags);
	}, [userId, _bags]);

	useEffect(() => {
		setSelectedBag(bags[bags.length - 1] ?? null);
	}, [bags]);

	useEffect(() => {
		if (view === View.BAG) {
			updateQueryString("view", "bag");
			return;
		}
		updateQueryString("view", null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [view]);

	const onModalClose = () => {
		setModalContent(null);
		setModalProps({});
	};

	const onDiscModalClose = () => {
		onModalClose();
		updateQueryString("disc", null);
	};

	const showSignInModal = () => setModalContent(<SignIn />);

	const showDiscDetailModal = (disc: Disc) => {
		updateQueryString("disc", disc.name_slug);
		setModalContent(<DiscDetail disc={disc} />);
		setModalProps({ onClose: onDiscModalClose });
	};

	const showNewBagModal = () => {
		setModalProps({ showCloseBtn: true });
		setModalContent(<NewBag onComplete={onModalClose} />);
	};

	const [modalContent, setModalContent] = useState<React.ReactNode>(
		initialDisc ? <DiscDetail disc={initialDisc} /> : null
	);
	const [modalProps, setModalProps] = useState<Partial<ModalProps>>(initialDisc ? { onClose: onDiscModalClose } : {});

	return (
		<AppContext.Provider
			value={{
				discs,
				setDiscs,
				filteredDiscs,
				setFilteredDiscs,
				bags,
				setBags,
				selectedBag,
				setSelectedBag,
				filterValues,
				setFilterValues,
				showSignInModal,
				showDiscDetailModal,
				showNewBagModal,
				view,
				setView
			}}
		>
			{children}
			<Modal open={!!modalContent} onClose={onModalClose} {...modalProps}>
				{modalContent}
			</Modal>
		</AppContext.Provider>
	);
};
