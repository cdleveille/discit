"use client";

import { SignedIn, SignedOut, UserButton as ClerkUserButton } from "@clerk/nextjs";
import { useAppContext } from "@hooks";
import Icon from "@mui/icons-material/AccountCircle";
import { CircularProgress, IconButton } from "@mui/material";

export const UserButton = () => {
	const { showSignInModal } = useAppContext();

	return (
		<>
			<SignedOut>
				<IconButton aria-label="sign-in" sx={{ width: "3rem", height: "3rem" }} onClick={showSignInModal}>
					<Icon color="disabled" sx={{ fontSize: "57px" }} />
				</IconButton>
			</SignedOut>
			<SignedIn>
				<div className="auth-loading-spinner">
					<CircularProgress />
				</div>
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
		</>
	);
};