import {
	ClerkLoading,
	UserButton as ClerkUserButton,
	SignedIn,
	SignedOut,
	useUser
} from "@clerk/clerk-react";
import { AccountCircle } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";

import { Tooltip } from "@components";
import { useAppContext } from "@hooks";

export const UserButton = () => {
	const { showSignInModal } = useAppContext();
	const { user } = useUser();

	return (
		<Tooltip title={user?.fullName ? user.fullName : "Sign In"}>
			<div className="user-button">
				<ClerkLoading>
					<CircularProgress size="3rem" />
				</ClerkLoading>
				<SignedOut>
					<Tooltip title="Sign In">
						<IconButton
							aria-label="Sign In"
							sx={{ width: "3rem", height: "3rem" }}
							onClick={showSignInModal}
						>
							<AccountCircle color="disabled" sx={{ fontSize: "58px" }} />
						</IconButton>
					</Tooltip>
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
		</Tooltip>
	);
};
