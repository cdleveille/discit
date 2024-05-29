import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

type MenuButtonProps = {
	onClick: () => void;
};

export const MenuButton = ({ onClick }: MenuButtonProps) => {
	return (
		<IconButton aria-label="Menu" onClick={onClick} size="large" className="menu-btn">
			<MenuIcon />
		</IconButton>
	);
};
