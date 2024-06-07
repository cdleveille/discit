"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { BagDelete, BagForm, DiscDetail, Modal, Settings, SignIn } from "@components";
import { INITIAL_FILTER_VALUES, INITIAL_FILTERS_ENABLED, View } from "@constants";
import { AppContext } from "@contexts";
import { useApi, usePrevious, useQueryString } from "@hooks";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";

import type { AppContextProviderProps, Bag, Disc, ModalProps, ViewOption } from "@types";

export const AppContextProvider = ({
	children,
	discs: _discs,
	bags,
	initialView,
	initialDiscSlug
}: AppContextProviderProps) => {
	const initialDisc = initialDiscSlug ? _discs.find(disc => disc.name_slug === initialDiscSlug) ?? null : null;

	const [discs, setDiscs] = useState(_discs);
	const [filteredDiscs, setFilteredDiscs] = useState<Disc[]>(initialView === View.BAG ? [] : _discs);
	const [selectedBag, setSelectedBag] = useState<Bag | null>(bags[0] ?? null);
	const [filterValues, setFilterValues] = useState(INITIAL_FILTER_VALUES);
	const [filtersEnabled, setFiltersEnabled] = useState(INITIAL_FILTERS_ENABLED);
	const [view, setView] = useState<ViewOption>(initialView ?? View.SEARCH);

	const { createBag, editBagName, deleteBag } = useApi();
	const { updateQueryString } = useQueryString();

	const { bags: bagsPrevious } = usePrevious({ bags }) ?? {};

	useEffect(() => {
		if (bags.length <= 1 || !selectedBag || !bagsPrevious || bagsPrevious.length === 0) {
			// <=1 bags left: select first bag, else null
			setSelectedBag(bags[0] ?? null);
		} else if (bags.length > bagsPrevious.length) {
			// added a bag: select last bag
			setSelectedBag(bags[bags.length - 1]);
		} else if (bags.length < bagsPrevious.length) {
			// removed the selected bag: select first bag
			if (!bags.some(bag => bag.id === selectedBag.id)) setSelectedBag(bags[0]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [bags]);

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
					const res = await deleteBag({ bagId: bag.id });
					if (res.error) return toast.error("Error deleting bag");
					toast.success(`Deleted ${bag.name}`);
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
