import { useEffect, useMemo } from "react";
import { useRouteMatch, Link, useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";

import {
	selectCanUseAdminPanel,
	selectCanAddCategory,
	selectMenus,
	// selectMenusLoading,
	selectActiveStep,
	selectMenuCounts,
	selectActiveMenu,
	selectMenusLoading,
} from "store/user/selectors";
import { setActiveMenu } from "store/user/actions";

import Scrollbar from "components/Scrollbar";
import Icon from "components/Icon";
import Tooltip from "components/Tooltip";
import Badge from "components/Badge";
import Spinner from "components/Spinner";

import EventBus from "eventBus";

import navigationItems from "./navigationItems";

import { ReactComponent as MenuIcon } from "./assets/menu.svg";
import { ReactComponent as ArrowBack } from "./assets/arrow-back.svg";
import "./styles.scss";

interface Props {
	expanded?: boolean;
	onToggleExpand?: () => void;
}

const Sidebar: React.FC<Props> = (props) => {
	const { expanded = true } = props;
	const { onToggleExpand } = props;
	const match = useRouteMatch();
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const canUseAdminPanel = useSelector(selectCanUseAdminPanel);
	const canAddCategory = useSelector(selectCanAddCategory);
	const menus = useSelector(selectMenus);
	const menusLoading = useSelector(selectMenusLoading);
	const activeStep = useSelector(selectActiveStep);
	const menuCounts = useSelector(selectMenuCounts);
	const activeMenu = useSelector(selectActiveMenu);

	const handleExpandClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();

		onToggleExpand && onToggleExpand();
	};

	// classes
	const expandButtonWrapperClass = useMemo(() => {
		return classnames({
			"py-2 px-2 d-flex expand-btn-wrapper": true,
			"expand-btn-wrapper--shrink": !expanded,
		});
	}, [expanded]);

	const expandButtonClass = useMemo(() => {
		return classnames({
			"expand-btn": true,
			"expand-btn--expanded": expanded,
		});
	}, [expanded]);
	//

	const redirectToProfileEffect = () => {
		if (!canUseAdminPanel) history.push(`${match.url}/profile`);
	};

	const pushRouterEffect = () => {
		const unsubscribe = EventBus.subscribers.onGetMenusSuccess((e) => {
			history.push(`${match.url}/requests/${e.menu.label}`);
		});

		return () => {
			unsubscribe();
		};
	};

	useEffect(redirectToProfileEffect, [canUseAdminPanel, history, match.url]);
	useEffect(pushRouterEffect, [history, match.url]);

	return (
		<aside className='sidebar'>
			<Scrollbar hide>
				<div className='h-100 d-flex flex-column justify-between'>
					<div className='d-flex flex-column'>
						<div className={expandButtonWrapperClass}>
							<div className={expandButtonClass} onClick={handleExpandClick}>
								{expanded ? <ArrowBack /> : <MenuIcon />}
							</div>
						</div>

						<nav className='py-6 d-flex flex-column navigation'>
							{activeStep.id === 9999 && canUseAdminPanel ? (
								navigationItems.map((navItem, idx) => {
									const to = `${match.url}/admin/${navItem.to}`;
									const isActive = new RegExp(to).test(location.pathname);

									if (navItem.to === "/categories" && !canAddCategory) return null;
									else
										return (
											<Link
												key={`${navItem.name}-${idx}`}
												to={to}
												className={classnames({
													navigation__link: true,
													"navigation__link--active": isActive,
												})}
											>
												<Tooltip content={navItem.name} position='right' disabled={expanded}>
													<div className='navigation__link-icon-wrapper'>
														<Icon className='navigation__link-icon' name={navItem.icon} />
													</div>
												</Tooltip>

												<div className='navigation__link-text'>{navItem.name}</div>
											</Link>
										);
								})
							) : menusLoading ? (
								<Spinner />
							) : (
								menus.map((menu) => {
									const to = `${match.url}/requests/${menu.label}`;
									const isActive = menu.label === activeMenu.label;
									const count = +menuCounts[`${menu.name}Count`];
									const badgeText = count <= 99 ? count : "99+";
									const isBadgeDisabled = count < 1;

									return (
										<Link
											key={`${menu.label}-${menu.url}`}
											to={to}
											className={classnames({
												navigation__link: true,
												"navigation__link--active": isActive,
											})}
											onClick={() => dispatch(setActiveMenu(menu))}
										>
											<Tooltip content={menu.title} position='right' disabled={expanded}>
												<div className='navigation__link-icon-wrapper'>
													<Badge text={badgeText} disabled={isBadgeDisabled}>
														<Icon className='navigation__link-icon' name={menu.icon} />
													</Badge>
												</div>
											</Tooltip>

											<div className='navigation__link-text'>{menu.title}</div>
										</Link>
									);
								})
							)}
						</nav>
					</div>
				</div>
			</Scrollbar>
		</aside>
	);
};

export default Sidebar;
