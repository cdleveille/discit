"use client";

import { SyntheticEvent, useContext, useEffect, useState } from "react";

import { DiscContext } from "@components";
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
		stabilities: []
	});

	const { discs, setFilteredDiscs, filterValues, setFilterValues } = useContext(DiscContext);

	useEffect(() => {
		const { name, brands, categories, stabilities } = filterValues;
		const discsFilteredByName = discs.filter(disc => !name || disc.name.toLowerCase().includes(name.toLowerCase()));
		const discsFilteredByBrand = discs.filter(disc => brands.length === 0 || brands.includes(disc.brand));
		const discsFilteredByCategory = discs.filter(
			disc => categories.length === 0 || categories.includes(disc.category)
		);
		const discsFilteredByStability = discs.filter(
			disc => stabilities.length === 0 || stabilities.includes(disc.stability)
		);
		const discsFiltered = getArrayIntersection(
			discsFilteredByName,
			discsFilteredByBrand,
			discsFilteredByCategory,
			discsFilteredByStability
		);
		setFilterOptions({
			names: [...new Set(discsFiltered.map(disc => disc.name))],
			brands: [
				...new Set(
					getArrayIntersection(discsFilteredByName, discsFilteredByCategory, discsFilteredByStability)
						.map(disc => disc.brand)
						.sort()
				)
			],
			categories: [
				...new Set(
					getArrayIntersection(discsFilteredByName, discsFilteredByBrand, discsFilteredByStability)
						.map(disc => disc.category)
						.sort()
				)
			],
			stabilities: [
				...new Set(
					getArrayIntersection(discsFilteredByName, discsFilteredByBrand, discsFilteredByCategory)
						.map(disc => disc.stability)
						.sort()
				)
			]
		});
		setFilteredDiscs(discsFiltered);
	}, [discs, setFilteredDiscs, filterValues]);

	return (
		<div className="filters">
			<Autocomplete
				className="filter"
				options={filterOptions.names}
				freeSolo
				renderInput={params => <TextField {...params} label="name" placeholder="name" />}
				onInputChange={(_e: SyntheticEvent, value: string) =>
					setFilterValues(current => ({ ...current, name: value }))
				}
			/>
			<Autocomplete
				className="filter"
				multiple
				options={filterOptions.brands}
				disableCloseOnSelect
				getOptionLabel={option => option}
				renderOption={(props, option, { selected }) => (
					<li {...props} key={filterOptions.brands.indexOf(option)}>
						<Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
						{option}
					</li>
				)}
				renderInput={params => <TextField {...params} label="brand" placeholder="brand" />}
				onChange={(_e: SyntheticEvent, value: string[]) =>
					setFilterValues(current => ({ ...current, brands: value }))
				}
			/>
			<Autocomplete
				className="filter"
				multiple
				options={filterOptions.categories}
				disableCloseOnSelect
				getOptionLabel={option => option}
				renderOption={(props, option, { selected }) => (
					<li {...props} key={filterOptions.categories.indexOf(option)}>
						<Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
						{option}
					</li>
				)}
				renderInput={params => <TextField {...params} label="category" placeholder="category" />}
				onChange={(_e: SyntheticEvent, value: string[]) =>
					setFilterValues(current => ({ ...current, categories: value }))
				}
			/>
			<Autocomplete
				className="filter"
				multiple
				options={filterOptions.stabilities}
				disableCloseOnSelect
				getOptionLabel={option => option}
				renderOption={(props, option, { selected }) => (
					<li {...props} key={filterOptions.stabilities.indexOf(option)}>
						<Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
						{option}
					</li>
				)}
				renderInput={params => <TextField {...params} label="stability" placeholder="stability" />}
				onChange={(_e: SyntheticEvent, value: string[]) =>
					setFilterValues(current => ({ ...current, stabilities: value }))
				}
			/>
		</div>
	);
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
