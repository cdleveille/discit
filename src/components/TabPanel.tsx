import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface ITabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

export const TabPanel = ({ children, index, value }: ITabPanelProps) => {
	return (
		<div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
			{value === index && (
				<Box sx={{ p: 2 }}>
					<Typography component={"span"} variant={"body2"}>
						{children}
					</Typography>
				</Box>
			)}
		</div>
	);
};
