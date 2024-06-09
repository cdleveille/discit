import type { Bag, Disc, ViewOption } from "@types";
import type { Dispatch, SetStateAction } from "react";

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

export type BagAddFormProps = {
	name: string;
	setName: Dispatch<SetStateAction<string>>;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	error: string | null;
};

export type BagEditFormProps = BagAddFormProps & { initialBagName: string };

export type BagDeleteFormProps = {
	name: string;
	error: string | null;
};

export type BagDeleteProps = {
	bag: Bag;
	onClose: () => void;
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
