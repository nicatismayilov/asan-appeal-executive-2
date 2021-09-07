import { useState, useMemo, useCallback, useEffect, CSSProperties, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRect } from "@reach/rect";

import { checkUserSession } from "store/user/actions";
import { setMainContentHeight } from "store/layout/actions";

import { selectUserLoading } from "store/user/selectors";

import Header from "layout/Header";
import Sidebar from "layout/Sidebar";
import Content from "layout/Content";
import PageLoader from "layout/PageLoader";

import { getSidebarExpand, setSidebarExpand } from "utils/sessionStorage";

import "./styles.scss";

const Main: React.FC = () => {
	const dispatch = useDispatch();
	const userLoading = useSelector(selectUserLoading);
	const [loading, setLoading] = useState(true);
	const [expanded, setExpanded] = useState(getSidebarExpand());
	const mainContentRef = useRef<HTMLDivElement>(null);
	const mainContentRect = useRect(mainContentRef);

	const handleToggleExpand = useCallback(() => {
		setExpanded((e) => !e);
	}, []);

	// inline styles
	const sidebarWrapperStyles = useMemo<CSSProperties>(() => {
		return { width: expanded ? "20%" : 56, overflowX: "hidden" };
	}, [expanded]);

	const contentWrapperStyles = useMemo<CSSProperties>(() => {
		return { width: expanded ? "80%" : "calc(100% - 56px)" };
	}, [expanded]);
	//

	useEffect(() => {
		setLoading(false);
	}, [dispatch]);

	useEffect(() => {
		setSidebarExpand(expanded);
	}, [expanded]);

	useEffect(() => {
		dispatch(checkUserSession());
	}, [dispatch]);

	useEffect(() => {
		if (mainContentRect) {
			dispatch(setMainContentHeight(mainContentRect.height));
		}
	}, [dispatch, mainContentRect]);

	if (userLoading || loading) return <PageLoader />;
	return (
		<div className='main' id='main'>
			<Header />

			<div ref={mainContentRef} className='main-content'>
				<div className='transition sidebar-container' style={sidebarWrapperStyles}>
					<div className='w-20vw h-100'>
						<Sidebar expanded={expanded} onToggleExpand={handleToggleExpand} />
					</div>
				</div>

				<div className='transition main-bg-color' style={contentWrapperStyles}>
					<Content />
				</div>
			</div>
		</div>
	);
};

export default Main;
