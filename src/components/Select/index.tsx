import { useState, useEffect, useMemo, useRef, useCallback, memo, createRef } from "react";
import { createPortal } from "react-dom";
import classnames from "classnames";
import { AnimatePresence, motion, Transition, Variants } from "framer-motion";
import { useRect } from "@reach/rect";
import { useWindowSize } from "@reach/window-size";
import Scrollbars from "react-custom-scrollbars-2";

import useClickOutside from "hooks/useClickOutside";

import ScrollBar from "components/Scrollbar";
import Icon from "components/Icon";

import escapeRegExp from "./utils/escapeRegExp";
import generateKey from "utils/generateKey";
import isZero from "utils/isZero";

import { ReactComponent as ArrowDown } from "./assets/arrow-down.svg";
import { ReactComponent as ResetIcon } from "./assets/reset.svg";
import "./styles.scss";

export const selectTransition: Transition = {
	type: "keyframes",
	duration: 0.2,
};

export const variants: Variants = {
	initial: { scaleY: 0.5, opacity: 0 },
	animate: { scaleY: 1, opacity: 1 },
};

type OptionsRefMap = { [id: string]: React.RefObject<HTMLDivElement> };

interface Props<T> {
	value?: T;
	options: T[];
	onChange: (value: T | undefined) => void;
	idFromValue: (value: T) => string;
	render: (value: T) => any;

	name: string;
	required?: boolean;
	label?: string;
	error?: any;
	readonly?: boolean;
	style?: React.CSSProperties;
	loading?: boolean;
	optionsEmptyText?: string;
	searchable?: boolean;
	clearable?: boolean;
}

function Select<T>(props: Props<T>): React.ReactElement | null {
	const {
		options,
		value,
		label,
		required = false,
		error,
		style,
		optionsEmptyText,
		readonly = false,
		clearable = false,
		loading = false,
	} = props;
	const { onChange, idFromValue, render } = props;
	const [optionsVisible, setOptionsVisible] = useState(false);
	const [search, setSearch] = useState("");
	const [searchedOption, setSearchedOption] = useState<T>();
	const [optionsRefMap, setOptionsRefMap] = useState<OptionsRefMap>({});
	const [optionsPos] = useState<"top" | "bottom">("top");
	const optionsWrapperRef = useRef<HTMLDivElement>(null);
	const searchRef = useRef<HTMLInputElement>(null);
	const componentRef = useRef<HTMLDivElement>(null);
	const searchResetBtnRef = useRef<HTMLButtonElement>(null);
	const scrollbarRef = useRef<Scrollbars>(null);
	const selectKey = useRef(generateKey());
	const { height: windowHeight } = useWindowSize();
	const rect = useRect(componentRef);

	useClickOutside({
		ref: [componentRef, optionsWrapperRef, searchResetBtnRef],
		handler: handleClickOutside,
	});

	function handleClickOutside() {
		setOptionsVisible(false);
	}

	// inline styles
	const selectStyle = useMemo<React.CSSProperties>(() => {
		if (rect) {
			const topPos = rect.bottom + 2.5;
			const bottomPos = windowHeight - (rect.y - 2.5);

			return {
				width: rect.width,
				top: optionsPos === "top" ? topPos : "auto",
				bottom: optionsPos === "bottom" ? bottomPos : "auto",
				left: rect.x,
				transformOrigin: optionsPos === "top" ? "top center" : "bottom center",
			};
		} else return {};
	}, [optionsPos, rect, windowHeight]);

	const arrowDownStyle = useMemo<React.CSSProperties>(() => {
		return {
			transform: optionsVisible ? "translateY(-50%) rotate(180deg)" : "translateY(-50%)",
		};
	}, [optionsVisible]);
	//

	// classnames
	const fieldClass = useMemo(() => {
		return classnames({
			"select-field": true,
			"select-field--error": error,
			"select-field--loading": loading,
			"select-field--focus": optionsVisible,
			"select-field--readonly": readonly,
		});
	}, [error, loading, optionsVisible, readonly]);

	const hintClass = useMemo(() => {
		return classnames({
			"select-hint": true,
			"select-hint--visible": !!error,
			"select-hint--error": !!error,
		});
	}, [error]);
	//

	const handleSelect = useCallback(
		(option: T | undefined) => {
			if (option || (typeof option === "number" && option === 0)) {
				onChange(option);
				setOptionsVisible(false);
			}
		},
		[onChange]
	);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		setSearch(value);
	};

	const handleFieldClick = () => {
		if (!readonly) {
			searchRef.current?.focus();

			if (!loading) setOptionsVisible((optionsVisible) => !optionsVisible);
		}
	};

	const handleArrowDownClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
		e.stopPropagation();
		if (!loading) setOptionsVisible((optionsVisible) => !optionsVisible);
	};

	const handleReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();

		if (optionsVisible) searchRef.current?.focus();

		onChange(undefined);
	};

	const handleResetSearch = () => {
		setSearch("");
	};

	// useEffect(() => {
	// 	// const top = scrollbarRef.current?.scrollTop;
	// 	// if (optionsVisible) {
	// 	// 	searchRef.current?.focus();
	// 	// 	if (value && scrollbarRef.current)
	// 	// 		scrollbarRef.current.scrollTop = optionsRefMap[idFromValue(value)].current?.offsetTop || 0;
	// 	// } else searchRef.current?.blur();
	// 	// if (!optionsVisible && top && top !== 0)
	// 	// 	setTimeout(() => {
	// 	// 		if (scrollbarRef.current) scrollbarRef.current.scrollTop = 0;
	// 	// 	}, 150);
	// }, [optionsVisible, optionsRefMap, value, idFromValue]);

	useEffect(() => {
		const newMap = options.reduce(
			(acc, option) => ({ ...acc, [idFromValue(option)]: createRef() }),
			{}
		);

		setOptionsRefMap(newMap);
	}, [idFromValue, options]);

	useEffect(() => {
		if (search) {
			const regex = new RegExp(escapeRegExp(search), "i");
			const newSearhcedOption = options.find((option) => regex.test(render(option)));
			setSearchedOption(newSearhcedOption);
		} else setSearchedOption(undefined);
	}, [options, search, optionsRefMap, onChange, render]);

	useEffect(() => {
		if (searchedOption && scrollbarRef.current) {
			const searchedOptionId = idFromValue(searchedOption);
			const searchedOptionRef = optionsRefMap[searchedOptionId];

			if (searchedOptionRef && searchedOptionRef.current) {
				scrollbarRef.current.scrollTop(searchedOptionRef.current.offsetTop);
			}
		}
	}, [idFromValue, optionsRefMap, searchedOption]);

	useEffect(() => {
		setSearch("");
	}, [value]);

	// useLayoutEffect(() => {
	// 	if (optionsVisible) {
	// 		// const elem = optionsWrapperRef.current;
	// 		// const bounding = elem?.getBoundingClientRect();
	// 		// if (bounding && bounding.bottom + (optionsHeight * 35 + 10) > windowHeight)
	// 		// 	setOptionsPos("bottom");
	// 		// else setOptionsPos("top");
	// 	}
	// }, [optionsVisible, windowHeight]);

	return (
		<div className='select'>
			{label && (
				<span className='select-label'>
					{label} {required && <span>*</span>}
				</span>
			)}

			<div key={selectKey.current} ref={componentRef} className='p-relative'>
				<div className={fieldClass} style={style} onClick={handleFieldClick}>
					{readonly && <div className='select-readonly' />}

					<motion.input
						animate={{ height: search ? "100%" : 0, padding: search ? "7.5px 10px" : 0 }}
						transition={{ type: "spring", stiffness: 1000, damping: 5044 }}
						ref={searchRef}
						onChange={handleSearchChange}
						value={!loading ? search : ""}
						type='text'
						className='select-search'
						placeholder=''
					/>

					<motion.button
						animate={{ opacity: search ? 1 : 0, zIndex: search ? 10 : -1000 }}
						transition={{ type: "spring", stiffness: 1000, damping: 5044 }}
						ref={searchResetBtnRef}
						className='select-reset-btn select-reset-btn--search'
						type='button'
						onClick={handleResetSearch}
						children={<Icon icon='erase' />}
					/>

					{((value || (typeof value === "number" && value === 0)) && render(value)) || <>&nbsp;</>}

					{value && clearable && !loading ? (
						<button
							className='select-reset-btn'
							type='button'
							onClick={handleReset}
							children={<ResetIcon />}
						/>
					) : (
						!readonly && <ArrowDown style={arrowDownStyle} onClick={handleArrowDownClick} />
					)}

					<span className='select-loader' />
				</div>

				{createPortal(
					<AnimatePresence>
						{optionsVisible && (
							<motion.div
								ref={optionsWrapperRef}
								initial='initial'
								exit='initial'
								animate='animate'
								variants={variants}
								transition={selectTransition}
								style={selectStyle}
								className='select-select'
							>
								<ScrollBar autoHeight autoHeightMax={250} scrollbarRef={scrollbarRef}>
									<div className='py-2 px-5 w-100 d-flex flex-column'>
										{options.length === 0 && optionsEmptyText ? (
											<span className='select-option text-center'>{optionsEmptyText}</span>
										) : (
											options.map((option) => {
												const id = idFromValue(option);
												const isSearched = id === (searchedOption && idFromValue(searchedOption));
												const isSelected =
													typeof value !== "undefined" &&
													(value || isZero(value)) &&
													id === idFromValue(value);

												return (
													<div
														key={id}
														ref={optionsRefMap[id]}
														className={classnames({
															"select-option": true,
															"select-option--searched": isSearched,
															"select-option--selected": isSelected,
														})}
														onClick={() => handleSelect(option)}
													>
														{render(option)}
													</div>
												);
											})
										)}
									</div>
								</ScrollBar>
							</motion.div>
						)}
					</AnimatePresence>,
					document.getElementById("root") || document.createElement("div")
				)}
			</div>

			<p className={hintClass}>{error}</p>
		</div>
	);
}

export default memo(Select) as typeof Select;
