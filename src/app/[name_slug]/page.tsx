import { DiscDetail } from "@components";
import { API } from "@services";

export const generateStaticParams = async () => {
	const discs = await API.getDiscs();
	const paths = discs.map(({ name_slug }) => ({ params: { name_slug } }));
	return paths;
};

export default function DiscDetailPage({ params: { name_slug } }: { params: { name_slug: string } }) {
	return <DiscDetail name_slug={name_slug} />;
}
