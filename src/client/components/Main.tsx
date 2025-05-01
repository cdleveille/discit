import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import { Controls, DiscGrid, Filters, Header, Modal, ScrollToTop } from "@components";
import { useAppContext } from "@hooks";

export const Main = () => {
	const { name_slug } = useParams();

	const { discs, modalContent, modalProps, setModalProps, onModalClose, showDiscDetailModal } =
		useAppContext();

	const navigate = useNavigate();

	useEffect(() => {
		if (!name_slug) return;
		const disc = discs.find(d => d.name_slug === name_slug);
		if (!disc) {
			navigate("/");
			return;
		}
		setModalProps({
			onClose: () => {
				navigate("/");
				onModalClose();
			}
		});
		showDiscDetailModal(disc);
	}, [name_slug, discs, showDiscDetailModal, navigate, setModalProps, onModalClose]);

	return (
		<main>
			<Header />
			<Filters />
			<Controls />
			<DiscGrid />
			<ScrollToTop />
			<Modal isOpen={!!modalContent} onClose={onModalClose} {...modalProps}>
				{modalContent}
			</Modal>
			<Toaster
				position="bottom-center"
				toastOptions={{
					duration: 3000,
					style: {
						boxShadow: "0 0 1rem rgba(0, 0, 0, 0.8)"
					}
				}}
			/>
		</main>
	);
};
