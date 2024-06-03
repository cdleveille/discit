import { DiscDetail, Modal } from "@components";

export default function DiscDetailModal({ params: { name_slug } }: { params: { name_slug: string } }) {
	return (
		<Modal borderRadius="50%">
			<DiscDetail name_slug={name_slug} hideNavButtons />
		</Modal>
	);
}
