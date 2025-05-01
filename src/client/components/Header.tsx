import { AboutButton, Title, UserButton } from "@components";

export const Header = () => {
	return (
		<div className="header">
			<UserButton />
			<Title />
			<AboutButton />
		</div>
	);
};
