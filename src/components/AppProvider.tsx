"use client";

import { useState } from "react";

import { Dialog } from "@/components/Dialog";
import { AppContext } from "@/contexts";
import { View } from "@/enums";
import type { TDisc } from "@/types";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [view, setView] = useState(View.Search);
	const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);
	const [dialogProps, setDialogProps] = useState<{
		onClose?: () => void;
		isCloseBtnVisible?: boolean;
	}>({});

	const showDiscDetail = (disc: TDisc) => {
		setDialogContent(
			<div style={{ backgroundColor: "cyan", padding: "2rem" }}>{disc.name}</div>
		);
	};

	const onCloseDialog = () => {
		setDialogContent(null);
		setDialogProps({});
	};

	return (
		<AppContext.Provider value={{ view, setView, showDiscDetail }}>
			{children}
			<Dialog isOpen={!!dialogContent} onClose={onCloseDialog}>
				{dialogContent}
			</Dialog>
		</AppContext.Provider>
	);
};
