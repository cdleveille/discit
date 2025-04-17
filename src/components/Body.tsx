import { DiscGrid } from "@/components/DiscGrid";

import { getDiscs } from "@/services";

export const Body = async () => {
	const discs = await getDiscs();
	return (
		<>
			<DiscGrid discs={discs} />
		</>
	);
};
