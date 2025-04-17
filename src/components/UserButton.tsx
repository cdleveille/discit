"use client";

import { ClerkLoading, UserButton as ClerkUserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { AccountCircle } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";

import { Tooltip } from "@/components/Tooltip";

export const UserButton = () => {
	return (
		<>
			<ClerkLoading>
				<CircularProgress size="3rem" />
			</ClerkLoading>
			<SignedOut>
				<Tooltip title="Sign In">
					<IconButton
						aria-label="Sign In"
						sx={{ width: "3rem", height: "3rem" }}
						onClick={() => console.log("show sign in modal")}
					>
						<AccountCircle color="disabled" sx={{ fontSize: "58px" }} />
					</IconButton>
				</Tooltip>
			</SignedOut>
			<SignedIn>
				<Tooltip title="User">
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
				</Tooltip>
			</SignedIn>
		</>
	);
};
