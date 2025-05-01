import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ClearIcon from "@mui/icons-material/Clear";
import { Autocomplete, Checkbox, IconButton, Stack, TextField } from "@mui/material";
import { type SyntheticEvent, useEffect, useState } from "react";

import { FilterChip, Tooltip } from "@components";
import { INITIAL_FILTERS_ENABLED, INITIAL_FILTER_VALUES, View } from "@constants";
import { useAppContext } from "@hooks";
import type { TFilterOptions } from "@types";
import { getArrayIntersection } from "@utils";

export const Filters = () => {
	const [filterOptions, setFilterOptions] = useState<TFilterOptions>({
		name: [],
		brand: [],
		category: [],
		stability: [],
		speed: [],
		glide: [],
		turn: [],
		fade: []
	});

	const {
		discs,
		setFilteredDiscs,
		filterValues,
		setFilterValues,
		filtersEnabled,
		setFiltersEnabled,
		selectedBag,
		view
	} = useAppContext();

	const isBagView = view === View.Bag;

	useEffect(() => {
		const bagDiscs = selectedBag
			? discs.filter(disc => selectedBag.discs.includes(disc.id))
			: [];
		const baseDiscs = isBagView ? bagDiscs : discs;
		const { name, brand, category, stability, speed, glide, turn, fade } = filterValues;
		const discsFilteredByName = baseDiscs.filter(
			disc => !name || disc.name.toLowerCase().includes(name.toLowerCase())
		);
		const discsFilteredByBrand = baseDiscs.filter(
			disc => brand.length === 0 || brand.includes(disc.brand)
		);
		const discsFilteredByCategory = baseDiscs.filter(
			disc => category.length === 0 || category.includes(disc.category)
		);
		const discsFilteredByStability = baseDiscs.filter(
			disc => stability.length === 0 || stability.includes(disc.stability)
		);
		const discsFilteredBySpeed = baseDiscs.filter(
			disc => speed.length === 0 || speed.includes(disc.speed)
		);
		const discsFilteredByGlide = baseDiscs.filter(
			disc => glide.length === 0 || glide.includes(disc.glide)
		);
		const discsFilteredByTurn = baseDiscs.filter(
			disc => turn.length === 0 || turn.includes(disc.turn)
		);
		const discsFilteredByFade = baseDiscs.filter(
			disc => fade.length === 0 || fade.includes(disc.fade)
		);
		const discsFiltered = getArrayIntersection(
			discsFilteredByName,
			discsFilteredByBrand,
			discsFilteredByCategory,
			discsFilteredByStability,
			discsFilteredBySpeed,
			discsFilteredByGlide,
			discsFilteredByTurn,
			discsFilteredByFade
		);
		setFilterOptions({
			name: [...new Set(discsFiltered.map(disc => disc.name))],
			brand: [
				...new Set(
					getArrayIntersection(
						discsFilteredByName,
						discsFilteredByCategory,
						discsFilteredByStability,
						discsFilteredBySpeed,
						discsFilteredByGlide,
						discsFilteredByTurn,
						discsFilteredByFade
					)
						.map(disc => disc.brand)
						.sort()
				)
			],
			category: [
				...new Set(
					getArrayIntersection(
						discsFilteredByName,
						discsFilteredByBrand,
						discsFilteredByStability,
						discsFilteredBySpeed,
						discsFilteredByGlide,
						discsFilteredByTurn,
						discsFilteredByFade
					)
						.map(disc => disc.category)
						.sort()
				)
			],
			stability: [
				...new Set(
					getArrayIntersection(
						discsFilteredByName,
						discsFilteredByBrand,
						discsFilteredByCategory,
						discsFilteredBySpeed,
						discsFilteredByGlide,
						discsFilteredByTurn,
						discsFilteredByFade
					)
						.map(disc => disc.stability)
						.sort()
				)
			],
			speed: [
				...new Set(
					getArrayIntersection(
						discsFilteredByName,
						discsFilteredByBrand,
						discsFilteredByCategory,
						discsFilteredByStability,
						discsFilteredByGlide,
						discsFilteredByTurn,
						discsFilteredByFade
					)
						.map(disc => disc.speed)
						.sort((a, b) => Number.parseFloat(a) - Number.parseFloat(b))
				)
			],
			glide: [
				...new Set(
					getArrayIntersection(
						discsFilteredByName,
						discsFilteredByBrand,
						discsFilteredByCategory,
						discsFilteredByStability,
						discsFilteredBySpeed,
						discsFilteredByTurn,
						discsFilteredByFade
					)
						.map(disc => disc.glide)
						.sort((a, b) => Number.parseFloat(a) - Number.parseFloat(b))
				)
			],
			turn: [
				...new Set(
					getArrayIntersection(
						discsFilteredByName,
						discsFilteredByBrand,
						discsFilteredByCategory,
						discsFilteredByStability,
						discsFilteredBySpeed,
						discsFilteredByGlide,
						discsFilteredByFade
					)
						.map(disc => disc.turn)
						.sort((a, b) => Number.parseFloat(a) - Number.parseFloat(b))
				)
			],
			fade: [
				...new Set(
					getArrayIntersection(
						discsFilteredByName,
						discsFilteredByBrand,
						discsFilteredByCategory,
						discsFilteredByStability,
						discsFilteredBySpeed,
						discsFilteredByGlide,
						discsFilteredByTurn
					)
						.map(disc => disc.fade)
						.sort((a, b) => Number.parseFloat(a) - Number.parseFloat(b))
				)
			]
		});
		setFilteredDiscs(discsFiltered);
	}, [discs, setFilteredDiscs, filterValues, isBagView, selectedBag]);

	const showFilters =
		filtersEnabled.name ||
		filtersEnabled.brand ||
		filtersEnabled.category ||
		filtersEnabled.stability ||
		filtersEnabled.speed ||
		filtersEnabled.glide ||
		filtersEnabled.turn ||
		filtersEnabled.fade;

	type FilterOption =
		| "name"
		| "brand"
		| "category"
		| "stability"
		| "speed"
		| "glide"
		| "turn"
		| "fade";

	const onClickFilter = (filter: FilterOption) => {
		const enabled = !filtersEnabled[filter];
		if (enabled) {
			const filtersToDisable = {} as Record<FilterOption, boolean>;
			for (const f of Object.keys(filtersEnabled) as FilterOption[]) {
				if (f === filter) continue;
				if (filterValues[f] === "" || filterValues?.[f].length === 0) {
					filtersToDisable[f] = false;
				}
			}
			setFiltersEnabled(current => ({ ...current, ...filtersToDisable, [filter]: enabled }));
		} else {
			setFilterValues(current => ({ ...current, [filter]: INITIAL_FILTER_VALUES[filter] }));
			setFiltersEnabled(current => ({ ...current, [filter]: false }));
		}
	};

	return (
		<Stack spacing="1rem">
			<div className="filter-chips">
				<Stack direction="row" spacing="0.75rem">
					<FilterChip
						label="Name"
						isSelected={filtersEnabled.name}
						onClick={() => onClickFilter("name")}
					/>
					<FilterChip
						label="Brand"
						isSelected={filtersEnabled.brand}
						onClick={() => onClickFilter("brand")}
					/>
					<FilterChip
						label="Category"
						isSelected={filtersEnabled.category}
						onClick={() => onClickFilter("category")}
					/>
					<FilterChip
						label="Stability"
						isSelected={filtersEnabled.stability}
						onClick={() => onClickFilter("stability")}
					/>
				</Stack>
				<Stack direction="row" spacing="0.75rem">
					<FilterChip
						label="Speed"
						isSelected={filtersEnabled.speed}
						onClick={() => onClickFilter("speed")}
					/>
					<FilterChip
						label="Glide"
						isSelected={filtersEnabled.glide}
						onClick={() => onClickFilter("glide")}
					/>
					<FilterChip
						label="Turn"
						isSelected={filtersEnabled.turn}
						onClick={() => onClickFilter("turn")}
					/>
					<div style={{ position: "relative" }}>
						<FilterChip
							label="Fade"
							isSelected={filtersEnabled.fade}
							onClick={() => onClickFilter("fade")}
						/>
						{showFilters && (
							<div style={{ position: "absolute", top: 0, left: "3.8rem" }}>
								<Tooltip title="Clear All">
									<IconButton
										className="clear-filters"
										style={{ width: "2rem", height: "2rem" }}
										onClick={() => {
											setFilterValues(INITIAL_FILTER_VALUES);
											setFiltersEnabled(INITIAL_FILTERS_ENABLED);
										}}
									>
										<ClearIcon sx={{ fontSize: "1rem" }} />
									</IconButton>
								</Tooltip>
							</div>
						)}
					</div>
				</Stack>
			</div>
			{showFilters && (
				<div className="filters">
					{filtersEnabled.name && (
						<Autocomplete
							className="filter"
							options={filterOptions.name}
							freeSolo
							renderInput={params => (
								<TextField
									{...params}
									label="Name"
									placeholder="Name"
									autoFocus
									InputProps={{
										...params.InputProps,
										sx: { borderRadius: "1rem" }
									}}
								/>
							)}
							value={filterValues.name}
							onInputChange={(_e: SyntheticEvent, value: string) =>
								setFilterValues(current => ({ ...current, name: value }))
							}
							autoFocus
							openOnFocus
						/>
					)}
					{filtersEnabled.brand && (
						<Autocomplete
							className="filter"
							multiple
							options={filterOptions.brand}
							disableCloseOnSelect
							getOptionLabel={option => option}
							renderOption={(props, option, { selected }) => (
								<li {...props} key={option}>
									<Checkbox
										icon={icon}
										checkedIcon={checkedIcon}
										style={{ marginRight: 8 }}
										checked={selected}
										key={option}
									/>
									{option}
								</li>
							)}
							getOptionKey={option => option}
							renderInput={params => (
								<TextField
									{...params}
									label="Brand"
									placeholder="Brand"
									autoFocus
									InputProps={{
										...params.InputProps,
										sx: { borderRadius: "1rem" }
									}}
								/>
							)}
							value={filterValues.brand}
							onChange={(_e: SyntheticEvent, value: string[]) =>
								setFilterValues(current => ({ ...current, brand: value }))
							}
							autoFocus
							openOnFocus
						/>
					)}
					{filtersEnabled.category && (
						<Autocomplete
							className="filter"
							multiple
							options={filterOptions.category}
							disableCloseOnSelect
							getOptionLabel={option => option}
							renderOption={(props, option, { selected }) => (
								<li {...props} key={option}>
									<Checkbox
										icon={icon}
										checkedIcon={checkedIcon}
										style={{ marginRight: 8 }}
										checked={selected}
										key={option}
									/>
									{option}
								</li>
							)}
							renderInput={params => (
								<TextField
									{...params}
									label="Category"
									placeholder="Category"
									autoFocus
									InputProps={{
										...params.InputProps,
										sx: { borderRadius: "1rem" }
									}}
								/>
							)}
							value={filterValues.category}
							onChange={(_e: SyntheticEvent, value: string[]) =>
								setFilterValues(current => ({ ...current, category: value }))
							}
							autoFocus
							openOnFocus
						/>
					)}
					{filtersEnabled.stability && (
						<Autocomplete
							className="filter"
							multiple
							options={filterOptions.stability}
							disableCloseOnSelect
							getOptionLabel={option => option}
							renderOption={(props, option, { selected }) => (
								<li {...props} key={option}>
									<Checkbox
										icon={icon}
										checkedIcon={checkedIcon}
										style={{ marginRight: 8 }}
										checked={selected}
										key={option}
									/>
									{option}
								</li>
							)}
							renderInput={params => (
								<TextField
									{...params}
									label="Stability"
									placeholder="Stability"
									autoFocus
									InputProps={{
										...params.InputProps,
										sx: { borderRadius: "1rem" }
									}}
								/>
							)}
							value={filterValues.stability}
							onChange={(_e: SyntheticEvent, value: string[]) =>
								setFilterValues(current => ({ ...current, stability: value }))
							}
							autoFocus
							openOnFocus
						/>
					)}
					{filtersEnabled.speed && (
						<Autocomplete
							className="filter"
							multiple
							options={filterOptions.speed}
							disableCloseOnSelect
							getOptionLabel={option => option}
							renderOption={(props, option, { selected }) => (
								<li {...props} key={option}>
									<Checkbox
										icon={icon}
										checkedIcon={checkedIcon}
										style={{ marginRight: 8 }}
										checked={selected}
										key={option}
									/>
									{option}
								</li>
							)}
							renderInput={params => (
								<TextField
									{...params}
									label="Speed"
									placeholder="Speed"
									autoFocus
									InputProps={{
										...params.InputProps,
										sx: { borderRadius: "1rem" }
									}}
								/>
							)}
							value={filterValues.speed}
							onChange={(_e: SyntheticEvent, value: string[]) =>
								setFilterValues(current => ({ ...current, speed: value }))
							}
							autoFocus
							openOnFocus
						/>
					)}
					{filtersEnabled.glide && (
						<Autocomplete
							className="filter"
							multiple
							options={filterOptions.glide}
							disableCloseOnSelect
							getOptionLabel={option => option}
							renderOption={(props, option, { selected }) => (
								<li {...props} key={option}>
									<Checkbox
										icon={icon}
										checkedIcon={checkedIcon}
										style={{ marginRight: 8 }}
										checked={selected}
										key={option}
									/>
									{option}
								</li>
							)}
							renderInput={params => (
								<TextField
									{...params}
									label="Glide"
									placeholder="Glide"
									autoFocus
									InputProps={{
										...params.InputProps,
										sx: { borderRadius: "1rem" }
									}}
								/>
							)}
							value={filterValues.glide}
							onChange={(_e: SyntheticEvent, value: string[]) =>
								setFilterValues(current => ({ ...current, glide: value }))
							}
							autoFocus
							openOnFocus
						/>
					)}
					{filtersEnabled.turn && (
						<Autocomplete
							className="filter"
							multiple
							options={filterOptions.turn}
							disableCloseOnSelect
							getOptionLabel={option => option}
							renderOption={(props, option, { selected }) => (
								<li {...props} key={option}>
									<Checkbox
										icon={icon}
										checkedIcon={checkedIcon}
										style={{ marginRight: 8 }}
										checked={selected}
										key={option}
									/>
									{option}
								</li>
							)}
							renderInput={params => (
								<TextField
									{...params}
									label="Turn"
									placeholder="Turn"
									autoFocus
									InputProps={{
										...params.InputProps,
										sx: { borderRadius: "1rem" }
									}}
								/>
							)}
							value={filterValues.turn}
							onChange={(_e: SyntheticEvent, value: string[]) =>
								setFilterValues(current => ({ ...current, turn: value }))
							}
							autoFocus
							openOnFocus
						/>
					)}
					{filtersEnabled.fade && (
						<Autocomplete
							className="filter"
							multiple
							options={filterOptions.fade}
							disableCloseOnSelect
							getOptionLabel={option => option}
							renderOption={(props, option, { selected }) => (
								<li {...props} key={option}>
									<Checkbox
										icon={icon}
										checkedIcon={checkedIcon}
										style={{ marginRight: 8 }}
										checked={selected}
										key={option}
									/>
									{option}
								</li>
							)}
							renderInput={params => (
								<TextField
									{...params}
									label="Fade"
									placeholder="Fade"
									autoFocus
									InputProps={{
										...params.InputProps,
										sx: { borderRadius: "1rem" }
									}}
								/>
							)}
							value={filterValues.fade}
							onChange={(_e: SyntheticEvent, value: string[]) =>
								setFilterValues(current => ({ ...current, fade: value }))
							}
							autoFocus
							openOnFocus
						/>
					)}
				</div>
			)}
		</Stack>
	);
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
