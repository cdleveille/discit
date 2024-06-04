"use client";

import Link from "next/link";

import { SignedIn, SignedOut, SignIn as ClerkSignIn, UserButton as ClerkUserButton } from "@clerk/nextjs";
import Icon from "@mui/icons-material/AccountCircle";
import { CircularProgress, IconButton } from "@mui/material";

export const UserButton = () => {
	return (
		<>
			<SignedOut>
				<Link href="/sign-in">
					<IconButton aria-label="sign-in" sx={{ width: "3rem", height: "3rem" }}>
						<Icon color="disabled" sx={{ fontSize: "57px" }} />
					</IconButton>
				</Link>
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

export const SignIn = () => (
	<ClerkSignIn
		appearance={{
			elements: {
				headerTitle: {
					fontSize: "2rem"
				},
				headerSubtitle: {
					fontSize: "1rem",
					marginTop: "1rem"
				}
			}
		}}
		routing="hash"
		forceRedirectUrl={"/?view=bag"}
		afterSignOutUrl={"/"}
	/>
);
