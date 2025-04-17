"use client";

import { useState } from "react";

import { Modal } from "@/components/Modal";
import { AppContext } from "@/contexts";
import { View } from "@/enums";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [view, setView] = useState(View.Search);
	const [modalContent, setModalContent] = useState<React.ReactNode>(null);
	const [modalProps, setModalProps] = useState<{
		onClose?: () => void;
		isCloseBtnVisible?: boolean;
	}>({});

	return <AppContext.Provider value={{ view, setView }}>{children}</AppContext.Provider>;
};
