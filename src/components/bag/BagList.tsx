"use client";

import toast from "react-hot-toast";

import { useApi, useAppContext } from "@hooks";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Divider, IconButton, List, ListItem, ListItemText, Stack } from "@mui/material";

import type { BagListProps } from "@types";

export const BagList = ({ onClose }: BagListProps) => {
	const { isLoading, deleteBag } = useApi();
	const { bags, selectedBag, setSelectedBag, showNewBagModal, showEditBagModal } = useAppContext();

	if (!selectedBag || !bags || bags.length === 0) return null;

	return (
		<List>
			{bags.map(bag => (
				<>
					<ListItem
						key={bag.id}
						secondaryAction={
							<Stack direction="row" spacing="1rem">
								<IconButton aria-label="edit" onClick={() => showEditBagModal(bag)}>
									<EditIcon sx={{ fontSize: "1.5rem" }} />
								</IconButton>
								<IconButton
									aria-label="delete"
									onClick={async e => {
										e.stopPropagation();
										onClose();
										const deletedBagIndex = bags.indexOf(bag);
										const res = await deleteBag({ bagId: bag.id });
										if (res.error) {
											toast.error("Error deleting bag");
											return;
										}
										toast.success(`Deleted ${bag.name}`);
										setSelectedBag(bags[deletedBagIndex - 1] ?? bags[deletedBagIndex + 1] ?? null);
									}}
									disabled={isLoading}
								>
									<DeleteIcon sx={{ fontSize: "1.5rem" }} />
								</IconButton>
							</Stack>
						}
						className="bag-list-item"
						onClick={() => {
							onClose();
							setSelectedBag(bag);
						}}
					>
						<ListItemText sx={{ padding: "0.25rem 7rem 0.25rem 0.25rem" }} primary={bag.name} />
					</ListItem>
					<Divider />
				</>
			))}
			<ListItem
				key="new-bag"
				secondaryAction={
					<IconButton aria-label="add">
						<AddIcon sx={{ fontSize: "1.5rem" }} />
					</IconButton>
				}
				className="bag-list-item"
				onClick={() => {
					onClose();
					showNewBagModal();
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
