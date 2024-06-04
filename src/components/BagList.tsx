"use client";

import { useRouter } from "next/navigation";

import { deleteBag } from "@actions";
import { useDiscContext } from "@hooks";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import { BagListProps } from "@types";

export const BagList = ({ onClose }: BagListProps) => {
	const router = useRouter();
	const { bags, selectedBag, setSelectedBag } = useDiscContext();
	if (!selectedBag || !bags || bags.length === 0) return null;

	return (
		<List>
			{bags.map(bag => (
				<ListItem
					key={bag.id}
					secondaryAction={
						<IconButton
							edge="end"
							aria-label="delete"
							onClick={async e => {
								e.stopPropagation();
								await deleteBag({ bagId: bag.id });
							}}
						>
							<DeleteIcon />
						</IconButton>
					}
					className="bag-list-item"
					onClick={() => {
						setSelectedBag(bag);
						onClose();
					}}
				>
					<ListItemText
						sx={{ padding: "0.25rem 1rem 0.25rem 0.25rem", minWidth: "10rem" }}
						primary={bag.name}
					/>
				</ListItem>
			))}
			<ListItem
				key="new-bag"
				secondaryAction={
					<IconButton edge="end" aria-label="add">
						<AddIcon />
					</IconButton>
				}
				className="bag-list-item"
				onClick={() => {
					onClose();
					router.push("/bag/new");
				}}
			>
				<ListItemText
					sx={{
						padding: "0.25rem 1rem 0.25rem 0.25rem",
						minWidth: "10rem",
						color: "#212121"
					}}
					primary="Add new bag..."
				/>
			</ListItem>
		</List>
	);
};
