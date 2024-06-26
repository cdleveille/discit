"use client";

import { useEffect, useState } from "react";

import { SignedIn, SignedOut, useAuth, UserButton as ClerkUserButton } from "@clerk/nextjs";
import { useAppContext } from "@hooks";
import SignedOutIcon from "@mui/icons-material/AccountCircle";
import { CircularProgress, IconButton } from "@mui/material";

export const UserButton = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { showSignInModal } = useAppContext();
	const { isSignedIn } = useAuth();

	useEffect(() => {
		const timeout = setTimeout(() => setIsLoading(false), 1000);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<div className="user-btn">
			{isSignedIn && isLoading && (
				<div className="user-btn-loading-spinner">
					<CircularProgress />
				</div>
			)}
			<SignedOut>
				<IconButton aria-label="sign-in" sx={{ width: "3rem", height: "3rem" }} onClick={showSignInModal}>
					<SignedOutIcon color="disabled" sx={{ fontSize: "57px" }} />
				</IconButton>
			</SignedOut>
			<SignedIn>
				<ClerkUserButton
					appearance={{
						elements: {
							userButtonAvatarBox: {
								width: "3rem",
								height: "3rem"
							},
							userButtonPopoverActionButtonIcon: {
								width: "1.5rem",
								height: "1.5rem"
							},
							userButtonPopoverFooter: {
								display: "none"
							}
						}
					}}
				/>
			</SignedIn>
		</div>
	);
};
