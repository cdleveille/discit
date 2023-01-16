import React from "react";

import Dialog from "@mui/material/Dialog";

import { CloseButton } from "./CloseButton";

interface IAboutDialogProps {
	open: boolean;
	onClose: () => void;
}

export const AboutDialog = ({ open, onClose }: IAboutDialogProps) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<div className="about-dialog">
				<CloseButton onClick={onClose} />
				<div className="dialog-line">
					Created just for fun by{" "}
					<a href="https://www.cdleveille.net" target="_blank" rel="noreferrer">
						Chris Leveille
					</a>
					.
				</div>
				<div className="about-dialog-line">
					Disc data sourced from the{" "}
					<a href="https://www.marshallstreetdiscgolf.com/flightguide" target="_blank" rel="noreferrer">
						Marshall Street Disc Golf Interactive Flight Guide
					</a>{" "}
					and accessed via the{" "}
					<a href="https://github.com/cdleveille/discit-api" target="_blank" rel="noreferrer">
						DiscIt API
					</a>
					.
				</div>
				<div className="about-dialog-line copyright">©&nbsp;{new Date().getFullYear()} Christopher D. Leveille</div>
			</div>
		</Dialog>
	);
};
