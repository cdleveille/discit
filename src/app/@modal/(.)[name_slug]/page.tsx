import { DiscDetail } from "@components";

export default function DiscDetailPage({ params: { name_slug } }: { params: { name_slug: string } }) {
	return <DiscDetail name_slug={name_slug} />;
}
