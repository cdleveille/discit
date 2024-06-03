import { NewBag, UserButton } from "@components";

export default function NewBagPage() {
	return (
		<div style={{ padding: "0.5rem" }}>
			<UserButton />
			<div className="absolute-centered">
				<NewBag />
			</div>
		</div>
	);
}
