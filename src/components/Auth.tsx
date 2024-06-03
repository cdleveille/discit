"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { SignedIn, SignedOut, SignIn as ClerkSignIn, UserButton as ClerkUserButton } from "@clerk/nextjs";
import { useDiscContext } from "@hooks";
import Icon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";

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
				<ClerkUserButton
					appearance={{
						elements: {
							userButtonBox: {
								animation: "fadeIn 0.25s"
							},
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

export const SignIn = () => {
	const searchParams = useSearchParams();
	const redirect = searchParams.get("redirect");
	const redirectUrl = redirect ? `${decodeURI(redirect)}` : "";
	const { view } = useDiscContext();
	return <ClerkSignIn routing="hash" forceRedirectUrl={redirectUrl || `/${view === "bags" ? "?view=bags" : ""}`} />;
};
