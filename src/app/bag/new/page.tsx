import { NewBag, UserButton } from "@components";

export default function NewBagPage() {
	return (
		<>
			<UserButton />
			<div className="absolute-centered">
				<NewBag />
			</div>
		</>
	);
}
