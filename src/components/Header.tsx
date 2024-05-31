"use client";

import Image from "next/image";
import { useState } from "react";

import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";
import Icon from "@mui/icons-material/AccountCircle";
import { IconButton, Modal, Stack } from "@mui/material";

export const Header = () => {
	const [showSignIn, setShowSignIn] = useState(false);

	return (
		<Stack direction="row" justifyContent="space-between" width="100%">
			<div>
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
			</div>
			<Stack direction="row" spacing={-2} alignItems="center" className="title">
				<Image src="/discit.svg" alt="DiscIt" width={100} height={100} priority />
				<h1>DiscIt</h1>
			</Stack>
			<span className="hidden" style={{ width: "3rem" }}></span>
			<Modal open={showSignIn} onClose={() => setShowSignIn(false)}>
				<div className="absolute-centered">
					<SignIn routing="hash" />
				</div>
			</Modal>
		</Stack>
	);
};
