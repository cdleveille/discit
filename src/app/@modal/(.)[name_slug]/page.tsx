import { DiscDetail, DiscModal } from "@components";

export default function DiscDetailModal({ params: { name_slug } }: { params: { name_slug: string } }) {
	return (
		<DiscModal>
			<DiscDetail name_slug={name_slug} />
		</DiscModal>
	);
}
