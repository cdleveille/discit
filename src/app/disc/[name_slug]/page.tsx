import { DiscDetail } from "@components";
import { getDiscs } from "@services";

export const generateStaticParams = async () => {
	const discs = await getDiscs();
	return discs.map(({ name_slug }) => ({ params: { name_slug } }));
};

export default function DiscDetailPage({ params: { name_slug } }: { params: { name_slug: string } }) {
	return (
		<div className="disc-detail-container">
			<DiscDetail name_slug={name_slug} hideNavButtons hideAddButton />
		</div>
	);
}
