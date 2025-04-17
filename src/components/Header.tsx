import Image from "next/image";

import { AboutButton } from "@/components/AboutButton";
import { UserButton } from "@/components/UserButton";
import { APP_INFO } from "@/constants";

export const Header = () => {
	return (
		<div className="header">
			<UserButton />
			<div className="title">
				<Image src="/img/discit.svg" alt={APP_INFO.title} width={70} height={70} priority />
				<h1>{APP_INFO.title}</h1>
			</div>
			<AboutButton />
		</div>
	);
};
