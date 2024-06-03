import { Bag, Disc } from "@types";

export type DiscContextProviderProps = {
	discs: Disc[];
	bags: Bag[];
	children: React.ReactNode;
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
};

export type ModalProps = {
	children: React.ReactNode;
	borderRadius?: string;
	showCloseBtn?: boolean;
};

export type NewBagProps = {
	backOnSubmit?: boolean;
};
