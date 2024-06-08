import type { Bag, Disc, ViewOption } from "@types";

export type AppContextProviderProps = {
	children: React.ReactNode;
	discs: Disc[];
	bags: Bag[];
	initialView?: ViewOption;
	initialDiscSlug?: string;
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

export type BagAddProps = {
	onClose: () => void;
};

export type BagEditProps = {
	bag: Bag;
	onClose: () => void;
};

export type BagDeleteProps = {
	bag: Bag;
	onSubmit: () => void;
};

export type BagListProps = {
	onClose: () => void;
};

export type IconButtonProps = {
	isTransparent?: boolean;
	isSolid?: boolean;
	isSelected?: boolean;
	className?: string;
	onKey?: {
		keyCode: string;
		action: () => void;
	};
};
