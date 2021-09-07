import { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import classnames from "classnames";

import { logoutUser } from "store/auth/actions";
import { setActiveStep } from "store/user/actions";
import {
	selectUserImage,
	selectUserFullname,
	selectUserLoading,
	selectUserRole,
	selectUserSteps,
	selectActiveStep,
	selectCanUseAdminPanel,
} from "store/user/selectors";

import Skeleton from "components/Skeleton";
import Switch from "components/Switch";

import useOnClickOutside from "hooks/useClickOutside";

import { setIsDarkMode, getIsDarkMode } from "utils/localStorage";
import { createDefaultStep } from "types/utils";
import EventBus, { ThemeChangeEvent } from "eventBus";

import { ReactComponent as UserProfile } from "assets/user.svg";
import { ReactComponent as SidebarLogo } from "assets/logo.svg";
import { ReactComponent as ArrowDown } from "assets/down-arrow.svg";
import "./styles.scss";

const variants: Variants = {
	open: { opacity: 1 },
	closed: { opacity: 0 },
};

const transition: Transition = { bounce: 0, duration: 0.15 };

const Header: React.FC = () => {
	// const history = useHistory();
	const dispatch = useDispatch();
	const userImage = useSelector(selectUserImage);
	const userFullname = useSelector(selectUserFullname);
	const userRole = useSelector(selectUserRole);
	const userSteps = useSelector(selectUserSteps);
	const activeStep = useSelector(selectActiveStep);
	const userLoading = useSelector(selectUserLoading);
	const canUseAdminPanel = useSelector(selectCanUseAdminPanel);
	const [menuOpen, setMenuOpen] = useState(false);
	const [darkMode, setDarkMode] = useState(getIsDarkMode());
	const headerMenuRef = useRef<HTMLDivElement>(null);

	useOnClickOutside({ ref: headerMenuRef, handler: () => setMenuOpen(false) });

	const handleLogout = useCallback(() => {
		dispatch(logoutUser());
	}, [dispatch]);

	const handleSetActiveStep = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();
		const stepId = +(e.currentTarget.dataset["step"] || "-1");
		const step = userSteps.find((s) => s.id === stepId) || createDefaultStep();

		if (step.id !== activeStep.id) dispatch(setActiveStep(step));
	};

	const handleToggleMenuOpen = useCallback(() => {
		setMenuOpen((prev) => !prev);
	}, []);

	const handleCloseMenu = useCallback(() => {
		setMenuOpen(false);
	}, []);

	const handleGoToProfile = useCallback(() => {
		// history.push("/main/profile");
	}, []);

	const handleToggleDarkMode = useCallback(() => {
		setDarkMode((prev) => !prev);
	}, []);

	useEffect(() => {
		const body = document.querySelector("body");

		if (body) {
			if (darkMode) {
				body.classList.add("dark");
				body.classList.remove("light");
				setIsDarkMode(true);
			} else {
				body.classList.add("light");
				body.classList.remove("dark");
				setIsDarkMode(false);
			}

			EventBus.publish("theme-change", new ThemeChangeEvent(darkMode ? "dark" : "light"));
		}
	}, [darkMode]);

	return (
		<header className='header'>
			<div className='d-flex align-center'>
				<div className='logo-wrapper'>
					<SidebarLogo className='logo-img' />
				</div>
				<h2 className='headline font-weight-medium ml-4'>ASAN Müraciət</h2>
			</div>

			<div className='d-flex align-center'>
				<div className='user-info' onClick={handleGoToProfile}>
					<div className='user-img-wrapper mr-5'>
						{!userImage || userLoading ? (
							<UserProfile />
						) : (
							<img src={`data:image/png;base64,${userImage}`} alt='Profile' className='user-img' />
						)}
					</div>

					{!userLoading ? (
						<h3 className='user-fullname'>
							{userFullname}
							<span>{activeStep.name}</span>
						</h3>
					) : (
						<Skeleton type='text' width={150} />
					)}
				</div>

				<div ref={headerMenuRef} className='header-menu'>
					<div className='header-menu-activator' onClick={handleToggleMenuOpen}>
						<ArrowDown className='header-menu-activator-icon' />
					</div>

					<AnimatePresence>
						{menuOpen && (
							<motion.div
								key='header-menu'
								initial='closed'
								animate='open'
								exit='closed'
								variants={variants}
								transition={transition}
								className='header-menu-content'
								onClick={handleCloseMenu}
							>
								<button
									className='header-menu-btn header-menu-btn--with-border d-flex align-center mb-5'
									onClick={handleGoToProfile}
								>
									{!userImage || userLoading ? (
										<UserProfile className='header-menu-user-img' />
									) : (
										<img
											src={`data:image/png;base64,${userImage}`}
											alt='Profile'
											className='header-menu-user-img'
										/>
									)}

									<div className='header-menu-user-info'>
										<span>{userFullname}</span>
										<span>{userRole?.name}</span>
									</div>
								</button>

								{userSteps.map((step) => (
									<div
										key={`header-menu-step-${step.id}`}
										className={`header-menu-btn mb-2 d-flex justify-between ${
											step.id === activeStep.id ? "header-menu-btn--active" : ""
										}`}
										data-step={JSON.stringify(step.id)}
										onClick={handleSetActiveStep}
									>
										{step.name}
									</div>
								))}

								{canUseAdminPanel && (
									<div
										className={classnames({
											"header-menu-btn header-menu-btn--with-border mb-5 header-menu-btn--not-shrink d-flex justify-between": true,
											"header-menu-btn--active": activeStep.id === 9999,
										})}
									>
										Tənzimləmələr
									</div>
								)}

								<div
									className='header-menu-btn header-menu-btn--with-border mb-5 header-menu-btn--not-shrink d-flex justify-between'
									onClick={(e) => e.stopPropagation()}
								>
									<span>Qaranlıq rejim</span>

									<Switch value={darkMode} onToggle={handleToggleDarkMode} />
								</div>

								<button className='header-menu-btn' onClick={handleLogout}>
									Çıxış et
								</button>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</header>
	);
};

export default Header;
