import type * as shared from "discit-types";

import type { View } from "@/enums";

export type TDisc = shared.TDisc;

export type TAppContext = {
	view: View;
	setView: TReactStateSetter<View>;
};

export type TDataContext = {
	discs: TDisc[];
};

export type TReactStateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
