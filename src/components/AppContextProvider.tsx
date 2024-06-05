"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@clerk/nextjs";
import { DiscDetail, Modal, NewBag, SignIn } from "@components";
import { INITIAL_FILTER_VALUES } from "@constants";
import { AppContext } from "@contexts";

import type { AppContextProviderProps, Bag, Disc, FilterValues, ModalProps } from "@types";

export const AppContextProvider = ({ children, discs: _discs, bags: _bags }: AppContextProviderProps) => {
	const { userId } = useAuth();

	const [discs, setDiscs] = useState(_discs);
	const [filteredDiscs, setFilteredDiscs] = useState(_discs);

	const [bags, setBags] = useState<Bag[]>([]);
	const [selectedBag, setSelectedBag] = useState<Bag | null>(null);
	const [filterValues, setFilterValues] = useState<FilterValues>(INITIAL_FILTER_VALUES);

	const [modalContent, setModalContent] = useState<React.ReactNode>(null);
	const [modalProps, setModalProps] = useState<Partial<ModalProps>>({});

	useEffect(() => {
		const userBags = userId ? _bags.filter(({ user_id }) => user_id === userId) : [];
		setBags(userBags);
	}, [userId, _bags]);

	useEffect(() => {
		setSelectedBag(bags[bags.length - 1] ?? null);
	}, [bags]);

	const onModalClose = () => {
		setModalContent(null);
		setModalProps({});
	};

	const showSignInModal = () => setModalContent(<SignIn />);

	const showDiscDetailModal = (disc: Disc) => setModalContent(<DiscDetail disc={disc} />);

	const showNewBagModal = () => {
		setModalProps({ showCloseBtn: true });
		setModalContent(<NewBag onComplete={onModalClose} />);
	};

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
				showNewBagModal
			}}
		>
			{children}
			<Modal open={!!modalContent} onClose={onModalClose} {...modalProps}>
				{modalContent}
			</Modal>
		</AppContext.Provider>
	);
};
