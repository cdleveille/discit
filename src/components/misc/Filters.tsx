"use client";

import { SyntheticEvent, useEffect, useState } from "react";

import { FilterChip, IconButton } from "@components";
import { INITIAL_FILTER_VALUES, INITIAL_FILTERS_ENABLED, View } from "@constants";
import { useAppContext } from "@hooks";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ClearIcon from "@mui/icons-material/Clear";
import { Autocomplete, Checkbox, Stack, TextField } from "@mui/material";
import { getArrayIntersection } from "@util";

import type { FilterOptions } from "@types";

export const Filters = () => {
	const [filterOptions, setFilterOptions] = useState<FilterOptions>({
		names: [],
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

	const isBagView = view === View.BAG;

	useEffect(() => {
		const bagDiscs = selectedBag ? discs.filter(disc => selectedBag.discs.includes(disc.id)) : [];
		const baseDiscs = isBagView ? bagDiscs : discs;
		const { name, brand, category, stability, speed, glide, turn, fade } = filterValues;
		const discsFilteredByName = baseDiscs.filter(
			disc => !name || disc.name.toLowerCase().includes(name.toLowerCase())
		);
		const discsFilteredByBrand = baseDiscs.filter(disc => brand.length === 0 || brand.includes(disc.brand));
		const discsFilteredByCategory = baseDiscs.filter(
			disc => category.length === 0 || category.includes(disc.category)
		);
		const discsFilteredByStability = baseDiscs.filter(
			disc => stability.length === 0 || stability.includes(disc.stability)
		);
		const discsFilteredBySpeed = baseDiscs.filter(disc => speed.length === 0 || speed.includes(disc.speed));
		const discsFilteredByGlide = baseDiscs.filter(disc => glide.length === 0 || glide.includes(disc.glide));
		const discsFilteredByTurn = baseDiscs.filter(disc => turn.length === 0 || turn.includes(disc.turn));
		const discsFilteredByFade = baseDiscs.filter(disc => fade.length === 0 || fade.includes(disc.fade));
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
			names: [...new Set(discsFiltered.map(disc => disc.name))],
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
						.sort((a, b) => parseFloat(a) - parseFloat(b))
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
						.sort((a, b) => parseFloat(a) - parseFloat(b))
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
						.sort((a, b) => parseFloat(a) - parseFloat(b))
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
						.sort((a, b) => parseFloat(a) - parseFloat(b))
				)
			]
		});
		setFilteredDiscs(discsFiltered);
	}, [discs, setFilteredDiscs, filterValues, selectedBag, isBagView]);

	const showFilters =
		filtersEnabled.name ||
		filtersEnabled.brand ||
		filtersEnabled.category ||
		filtersEnabled.stability ||
		filtersEnabled.speed ||
		filtersEnabled.glide ||
		filtersEnabled.turn ||
		filtersEnabled.fade;

	type FilterOption = "name" | "brand" | "category" | "stability" | "speed" | "glide" | "turn" | "fade";

	const onClickFilter = (filter: FilterOption) => {
		const enabled = !filtersEnabled[filter];
		if (enabled) {
			const filtersToDisable = {} as Record<FilterOption, boolean>;
			for (const f of Object.keys(filtersEnabled) as FilterOption[]) {
				if (f === filter) continue;
				if (filterValues[f] == "" || filterValues?.[f].length === 0) {
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
					<FilterChip label="Name" isSelected={filtersEnabled.name} onClick={() => onClickFilter("name")} />
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
					<FilterChip label="Turn" isSelected={filtersEnabled.turn} onClick={() => onClickFilter("turn")} />
					<FilterChip label="Fade" isSelected={filtersEnabled.fade} onClick={() => onClickFilter("fade")} />
					{showFilters && (
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
					)}
				</Stack>
			</div>
			{showFilters && (
				<div className="filters">
					{filtersEnabled.name && (
						<Autocomplete
							className="filter"
							options={filterOptions.names}
							freeSolo
							renderInput={params => (
								<TextField
									{...params}
									label="Name"
									placeholder="Name"
									InputProps={{ ...params.InputProps, sx: { borderRadius: "1rem" } }}
								/>
							)}
							value={filterValues.name}
							onInputChange={(_e: SyntheticEvent, value: string) =>
								setFilterValues(current => ({ ...current, name: value }))
							}
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
									InputProps={{ ...params.InputProps, sx: { borderRadius: "1rem" } }}
								/>
							)}
							value={filterValues.brand}
							onChange={(_e: SyntheticEvent, value: string[]) =>
								setFilterValues(current => ({ ...current, brand: value }))
							}
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
									InputProps={{ ...params.InputProps, sx: { borderRadius: "1rem" } }}
								/>
							)}
							value={filterValues.category}
							onChange={(_e: SyntheticEvent, value: string[]) =>
								setFilterValues(current => ({ ...current, category: value }))
							}
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
									InputProps={{ ...params.InputProps, sx: { borderRadius: "1rem" } }}
								/>
							)}
							value={filterValues.stability}
							onChange={(_e: SyntheticEvent, value: string[]) =>
								setFilterValues(current => ({ ...current, stability: value }))
							}
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
									InputProps={{ ...params.InputProps, sx: { borderRadius: "1rem" } }}
								/>
							)}
							value={filterValues.speed}
							onChange={(_e: SyntheticEvent, value: string[]) =>
								setFilterValues(current => ({ ...current, speed: value }))
							}
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
									InputProps={{ ...params.InputProps, sx: { borderRadius: "1rem" } }}
								/>
							)}
							value={filterValues.glide}
							onChange={(_e: SyntheticEvent, value: string[]) =>
								setFilterValues(current => ({ ...current, glide: value }))
							}
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
									InputProps={{ ...params.InputProps, sx: { borderRadius: "1rem" } }}
								/>
							)}
							value={filterValues.turn}
							onChange={(_e: SyntheticEvent, value: string[]) =>
								setFilterValues(current => ({ ...current, turn: value }))
							}
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
									InputProps={{ ...params.InputProps, sx: { borderRadius: "1rem" } }}
								/>
							)}
							value={filterValues.fade}
							onChange={(_e: SyntheticEvent, value: string[]) =>
								setFilterValues(current => ({ ...current, fade: value }))
							}
						/>
					)}
				</div>
			)}
		</Stack>
	);
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
