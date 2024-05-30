"use client";

import { SyntheticEvent, useContext, useEffect, useMemo, useState } from "react";

import { DiscContext } from "@components";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { getArrayIntersection } from "@util";

export const Filters = () => {
	const [nameOptions, setNameOptions] = useState<string[]>([]);
	const [brandOptions, setBrandOptions] = useState<string[]>([]);
	const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
	const [stabilityOptions, setStabilityOptions] = useState<string[]>([]);

	const { discs, setFilteredDiscs, filterValues, setFilterValues, discDetail } = useContext(DiscContext);

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
		setNameOptions([...new Set(discsFiltered.map(disc => disc.name))]);
		setBrandOptions([
			...new Set(
				getArrayIntersection(discsFilteredByName, discsFilteredByCategory, discsFilteredByStability)
					.map(disc => disc.brand)
					.sort()
			)
		]);
		setCategoryOptions([
			...new Set(
				getArrayIntersection(discsFilteredByName, discsFilteredByBrand, discsFilteredByStability)
					.map(disc => disc.category)
					.sort()
			)
		]);
		setStabilityOptions([
			...new Set(
				getArrayIntersection(discsFilteredByName, discsFilteredByBrand, discsFilteredByCategory)
					.map(disc => disc.stability)
					.sort()
			)
		]);
		setFilteredDiscs(discsFiltered);
	}, [discs, setFilteredDiscs, filterValues]);

	const disabled = !!discDetail;

	return (
		<div className="filters">
			<Autocomplete
				disabled={disabled}
				className="filter"
				options={nameOptions}
				renderInput={params => (
					<TextField {...params} label={!disabled ? "name" : undefined} placeholder="name" />
				)}
				onInputChange={(_e: SyntheticEvent, value: string) =>
					setFilterValues(current => ({ ...current, name: value }))
				}
			/>
			<Autocomplete
				disabled={disabled}
				className="filter"
				multiple
				options={brandOptions}
				disableCloseOnSelect
				getOptionLabel={option => option}
				renderOption={(props, option, { selected }) => (
					<li {...props} key={brandOptions.indexOf(option)}>
						<Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
						{option}
					</li>
				)}
				renderInput={params => (
					<TextField {...params} label={!disabled ? "brand" : undefined} placeholder="brand" />
				)}
				onChange={(_e: SyntheticEvent, value: string[]) =>
					setFilterValues(current => ({ ...current, brands: value }))
				}
			/>
			<Autocomplete
				disabled={disabled}
				className="filter"
				multiple
				options={categoryOptions}
				disableCloseOnSelect
				getOptionLabel={option => option}
				renderOption={(props, option, { selected }) => (
					<li {...props} key={categoryOptions.indexOf(option)}>
						<Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
						{option}
					</li>
				)}
				renderInput={params => (
					<TextField {...params} label={!disabled ? "category" : undefined} placeholder="category" />
				)}
				onChange={(_e: SyntheticEvent, value: string[]) =>
					setFilterValues(current => ({ ...current, categories: value }))
				}
			/>
			<Autocomplete
				disabled={disabled}
				className="filter"
				multiple
				options={stabilityOptions}
				disableCloseOnSelect
				getOptionLabel={option => option}
				renderOption={(props, option, { selected }) => (
					<li {...props} key={stabilityOptions.indexOf(option)}>
						<Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
						{option}
					</li>
				)}
				renderInput={params => (
					<TextField {...params} label={!disabled ? "stability" : undefined} placeholder="stability" />
				)}
				onChange={(_e: SyntheticEvent, value: string[]) =>
					setFilterValues(current => ({ ...current, stabilities: value }))
				}
			/>
		</div>
	);
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
