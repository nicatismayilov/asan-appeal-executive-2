import React from "react";
import { CSSProperties, useMemo, useCallback } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import "./styles.scss";

interface Props {
	hide?: boolean;
	renderHorizontal?: boolean;
	scrollbarRef?: React.LegacyRef<Scrollbars>;
	viewRef?: React.LegacyRef<HTMLDivElement>;
	autoHeight?: boolean;
	autoHeightMax?: number;
	autoHeightMin?: number;
}

const Scrollbar: React.FC<Props> = (props) => {
	const {
		hide = false,
		renderHorizontal = false,
		scrollbarRef,
		viewRef,
		autoHeight = false,
		autoHeightMin = 50,
		autoHeightMax = 3500,
	} = props;

	const styles = useMemo<CSSProperties>(() => {
		return { height: "100%", width: "100%" };
	}, []);

	const handleRenderView = useCallback(
		(props) => {
			return renderHorizontal ? (
				<div ref={viewRef} {...props} className={`scrollbar-view-horizontal`} />
			) : (
				<div ref={viewRef} {...props} className={`scrollbar-view-vertical`} />
			);
		},
		[renderHorizontal, viewRef]
	);

	const handleRenderThumbVertical = useCallback((props) => {
		return <div {...props} className='scrollbar-thumb-vertical' />;
	}, []);

	const handleRenderThumbHorizontal = useCallback((props) => {
		return <div {...props} className='scrollbar-thumb-horizontal' />;
	}, []);

	const handleRenderTrackVertical = useCallback((props) => {
		return <div {...props} className='scrollbar-track-vertical' />;
	}, []);

	return (
		<Scrollbars
			ref={scrollbarRef}
			autoHide={hide}
			style={styles}
			renderThumbVertical={handleRenderThumbVertical}
			renderThumbHorizontal={handleRenderThumbHorizontal}
			renderTrackVertical={handleRenderTrackVertical}
			renderView={handleRenderView}
			hideTracksWhenNotNeeded={true}
			autoHeight={autoHeight}
			autoHeightMax={autoHeightMax}
			autoHeightMin={autoHeightMin}
		>
			{props.children}
		</Scrollbars>
	);
};

export default Scrollbar;
