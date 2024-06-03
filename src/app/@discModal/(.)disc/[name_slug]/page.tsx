import { DiscDetail, Modal } from "@components";

export default function DiscDetailModal({ params: { name_slug } }: { params: { name_slug: string } }) {
	return (
		<Modal>
			<DiscDetail name_slug={name_slug} hideNavButtons />
		</Modal>
	);
}
