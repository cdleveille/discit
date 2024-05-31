"use client";

import { useState } from "react";

import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";
import Icon from "@mui/icons-material/AccountCircle";
import { IconButton, Modal } from "@mui/material";

export const Auth = () => {
	const [showSignIn, setShowSignIn] = useState(false);

	return (
		<>
			<SignedOut>
				<IconButton
					aria-label="sign-in"
					onClick={() => setShowSignIn(true)}
					sx={{ width: "3rem", height: "3rem" }}
				>
					<Icon color="disabled" sx={{ fontSize: "57px" }} />
				</IconButton>
			</SignedOut>
			<SignedIn>
				<UserButton
					appearance={{
						elements: {
							userButtonAvatarBox: {
								width: "3rem",
								height: "3rem"
							},
							userButtonPopoverActionButtonIcon: {
								width: "1.5rem",
								height: "1.5rem",
								color: "#999999"
							},
							userPreviewMainIdentifier: {
								fontSize: "1.2rem",
								color: "#444444"
							},
							userPreviewTextContainer: {
								userSelect: "none"
							},
							userPreviewSecondaryIdentifier: {
								fontSize: "1rem",
								color: "#444444"
							},
							userButtonPopoverActionButtonText: {
								fontSize: "1rem"
							},
							userButtonPopoverFooter: {
								display: "none"
							}
						}
					}}
				/>
			</SignedIn>
			<Modal open={showSignIn} onClose={() => setShowSignIn(false)}>
				<div className="absolute-centered">
					<SignIn routing="hash" />
				</div>
			</Modal>
		</>
	);
};
