import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import React, { useState, useEffect, SyntheticEvent } from "react";

import { getArrayIntersection, uniqueValue } from "../helpers/util";
import { IDisc } from "../types/abstract";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface IFormProps {
	filteredDiscsByName: IDisc[];
	filteredDiscsByBrand: IDisc[];
	filteredDiscsByCategory: IDisc[];
	filteredDiscsByStability: IDisc[];
	disabled: boolean;
	setNameFilterValue: (value: string) => void;
	setBrandFilterValue: (value: string[]) => void;
	setCategoryFilterValue: (value: string[]) => void;
	setStabilityFilterValue: (value: string[]) => void;
}

const Form: React.FC<IFormProps> = ({
	filteredDiscsByName,
	filteredDiscsByBrand,
	filteredDiscsByCategory,
	filteredDiscsByStability,
	disabled,
	setNameFilterValue,
	setBrandFilterValue,
	setCategoryFilterValue,
	setStabilityFilterValue
}) => {
	const [names, setNames] = useState([] as string[]);
	const [brands, setBrands] = useState([] as string[]);
	const [categories, setCategories] = useState([] as string[]);
	const [stabilities, setStabilities] = useState([] as string[]);

	useEffect(() => {
		const discs = getArrayIntersection(filteredDiscsByBrand, filteredDiscsByCategory, filteredDiscsByStability);

		setNames(
			discs
				.map((option) => option.name)
				.filter(uniqueValue)
				.sort()
		);
	}, [filteredDiscsByBrand, filteredDiscsByCategory, filteredDiscsByStability]);

	useEffect(() => {
		const discs = getArrayIntersection(filteredDiscsByName, filteredDiscsByCategory, filteredDiscsByStability);

		setBrands(
			discs
				.map((option) => option.brand)
				.filter(uniqueValue)
				.sort()
		);
	}, [filteredDiscsByName, filteredDiscsByCategory, filteredDiscsByStability]);

	useEffect(() => {
		const discs = getArrayIntersection(filteredDiscsByName, filteredDiscsByBrand, filteredDiscsByStability);

		setCategories(
			discs
				.map((option) => option.category)
				.filter(uniqueValue)
				.sort()
		);
	}, [filteredDiscsByName, filteredDiscsByBrand, filteredDiscsByStability]);

	useEffect(() => {
		const discs = getArrayIntersection(filteredDiscsByName, filteredDiscsByBrand, filteredDiscsByCategory);

		setStabilities(
			discs
				.map((option) => option.stability)
				.filter(uniqueValue)
				.sort()
		);
	}, [filteredDiscsByName, filteredDiscsByBrand, filteredDiscsByCategory]);

	return (
		<div className="form">
			<Autocomplete
				disabled={disabled}
				className="input"
				freeSolo
				options={names}
				renderInput={(params) => <TextField {...params} label="name" placeholder="name" />}
				onInputChange={(_e: SyntheticEvent, value: string) => setNameFilterValue(value)}
			/>
			<Autocomplete
				disabled={disabled}
				className="input"
				multiple
				options={brands}
				disableCloseOnSelect
				getOptionLabel={(option) => option}
				renderOption={(props, option, { selected }) => (
					<li {...props}>
						<Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
						{option}
					</li>
				)}
				renderInput={(params) => <TextField {...params} label="brand" placeholder="brand" />}
				onChange={(_e: SyntheticEvent, value: string[]) => setBrandFilterValue(value)}
			/>
			<Autocomplete
				disabled={disabled}
				className="input"
				multiple
				options={categories}
				disableCloseOnSelect
				getOptionLabel={(option) => option}
				renderOption={(props, option, { selected }) => (
					<li {...props}>
						<Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
						{option}
					</li>
				)}
				renderInput={(params) => <TextField {...params} label="category" placeholder="category" />}
				onChange={(_e: SyntheticEvent, value: string[]) => setCategoryFilterValue(value)}
			/>
			<Autocomplete
				disabled={disabled}
				className="input"
				multiple
				options={stabilities}
				disableCloseOnSelect
				getOptionLabel={(option) => option}
				renderOption={(props, option, { selected }) => (
					<li {...props}>
						<Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
						{option}
					</li>
				)}
				renderInput={(params) => <TextField {...params} label="stability" placeholder="stability" />}
				onChange={(_e: SyntheticEvent, value: string[]) => setStabilityFilterValue(value)}
			/>
		</div>
	);
};

export default Form;
