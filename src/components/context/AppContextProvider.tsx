"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "@clerk/nextjs";
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

	const { _bags: bagsPrevious } = usePrevious({ _bags, selectedBag }) ?? {};

	useEffect(() => {
		if (!userId || !_bags || _bags.length === 0) {
			setBags([]);
			setSelectedBag(null);
			return;
		}
		const userBags = _bags.filter(({ user_id }) => user_id === userId);
		const userBagsPrevious = bagsPrevious?.filter(({ user_id }) => user_id === userId);
		setBags(userBags);
		if (
			userBags.length <= 1 ||
			!selectedBag ||
			!userBagsPrevious ||
			userBagsPrevious.length === 0 ||
			userBags.length < userBagsPrevious.length
		) {
			// <=1 bags OR removed a bag: set selected bag to first bag, else null
			setSelectedBag(userBags[0] ?? null);
		} else if (userBags.length > userBagsPrevious.length) {
			// added a bag: set selected bag to last bag
			setSelectedBag(userBags[userBags.length - 1] ?? null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId, _bags]);

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
