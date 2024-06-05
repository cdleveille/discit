import { Bag, Disc } from "@types";

export type AppContextProviderProps = {
	children: React.ReactNode;
	discs: Disc[];
	bags: Bag[];
};

export type ClientContextProviderProps = {
	children: React.ReactNode;
};

export type DiscProps = {
	disc: Disc;
};

export type DiscDetailProps = {
	disc: Disc;
};

export type ModalProps = {
	children: React.ReactNode;
	open: boolean;
	onClose: () => void;
	showCloseBtn?: boolean;
};

export type NewBagProps = {
	onComplete: () => void;
};

export type BagListProps = {
	onClose: () => void;
};
