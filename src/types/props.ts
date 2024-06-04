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
	name_slug: string;
	hideNavButtons?: boolean;
	hideAddButton?: boolean;
};

export type ModalProps = {
	children: React.ReactNode;
	borderRadius?: string;
	showCloseBtn?: boolean;
};

export type NewBagProps = {
	backOnSubmit?: boolean;
};

export type BagListProps = {
	onClose: () => void;
};
