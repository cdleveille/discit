import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import React, { useState, useEffect, SyntheticEvent } from "react";

import { uniqueValue } from "../helpers/util";
import { IDisc } from "../types/abstract";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface IFormProps {
	data: IDisc[];
	disabled: boolean;
	onNameInputChange: (value: string) => void;
}

export const Form: React.FC<IFormProps> = ({ data, disabled, onNameInputChange }) => {
	const [names, setNames] = useState([] as string[]);
	const [brands, setBrands] = useState([] as string[]);
	const [categories, setCategories] = useState([] as string[]);
	const [stabilities, setStabilities] = useState([] as string[]);

	useEffect(() => {
		if (data.length === 0) return;

		setNames(
			data
				.map((option) => option.name)
				.filter(uniqueValue)
				.sort()
		);

		setBrands(
			data
				.map((option) => option.brand)
				.filter(uniqueValue)
				.sort()
		);

		setCategories(
			data
				.map((option) => option.category)
				.filter(uniqueValue)
				.sort()
		);

		setStabilities(
			data
				.map((option) => option.stability)
				.filter(uniqueValue)
				.sort()
		);
	}, [data]);

	return (
		<div className="form">
			<Autocomplete
				disabled={disabled}
				className="input"
				freeSolo
				options={names}
				renderInput={(params) => <TextField {...params} label="name" placeholder="name" />}
				onInputChange={(e: SyntheticEvent, value: string) => onNameInputChange(value)}
			/>
			<Autocomplete
				disabled={disabled}
				className="input"
				freeSolo
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
			/>
			<Autocomplete
				disabled={disabled}
				className="input"
				freeSolo
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
			/>
			<Autocomplete
				disabled={disabled}
				className="input"
				freeSolo
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
			/>
		</div>
	);
};

export default Form;
