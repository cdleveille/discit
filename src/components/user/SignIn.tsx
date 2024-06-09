import { SignIn as ClerkSignIn } from "@clerk/nextjs";

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
