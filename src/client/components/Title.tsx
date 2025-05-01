import { discitSvg } from "@assets";
import { APP_INFO } from "@constants";

export const Title = () => {
	return (
		<div className="title">
			<img src={discitSvg} alt={APP_INFO.title} width="70px" height="70px" />
			<h1>{APP_INFO.title}</h1>
		</div>
	);
};
