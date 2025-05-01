import { Stack } from "@mui/material";

import { Title } from "@components";

export const About = () => {
	return (
		<Stack className="about" justifyContent="center" alignItems="center" spacing="2rem">
			<Title />
			<p>A responsive disc golf disc search engine.</p>
			<p>
				Created by{" "}
				<a href="https://www.cdleveille.net" target="_blank" rel="noreferrer">
					Chris Leveille
				</a>
				.
			</p>
			<p>
				Disc data sourced from{" "}
				<a
					href="https://www.marshallstreetdiscgolf.com/flightguide"
					target="_blank"
					rel="noreferrer"
				>
					Marshall Street Disc Golf Flight Guide
				</a>{" "}
				and accessed via the{" "}
				<a href="https://github.com/DiscIt-API/discit-api" target="_blank" rel="noreferrer">
					DiscIt API
				</a>
				.
			</p>
		</Stack>
	);
};
