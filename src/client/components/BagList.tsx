import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Divider, IconButton, List, ListItem, ListItemText, Stack } from "@mui/material";

import { Tooltip } from "@components";
import { useAppContext } from "@hooks";

export const BagList = ({
	onClose
}: {
	onClose: () => void;
}) => {
	const {
		bags,
		selectedBag,
		setSelectedBagId,
		showBagAddModal,
		showBagEditModal,
		showBagDeleteModal
	} = useAppContext();

	if (!bags || bags.length === 0 || !selectedBag) return null;

	return (
		<List>
			{bags.map(bag => (
				<div key={bag.id}>
					<ListItem
						secondaryAction={
							<Stack direction="row" spacing="1rem">
								<Tooltip title="Edit">
									<IconButton
										aria-label="Edit"
										onClick={e => {
											e.stopPropagation();
											onClose();
											showBagEditModal(bag);
										}}
									>
										<EditIcon sx={{ fontSize: "1.5rem" }} />
									</IconButton>
								</Tooltip>
								<Tooltip title="Delete">
									<IconButton
										aria-label="Delete"
										onClick={e => {
											e.stopPropagation();
											onClose();
											showBagDeleteModal(bag);
										}}
									>
										<DeleteIcon sx={{ fontSize: "1.5rem" }} />
									</IconButton>
								</Tooltip>
							</Stack>
						}
						className="bag-list-item"
						onClick={() => {
							setSelectedBagId(bag.id);
							onClose();
						}}
					>
						<ListItemText
							sx={{ padding: "0.25rem 7rem 0.25rem 0.25rem" }}
							primary={bag.name}
						/>
					</ListItem>
					<Divider />
				</div>
			))}
			<ListItem
				key="new-bag"
				secondaryAction={
					<IconButton aria-label="Add Bag">
						<AddIcon sx={{ fontSize: "1.5rem" }} />
					</IconButton>
				}
				className="bag-list-item"
				onClick={() => {
					onClose();
					showBagAddModal();
				}}
			>
				<ListItemText
					sx={{
						padding: "0.25rem 1rem 0.25rem 0.25rem",
						minWidth: "10rem",
						color: "#212121"
					}}
					primary="Add new bag"
				/>
			</ListItem>
		</List>
	);
};
