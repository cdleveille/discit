"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "@clerk/nextjs";
import { BagDelete, BagForm, DiscDetail, Modal, Settings, SignIn } from "@components";
import { INITIAL_FILTER_VALUES, INITIAL_FILTERS_ENABLED, View } from "@constants";
import { AppContext } from "@contexts";
import { useApi, useQueryString } from "@hooks";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";

import type { AppContextProviderProps, Bag, Disc, ModalProps, ViewOption } from "@types";
export const AppContextProvider = ({
	children,
	discs: _discs,
	bags: _bags,
	initialView,
	initialDiscSlug
}: AppContextProviderProps) => {
	const initialDisc = initialDiscSlug ? _discs.find(disc => disc.name_slug === initialDiscSlug) ?? null : null;

	const [discs, setDiscs] = useState(_discs);
	const [filteredDiscs, setFilteredDiscs] = useState<Disc[]>(initialView === View.BAG ? [] : _discs);

	const [bags, setBags] = useState<Bag[]>([]);
	const [selectedBag, setSelectedBag] = useState<Bag | null>(null);

	const [filterValues, setFilterValues] = useState(INITIAL_FILTER_VALUES);
	const [filtersEnabled, setFiltersEnabled] = useState(INITIAL_FILTERS_ENABLED);

	const [view, setView] = useState<ViewOption>(initialView ?? View.SEARCH);

	const { userId } = useAuth();
	const { createBag, editBagName, deleteBag } = useApi();
	const { updateQueryString } = useQueryString();

	useEffect(() => {
		const userBags = userId ? _bags.filter(({ user_id }) => user_id === userId) : [];
		setBags(userBags);
		setSelectedBag(userBags[0] ?? null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId]);

	useEffect(() => setBags(_bags), [_bags]);

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
		setModalContent(
			<BagForm
				title="New Bag"
				submitLabel="Add"
				endIcon={<AddIcon />}
				onComplete={async ({ userId, bagName }) => {
					onModalClose();
					const res = await createBag({ userId, bagName });
					if (res.error) return;
					toast.success(`Added ${res.name}`);
					setSelectedBag(res);
				}}
			/>
		);
	};

	const showEditBagModal = ({ id: bagId, name }: Bag) => {
		setModalProps({ showCloseBtn: true });
		setModalContent(
			<BagForm
				title="Edit Bag"
				initialName={name}
				submitLabel="Save"
				endIcon={<SaveIcon />}
				onComplete={async ({ bagName }) => {
					onModalClose();
					const res = await editBagName({ bagId, bagName });
					if (res.error) return;
					toast.success(`Renamed to ${res.name}`);
					setSelectedBag(res);
				}}
			/>
		);
	};

	const showBagDeleteModal = (bag: Bag) => {
		setModalProps({ showCloseBtn: true });
		setModalContent(
			<BagDelete
				bag={bag}
				onSubmit={async () => {
					onModalClose();
					const selectedBagDeleted = selectedBag?.id === bag.id;
					const deletedBagIndex = bags.indexOf(bag);
					const res = await deleteBag({ bagId: bag.id });
					if (res.error) return toast.error("Error deleting bag");
					toast.success(`Deleted ${bag.name}`);
					if (selectedBagDeleted)
						setSelectedBag(bags[deletedBagIndex - 1] ?? bags[deletedBagIndex + 1] ?? null);
				}}
			/>
		);
	};

	const showSettingsModal = () => {
		setModalProps({ showCloseBtn: true });
		setModalContent(<Settings />);
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
				filtersEnabled,
				setFiltersEnabled,
				showSignInModal,
				showDiscDetailModal,
				showNewBagModal,
				showEditBagModal,
				showBagDeleteModal,
				showSettingsModal,
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
