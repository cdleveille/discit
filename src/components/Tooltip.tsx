import { Tooltip as MuiTooltip } from "@mui/material";

export const Tooltip = ({ title, children }: { title: string; children: React.ReactElement }) => {
	return (
		<MuiTooltip
			title={title}
			arrow
			slotProps={{
				tooltip: {
					sx: { fontSize: "0.9rem", color: "#ffffff" }
				}
			}}
		>
			{children}
		</MuiTooltip>
	);
};
