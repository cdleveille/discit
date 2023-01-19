import React, { useEffect, useState } from "react";
import useKeypress from "react-use-keypress";

import ClickAwayListener from "@mui/base/ClickAwayListener";

import { getArrayIntersection, stringArrayIncludesString, stringIncludesString } from "../helpers/util";
import { useApi } from "../hooks/useApi";
import { useLogin } from "../hooks/useLogin";
import { useNotification } from "../hooks/useNotification";
import { IBag, IDisc, IUser } from "../types/abstract";
import { CSSClasses, Keys, NUM_DISCS_TO_RENDER_INCR } from "../types/constants";
import { AboutDialog } from "./AboutDialog";
import { AddRemoveButton } from "./AddRemoveButton";
import { ChangePasswordDialog } from "./ChangePasswordDialog";
import { ChangeUsernameDialog } from "./ChangeUsernameDialog";
import { DeleteAccountDialog } from "./DeleteAccountDialog";
import DiscDetail from "./DiscDetail";
import DiscGrid from "./DiscGrid";
import Form from "./Form";
import Header from "./Header";
import { LoginRegisterDialog } from "./LoginRegisterDialog";
import { Menu } from "./Menu";
import { MenuButton } from "./MenuButton";
import { Notification } from "./Notification";
import Overlay from "./Overlay";
import { ProfileDialog } from "./ProfileDialog";
import { ScrollToTop } from "./ScrollToTop";

const Main = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [allDiscs, setAllDiscs] = useState<IDisc[]>([]);
	const [filteredDiscs, setFilteredDiscs] = useState<IDisc[]>([]);
	const [filteredDiscsByName, setFilteredDiscsByName] = useState<IDisc[]>([]);
	const [filteredDiscsByBrand, setFilteredDiscsByBrand] = useState<IDisc[]>([]);
	const [filteredDiscsByCategory, setFilteredDiscsByCategory] = useState<IDisc[]>([]);
	const [filteredDiscsByStability, setFilteredDiscsByStability] = useState<IDisc[]>([]);
	const [renderedDiscs, setRenderedDiscs] = useState<IDisc[]>([]);
	const [numDiscsToRender, setNumDiscsToRender] = useState(NUM_DISCS_TO_RENDER_INCR);

	const [detailEnabled, setDetailEnabled] = useState(true);
	const [detailVisible, setDetailVisible] = useState(false);
	const [activeDetailDisc, setActiveDetailDisc] = useState<IDisc | null>(null);
	const [activeDetailDiscColor, setActiveDetailDiscColor] = useState("");
	const [activeDetailDiscBackgroundColor, setActiveDetailDiscBackgroundColor] = useState("");
	const [spinClass, setSpinClass] = useState(CSSClasses.spinInDetail);
	const [showOverlay, setShowOverlay] = useState(false);
	const [isScrollToTopVisible, setIsScollToTopVisible] = useState(false);

	const [nameFilterValue, setNameFilterValue] = useState("");
	const [brandFilterValue, setBrandFilterValue] = useState<string[]>([]);
	const [categoryFilterValue, setCategoryFilterValue] = useState<string[]>([]);
	const [stabilityFilterValue, setStabilityFilterValue] = useState<string[]>([]);
	const [filterInputsDisabed, setFilterInputsDisabled] = useState(false);
	const [sortAtoZ, setSortAtoZ] = useState(true);

	const [showMenu, setShowMenu] = useState(false);
	const [showAboutDialog, setShowAboutDialog] = useState(false);
	const [showLoginDialog, setShowLoginDialog] = useState(false);
	const [showProfileDialog, setShowProfileDialog] = useState(false);
	const [showDeleteAcountDialog, setShowDeleteAccountDialog] = useState(false);
	const [showChangeUsernameDialog, setShowChangeUsernameDialog] = useState(false);
	const [showChangePasswordDialog, setShowChangePasswordDialog] = useState(false);

	const [loggedInUser, setLoggedInUser] = useState<IUser>();
	const [loggedInUserBags, setLoggedInUserBags] = useState<IBag[]>([]);
	const [isBagView, setIsBagView] = useState(false);

	const { GET } = useApi();
	const { notification, clearNotification, showNotification } = useNotification();
	const {
		logIn,
		register,
		validate,
		logOut,
		changeUsername,
		changePassword,
		deleteAccount,
		getBags,
		createBag,
		addDiscToBag,
		removeDiscFromBag
	} = useLogin(loggedInUser, setLoggedInUser, showNotification);

	useEffect(() => {
		(async () => {
			const [user] = await Promise.all([validate(), refreshDiscsAndBags(true)]);
			user && showNotification("success", `${user.username} logged in`);
		})();
	}, []);

	useEffect(() => {
		const sortedDiscs = sortDiscs(allDiscs);
		setAllDiscs(sortedDiscs);
		applyFilters(true);
	}, [sortAtoZ]);

	useEffect(() => {
		setRenderedDiscs(filteredDiscs.slice(0, numDiscsToRender));
	}, [filteredDiscs, numDiscsToRender]);

	useEffect(() => {
		applyFilters();
	}, [nameFilterValue, brandFilterValue, categoryFilterValue, stabilityFilterValue, isBagView]);

	useEffect(() => {
		isBagView && applyFilters();
	}, [loggedInUserBags]);

	useEffect(() => {
		(async () => {
			await refreshBags();
		})();
	}, [loggedInUser]);

	useKeypress(Keys.f2, e => {
		e.preventDefault();
		toggleMenu();
	});

	const refreshDiscsAndBags = async (reset?: boolean) => {
		setIsLoading(true);
		const [sortedDiscs] = await Promise.all([refreshDiscs(), refreshBags()]);
		reset && resetFilteredDiscs(sortedDiscs);
		setIsLoading(false);
	};

	const refreshDiscs = async () => {
		const allDiscsFromServer = (await GET("/disc")) as unknown as IDisc[];
		const sortedDiscs = sortDiscs(allDiscsFromServer);
		setAllDiscs(sortedDiscs);
		setIsLoading(false);
		return sortedDiscs;
	};

	const refreshBags = async () => {
		if (!loggedInUser) return;
		const bags = await getBags();
		if (bags.length === 0) {
			bags.push(await createBag(`${loggedInUser.username}'s Bag`));
		}
		setLoggedInUserBags(bags);
	};

	const isDiscInActiveBag = (disc: IDisc) =>
		!!loggedInUser && !!loggedInUserBags[0] && stringArrayIncludesString(loggedInUserBags[0].discs, disc.id, true);

	const discFilter = (disc: IDisc) => !isBagView || isDiscInActiveBag(disc);

	const applyFilters = (applySort?: boolean) => {
		setNumDiscsToRender(NUM_DISCS_TO_RENDER_INCR);

		if (
			!nameFilterValue &&
			brandFilterValue.length === 0 &&
			categoryFilterValue.length === 0 &&
			stabilityFilterValue.length === 0 &&
			!applySort &&
			!isBagView
		) {
			resetFilteredDiscs(allDiscs);
		} else {
			const newFilteredDiscsByName = allDiscs.filter(disc => {
				return nameFilterValue ? stringIncludesString(disc.name, nameFilterValue) : true && discFilter(disc);
			});

			const newFilteredDiscsByBrand = allDiscs.filter(disc => {
				return brandFilterValue.length > 0
					? stringArrayIncludesString(brandFilterValue, disc.brand, true)
					: true && discFilter(disc);
			});

			const newFilteredDiscsByCategory = allDiscs.filter(disc => {
				return categoryFilterValue.length > 0
					? stringArrayIncludesString(categoryFilterValue, disc.category, true)
					: true && discFilter(disc);
			});

			const newFilteredDiscsByStability = allDiscs.filter(disc => {
				return stabilityFilterValue.length > 0
					? stringArrayIncludesString(stabilityFilterValue, disc.stability, true)
					: true && discFilter(disc);
			});

			const newFilteredDiscs = getArrayIntersection(
				newFilteredDiscsByName,
				newFilteredDiscsByBrand,
				newFilteredDiscsByCategory,
				newFilteredDiscsByStability
			);

			setFilteredDiscs(newFilteredDiscs);
			setFilteredDiscsByName(newFilteredDiscsByName);
			setFilteredDiscsByBrand(newFilteredDiscsByBrand);
			setFilteredDiscsByCategory(newFilteredDiscsByCategory);
			setFilteredDiscsByStability(newFilteredDiscsByStability);
		}
	};

	const incrementNumDiscsToRender = () => {
		if (numDiscsToRender < filteredDiscs.length) setNumDiscsToRender(numDiscsToRender + NUM_DISCS_TO_RENDER_INCR);
	};

	const showDiscDetail = (data: IDisc, color: string, backgroundColor: string) => {
		if (!detailEnabled) return;
		setShowOverlay(true);
		setActiveDetailDisc(data);
		setActiveDetailDiscColor(color);
		setActiveDetailDiscBackgroundColor(backgroundColor);
		setDetailVisible(true);
		setSpinClass(CSSClasses.spinInDetail);
		setFilterInputsDisabled(true);
	};

	const hideDiscDetail = () => {
		if (!showOverlay) return;
		setDetailEnabled(false);
		setShowOverlay(false);
		setSpinClass(CSSClasses.spinOutDetail);
		setFilterInputsDisabled(false);

		setTimeout(() => {
			setDetailVisible(false);
			setDetailEnabled(true);
		}, 425);
	};

	const resetFilteredDiscs = (discs: IDisc[]) => {
		setFilteredDiscs(discs);
		setFilteredDiscsByName(discs);
		setFilteredDiscsByBrand(discs);
		setFilteredDiscsByCategory(discs);
		setFilteredDiscsByStability(discs);
	};

	const toggleSortOrder = () => {
		setSortAtoZ(!sortAtoZ);
	};

	const sortDiscs = (discs: IDisc[]) => {
		return discs.sort((a, b) => {
			return (sortAtoZ ? 1 : -1) * a.name.toLowerCase().localeCompare(b.name.toLowerCase());
		});
	};

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	const menuLoginClickHandler = () => {
		setShowMenu(false);
		setShowLoginDialog(true);
	};

	const menuProfileClickHandler = () => {
		setShowMenu(false);
		setShowProfileDialog(true);
	};

	const viewToggleClickHandler = () => {
		setShowMenu(false);
		setIsBagView(!isBagView);
	};

	const menuRefreshClickHandler = async () => {
		setShowMenu(false);
		await refreshDiscsAndBags();
	};

	const menuAboutClickHandler = () => {
		setShowMenu(false);
		setShowAboutDialog(true);
	};

	const logoutClickHandler = async () => {
		setShowMenu(false);
		await logOut();
	};

	const addDiscToActiveBag = async (disc: IDisc) => {
		await addDiscToBag(loggedInUserBags[0].id, disc);
		await refreshBags();
	};

	const removeDiscFromActiveBag = async (disc: IDisc) => {
		await removeDiscFromBag(loggedInUserBags[0].id, disc);
		await refreshBags();
	};

	return (
		<div className="main">
			<Overlay visible={showOverlay} onClick={hideDiscDetail} />
			<Header />
			<Notification
				severity={notification?.severity}
				message={notification?.message}
				clearNotification={clearNotification}
			/>
			<div className="menu">
				<ClickAwayListener onClickAway={() => setShowMenu(false)}>
					<div>
						<MenuButton onClick={toggleMenu} />
						{showMenu && (
							<Menu
								loggedInUser={loggedInUser}
								loginClickHandler={menuLoginClickHandler}
								viewToggleClickHandler={viewToggleClickHandler}
								menuProfileClickHandler={menuProfileClickHandler}
								refreshClickHandler={menuRefreshClickHandler}
								aboutClickHandler={menuAboutClickHandler}
								logoutClickHandler={logoutClickHandler}
								isBagView={isBagView}
							></Menu>
						)}
					</div>
				</ClickAwayListener>
			</div>
			<div className="add-remove-btn">
				{detailVisible && activeDetailDisc && loggedInUser && loggedInUserBags && (
					<AddRemoveButton
						addDiscToActiveBag={addDiscToActiveBag}
						removeDiscFromActiveBag={removeDiscFromActiveBag}
						isDiscInActiveBag={isDiscInActiveBag}
						disc={activeDetailDisc}
					/>
				)}
			</div>
			<AboutDialog open={showAboutDialog} onClose={() => setShowAboutDialog(false)} />
			<LoginRegisterDialog
				open={showLoginDialog}
				onClose={() => setShowLoginDialog(false)}
				logIn={logIn}
				register={register}
			/>
			<ProfileDialog
				open={showProfileDialog}
				onClose={() => setShowProfileDialog(false)}
				loggedInUser={loggedInUser}
				setShowDeleteAccountDialog={setShowDeleteAccountDialog}
				setShowChangeUsernameDialog={setShowChangeUsernameDialog}
				setShowChangePasswordDialog={setShowChangePasswordDialog}
			/>
			<DeleteAccountDialog
				open={showDeleteAcountDialog}
				onClose={() => setShowDeleteAccountDialog(false)}
				loggedInUser={loggedInUser}
				deleteAccount={deleteAccount}
			/>
			<ChangeUsernameDialog
				open={showChangeUsernameDialog}
				onClose={() => setShowChangeUsernameDialog(false)}
				changeUsername={changeUsername}
			/>
			<ChangePasswordDialog
				open={showChangePasswordDialog}
				onClose={() => setShowChangePasswordDialog(false)}
				changePassword={changePassword}
			/>
			<Form
				filteredDiscsByName={filteredDiscsByName}
				filteredDiscsByBrand={filteredDiscsByBrand}
				filteredDiscsByCategory={filteredDiscsByCategory}
				filteredDiscsByStability={filteredDiscsByStability}
				disabled={filterInputsDisabed}
				setNameFilterValue={setNameFilterValue}
				setBrandFilterValue={setBrandFilterValue}
				setCategoryFilterValue={setCategoryFilterValue}
				setStabilityFilterValue={setStabilityFilterValue}
				sortAtoZ={sortAtoZ}
			/>
			<DiscDetail
				data={activeDetailDisc}
				color={activeDetailDiscColor}
				backgroundColor={activeDetailDiscBackgroundColor}
				visible={detailVisible}
				spinClass={spinClass}
			/>
			<DiscGrid
				data={renderedDiscs}
				renderMoreDiscs={incrementNumDiscsToRender}
				showDiscDetail={showDiscDetail}
				count={filteredDiscs.length}
				toggleSortOrder={toggleSortOrder}
				isLoading={isLoading}
				setIsScollToTopVisible={setIsScollToTopVisible}
				isBagView={isBagView}
				setIsBagView={setIsBagView}
				isLoggedIn={!!loggedInUser}
			/>
			<ScrollToTop visible={isScrollToTopVisible} />
		</div>
	);
};

export default Main;
