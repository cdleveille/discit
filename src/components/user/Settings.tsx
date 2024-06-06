"use client";

import { useAppContext } from "@hooks";
import { Stack, Switch } from "@mui/material";

export const Settings = () => {
	const { filtersEnabled, setFiltersEnabled } = useAppContext();
	return (
		<Stack className="form" justifyContent="center" alignItems="center" spacing="3rem">
			<div className="form-title">Filters</div>
			<Stack spacing="0.5rem" justifyContent="center" alignContent="center">
				<Stack direction="row" spacing="3rem" alignItems="center">
					<div style={{ minWidth: "5rem" }}>Name</div>
					<Switch
						checked={filtersEnabled.name}
						onChange={e => setFiltersEnabled({ ...filtersEnabled, name: e.target.checked })}
					/>
				</Stack>
				<Stack direction="row" spacing="3rem" alignItems="center">
					<div style={{ minWidth: "5rem" }}>Brand</div>
					<Switch
						checked={filtersEnabled.brand}
						onChange={e => setFiltersEnabled({ ...filtersEnabled, brand: e.target.checked })}
					/>
				</Stack>
				<Stack direction="row" spacing="3rem" alignItems="center">
					<div style={{ minWidth: "5rem" }}>Category</div>
					<Switch
						checked={filtersEnabled.category}
						onChange={e => setFiltersEnabled({ ...filtersEnabled, category: e.target.checked })}
					/>
				</Stack>
				<Stack direction="row" spacing="3rem" alignItems="center">
					<div style={{ minWidth: "5rem" }}>Stability</div>
					<Switch
						checked={filtersEnabled.stability}
						onChange={e => setFiltersEnabled({ ...filtersEnabled, stability: e.target.checked })}
					/>
				</Stack>
				<Stack direction="row" spacing="3rem" alignItems="center">
					<div style={{ minWidth: "5rem" }}>Speed</div>
					<Switch
						checked={filtersEnabled.speed}
						onChange={e => setFiltersEnabled({ ...filtersEnabled, speed: e.target.checked })}
					/>
				</Stack>
				<Stack direction="row" spacing="3rem" alignItems="center">
					<div style={{ minWidth: "5rem" }}>Glide</div>
					<Switch
						checked={filtersEnabled.glide}
						onChange={e => setFiltersEnabled({ ...filtersEnabled, glide: e.target.checked })}
					/>
				</Stack>
				<Stack direction="row" spacing="3rem" alignItems="center">
					<div style={{ minWidth: "5rem" }}>Turn</div>
					<Switch
						checked={filtersEnabled.turn}
						onChange={e => setFiltersEnabled({ ...filtersEnabled, turn: e.target.checked })}
					/>
				</Stack>
				<Stack direction="row" spacing="3rem" alignItems="center">
					<div style={{ minWidth: "5rem" }}>Fade</div>
					<Switch
						checked={filtersEnabled.fade}
						onChange={e => setFiltersEnabled({ ...filtersEnabled, fade: e.target.checked })}
					/>
				</Stack>
			</Stack>
		</Stack>
	);
};
