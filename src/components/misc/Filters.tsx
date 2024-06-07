"use client";

import { SyntheticEvent, useEffect, useState } from "react";

import { View } from "@constants";
import { useAppContext } from "@hooks";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { getArrayIntersection } from "@util";

import type { FilterOptions } from "@types";

export const Filters = () => {
	const [filterOptions, setFilterOptions] = useState<FilterOptions>({
		names: [],
		brands: [],
		categories: [],
		stabilities: [],
		speeds: [],
		glides: [],
		turns: [],
		fades: []
	});

	const { discs, setFilteredDiscs, filterValues, setFilterValues, filtersEnabled, selectedBag, view } =
		useAppContext();
	const isBagView = view === View.BAG;

	useEffect(() => {
		const bagDiscs = selectedBag ? discs.filter(disc => selectedBag.discs.includes(disc.id)) : [];
		const baseDiscs = isBagView ? bagDiscs : discs;
		const { name, brands, categories, stabilities, speeds, glides, turns, fades } = filterValues;
		const discsFilteredByName = baseDiscs.filter(
			disc => !name || disc.name.toLowerCase().includes(name.toLowerCase())
		);
		const discsFilteredByBrand = baseDiscs.filter(disc => brands.length === 0 || brands.includes(disc.brand));
		const discsFilteredByCategory = baseDiscs.filter(
			disc => categories.length === 0 || categories.includes(disc.category)
		);
		const discsFilteredByStability = baseDiscs.filter(
			disc => stabilities.length === 0 || stabilities.includes(disc.stability)
		);
		const discsFilteredBySpeed = baseDiscs.filter(disc => speeds.length === 0 || speeds.includes(disc.speed));
		const discsFilteredByGlide = baseDiscs.filter(disc => glides.length === 0 || glides.includes(disc.glide));
		const discsFilteredByTurn = baseDiscs.filter(disc => turns.length === 0 || turns.includes(disc.turn));
		const discsFilteredByFade = baseDiscs.filter(disc => fades.length === 0 || fades.includes(disc.fade));
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
			brands: [
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
			categories: [
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
			stabilities: [
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
			speeds: [
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
			glides: [
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
			turns: [
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
			fades: [
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

	return (
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
					options={filterOptions.brands}
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
					value={filterValues.brands}
					onChange={(_e: SyntheticEvent, value: string[]) =>
						setFilterValues(current => ({ ...current, brands: value }))
					}
				/>
			)}
			{filtersEnabled.category && (
				<Autocomplete
					className="filter"
					multiple
					options={filterOptions.categories}
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
					value={filterValues.categories}
					onChange={(_e: SyntheticEvent, value: string[]) =>
						setFilterValues(current => ({ ...current, categories: value }))
					}
				/>
			)}
			{filtersEnabled.stability && (
				<Autocomplete
					className="filter"
					multiple
					options={filterOptions.stabilities}
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
					value={filterValues.stabilities}
					onChange={(_e: SyntheticEvent, value: string[]) =>
						setFilterValues(current => ({ ...current, stabilities: value }))
					}
				/>
			)}
			{filtersEnabled.speed && (
				<Autocomplete
					className="filter"
					multiple
					options={filterOptions.speeds}
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
					value={filterValues.speeds}
					onChange={(_e: SyntheticEvent, value: string[]) =>
						setFilterValues(current => ({ ...current, speeds: value }))
					}
				/>
			)}
			{filtersEnabled.glide && (
				<Autocomplete
					className="filter"
					multiple
					options={filterOptions.glides}
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
					value={filterValues.glides}
					onChange={(_e: SyntheticEvent, value: string[]) =>
						setFilterValues(current => ({ ...current, glides: value }))
					}
				/>
			)}
			{filtersEnabled.turn && (
				<Autocomplete
					className="filter"
					multiple
					options={filterOptions.turns}
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
					value={filterValues.turns}
					onChange={(_e: SyntheticEvent, value: string[]) =>
						setFilterValues(current => ({ ...current, turns: value }))
					}
				/>
			)}
			{filtersEnabled.fade && (
				<Autocomplete
					className="filter"
					multiple
					options={filterOptions.fades}
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
					value={filterValues.fades}
					onChange={(_e: SyntheticEvent, value: string[]) =>
						setFilterValues(current => ({ ...current, fades: value }))
					}
				/>
			)}
		</div>
	);
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
