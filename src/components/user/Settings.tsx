"use client";

import { INITIAL_FILTER_VALUES } from "@constants";
import { useAppContext } from "@hooks";
import { Stack, Switch } from "@mui/material";

export const Settings = () => {
	const { filtersEnabled, setFiltersEnabled, setFilterValues } = useAppContext();
	return (
		<Stack className="form" justifyContent="center" alignItems="center" spacing="3rem">
			<div className="form-title">Filters</div>
			<Stack spacing="0.5rem" justifyContent="center" alignContent="center" style={{ fontSize: "1.25rem" }}>
				<Stack direction="row" spacing="3rem" alignItems="center">
					<div style={{ minWidth: "7rem" }}>Name</div>
					<Switch
						checked={filtersEnabled.name}
						onChange={e => {
							setFiltersEnabled(current => ({ ...current, name: e.target.checked }));
							setFilterValues(current => ({ ...current, name: INITIAL_FILTER_VALUES.name }));
						}}
					/>
				</Stack>
				<Stack direction="row" spacing="3rem" alignItems="center">
					<div style={{ minWidth: "7rem" }}>Brand</div>
					<Switch
						checked={filtersEnabled.brand}
						onChange={e => {
							setFiltersEnabled(current => ({ ...current, brand: e.target.checked }));
							setFilterValues(current => ({ ...current, brands: INITIAL_FILTER_VALUES.brands }));
						}}
					/>
				</Stack>
				<Stack direction="row" spacing="3rem" alignItems="center">
					<div style={{ minWidth: "7rem" }}>Category</div>
					<Switch
						checked={filtersEnabled.category}
						onChange={e => {
							setFiltersEnabled(current => ({ ...current, category: e.target.checked }));
							setFilterValues(current => ({ ...current, categories: INITIAL_FILTER_VALUES.categories }));
						}}
					/>
				</Stack>
				<Stack direction="row" spacing="3rem" alignItems="center">
					<div style={{ minWidth: "7rem" }}>Stability</div>
					<Switch
						checked={filtersEnabled.stability}
						onChange={e => {
							setFiltersEnabled(current => ({ ...current, stability: e.target.checked }));
							setFilterValues(current => ({
								...current,
								stabilities: INITIAL_FILTER_VALUES.stabilities
							}));
						}}
					/>
				</Stack>
				<Stack direction="row" spacing="3rem" alignItems="center">
					<div style={{ minWidth: "7rem" }}>Speed</div>
					<Switch
						checked={filtersEnabled.speed}
						onChange={e => {
							setFiltersEnabled(current => ({ ...current, speed: e.target.checked }));
							setFilterValues(current => ({ ...current, speeds: INITIAL_FILTER_VALUES.speeds }));
						}}
					/>
				</Stack>
				<Stack direction="row" spacing="3rem" alignItems="center">
					<div style={{ minWidth: "7rem" }}>Glide</div>
					<Switch
						checked={filtersEnabled.glide}
						onChange={e => {
							setFiltersEnabled(current => ({ ...current, glide: e.target.checked }));
							setFilterValues(current => ({ ...current, glides: INITIAL_FILTER_VALUES.glides }));
						}}
					/>
				</Stack>
				<Stack direction="row" spacing="3rem" alignItems="center">
					<div style={{ minWidth: "7rem" }}>Turn</div>
					<Switch
						checked={filtersEnabled.turn}
						onChange={e => {
							setFiltersEnabled(current => ({ ...current, turn: e.target.checked }));
							setFilterValues(current => ({ ...current, turns: INITIAL_FILTER_VALUES.turns }));
						}}
					/>
				</Stack>
				<Stack direction="row" spacing="3rem" alignItems="center">
					<div style={{ minWidth: "7rem" }}>Fade</div>
					<Switch
						checked={filtersEnabled.fade}
						onChange={e => {
							setFiltersEnabled(current => ({ ...current, fade: e.target.checked }));
							setFilterValues(current => ({ ...current, fades: INITIAL_FILTER_VALUES.fades }));
						}}
					/>
				</Stack>
			</Stack>
		</Stack>
	);
};
