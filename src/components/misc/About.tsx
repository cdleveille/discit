import Link from "next/link";

import { Stack } from "@mui/material";

export const About = () => {
	return (
		<Stack className="about" justifyContent="center" alignItems="center" spacing="2rem">
			<h1>DiscIt</h1>
			<div>A responsive disc golf disc search engine.</div>
			<div>
				Created by{" "}
				<Link href="https://www.cdleveille.net" target="_blank">
					Chris Leveille
				</Link>
				.
			</div>
			<div>
				Disc data sourced from{" "}
				<Link href="https://www.marshallstreetdiscgolf.com/flightguide" target="_blank">
					Marshall Street Disc Golf Flight Guide
				</Link>{" "}
				and accessed via the{" "}
				<Link href="https://github.com/cdleveille/discit-api" target="_blank">
					DiscIt API
				</Link>
				.
			</div>
		</Stack>
	);
};
