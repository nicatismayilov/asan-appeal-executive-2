import { useState, useEffect, useMemo, useRef, memo, createRef } from "react";
import { createPortal } from "react-dom";
import classnames from "classnames";
import { AnimatePresence, motion, Transition, Variants, AnimateSharedLayout } from "framer-motion";
import { useRect } from "@reach/rect";
import { useWindowSize } from "@reach/window-size";
import Scrollbars from "react-custom-scrollbars-2";

import useClickOutside from "hooks/useClickOutside";

import ScrollBar from "components/Scrollbar";

import ComboboxValueSlot from "./components/ComboboxValueSlot";

import escapeRegExp from "./utils/escapeRegExp";
import computeStyles from "./utils/computeStyles";
import generateKey from "utils/generateKey";

import { ReactComponent as ArrowDown } from "./assets/arrow-down.svg";
import { ReactComponent as ResetIcon } from "./assets/reset.svg";
import "./styles.scss";

export const selectTransition: Transition = {
	type: "keyframes",
	duration: 0.2,
};

export const variants: Variants = {
	initial: { y: -10, opacity: 0 },
	animate: { y: 0, opacity: 1 },
	exit: { y: -5, opacity: 0 },
};

type OptionsRefMap = { [id: string]: React.RefObject<HTMLDivElement> };

interface Props<T> {
	values: T[];
	options: T[];
	onChange: (value: T[]) => void;
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

function Combobox<T>(props: Props<T>): React.ReactElement | null {
	const {
		options,
		values,
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
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [searchedOption, setSearchedOption] = useState<T>();
	const [optionsRefMap, setOptionsRefMap] = useState<OptionsRefMap>({});
	const [dropdownPosition] = useState<"top" | "bottom">("top");
	const dropdownRef = useRef<HTMLDivElement>(null);
	const searchRef = useRef<HTMLInputElement>(null);
	const componentRef = useRef<HTMLDivElement>(null);
	const searchResetBtnRef = useRef<HTMLButtonElement>(null);
	const scrollbarRef = useRef<Scrollbars>(null);
	const selectKey = useRef(generateKey());
	const { height: windowHeight } = useWindowSize();
	const rect = useRect(componentRef);
	// const dropdownRect = useRect(dropdownRef);

	useClickOutside({
		ref: [componentRef, dropdownRef, searchResetBtnRef],
		handler: handleClickOutside,
	});

	function handleClickOutside() {
		setDropdownOpen(false);
	}

	const selectedOptionsMap = useMemo(() => {
		return values.reduce((acc, val) => ({ ...acc, [idFromValue(val)]: true }), {});
	}, [idFromValue, values]);

	// inline styles
	const selectStyle = useMemo(() => {
		const styles = computeStyles({
			rect,
			windowHeight,
			position: dropdownPosition,
		});

		return styles;
	}, [dropdownPosition, rect, windowHeight]);

	const arrowDownStyle = useMemo<React.CSSProperties>(() => {
		return {
			transform: dropdownOpen ? "translateY(-50%) rotate(180deg)" : "translateY(-50%)",
		};
	}, [dropdownOpen]);
	//

	// classnames
	const fieldClass = useMemo(() => {
		return classnames({
			"combobox-field": true,
			"combobox-field--error": error,
			"combobox-field--loading": loading,
			"combobox-field--focus": dropdownOpen,
			"combobox-field--readonly": readonly,
		});
	}, [error, loading, dropdownOpen, readonly]);

	const hintClass = useMemo(() => {
		return classnames({
			"combobox-hint": true,
			"combobox-hint--visible": !!error,
			"combobox-hint--error": !!error,
		});
	}, [error]);
	//

	// const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const { value } = e.target;

	// 	setSearch(value);
	// };

	// const handleFieldClick = () => {
	// 	if (!readonly) {
	// 		searchRef.current?.focus();

	// 		if (!loading) setDropdownOpen((dropdownOpen) => !dropdownOpen);
	// 	}
	// };

	const handleDismissValue = (idx: number) => {
		const newValues = values.filter((_, index) => index !== idx);
		onChange && onChange(newValues);
	};

	const handleToggleDropdownOpen = () => {
		if (readonly) return;

		setDropdownOpen((prev) => !prev);
	};

	const handleSelectValue = (value: T) => {
		if (selectedOptionsMap[idFromValue(value)])
			handleDismissValue(values.findIndex((val) => idFromValue(val) === idFromValue(value)));
		else {
			const newValues = [...values, value];
			onChange && onChange(newValues);
		}
	};

	const handleArrowDownClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
		e.stopPropagation();
		if (!loading) setDropdownOpen((dropdownOpen) => !dropdownOpen);
	};

	const handleReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();

		if (dropdownOpen) searchRef.current?.focus();

		onChange([]);
	};

	// const handleResetSearch = () => {
	// 	setSearch("");
	// };

	// useEffect(() => {
	// 	// const top = scrollbarRef.current?.scrollTop;
	// 	// if (dropdownOpen) {
	// 	// 	searchRef.current?.focus();
	// 	// 	if (value && scrollbarRef.current)
	// 	// 		scrollbarRef.current.scrollTop = optionsRefMap[idFromValue(value)].current?.offsetTop || 0;
	// 	// } else searchRef.current?.blur();
	// 	// if (!dropdownOpen && top && top !== 0)
	// 	// 	setTimeout(() => {
	// 	// 		if (scrollbarRef.current) scrollbarRef.current.scrollTop = 0;
	// 	// 	}, 150);
	// }, [dropdownOpen, optionsRefMap, value, idFromValue]);

	useEffect(() => {
		const newMap = options.reduce(
			(acc, option) => ({ ...acc, [idFromValue(option)]: createRef<HTMLDivElement>() }),
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
	}, [values]);

	// useLayoutEffect(() => {
	// 	if (dropdownRect && dropdownOpen) {
	// 		const { height, y } = dropdownRect;
	// 		const offset = 10;

	// 		console.log(y, height);

	// 		if (y + height + offset >= windowHeight) setDropdownPosition("top");
	// 		else setDropdownPosition("bottom");
	// 	}
	// }, [dropdownOpen, dropdownRect, windowHeight]);

	// useEffect(() => {
	// 	if (dropdownOpen && optionsWrapperRect) {
	// 		const { height, y } = optionsWrapperRect;
	// 		const offset = 10;

	// 		if (y + height + offset >= windowHeight) {
	// 			setDropdownPosition("top");
	// 		} else if (y - height - offset <= 0) {
	// 			setDropdownPosition("bottom");
	// 		} else setDropdownPosition("bottom");
	// 	}
	// }, [dropdownOpen, optionsWrapperRect, windowHeight]);

	return (
		<div className='select'>
			{label && (
				<span className='combobox-label'>
					{label} {required && <span>*</span>}
				</span>
			)}

			<div key={selectKey.current} ref={componentRef} className='p-relative'>
				<div className={fieldClass} style={style} onClick={handleToggleDropdownOpen}>
					{readonly && <div className='combobox-readonly' />}

					{/* <motion.input
						animate={{ height: search ? "100%" : 0, padding: search ? "7.5px 10px" : 0 }}
						transition={{ type: "spring", stiffness: 1000, damping: 5044 }}
						ref={searchRef}
						onChange={handleSearchChange}
						value={!loading ? search : ""}
						type='text'
						className='combobox-search'
						placeholder=''
					/>

					<motion.button
						animate={{ opacity: search ? 1 : 0, zIndex: search ? 10 : -1000 }}
						transition={{ type: "spring", stiffness: 1000, damping: 5044 }}
						ref={searchResetBtnRef}
						className='combobox-reset-btn combobox-reset-btn--search'
						type='button'
						onClick={handleResetSearch}
						children={<Icon icon='erase' />}
					/> */}

					{!loading && values.length > 0 ? (
						<AnimateSharedLayout>
							<AnimatePresence>
								{values.map((val, idx) => (
									<ComboboxValueSlot
										key={idFromValue(val)}
										value={val}
										idx={idx}
										onDissmissValue={handleDismissValue}
										readonly={readonly}
										render={render}
									/>
								))}
							</AnimatePresence>
						</AnimateSharedLayout>
					) : (
						<>&nbsp;</>
					)}

					{/* {((value || (typeof value === "number" && value === 0)) && render(value)) || <>&nbsp;</>} */}

					{values && values.length > 0 && clearable && !loading ? (
						<button
							className='combobox-reset-btn'
							type='button'
							onClick={handleReset}
							children={<ResetIcon />}
						/>
					) : (
						!readonly && <ArrowDown style={arrowDownStyle} onClick={handleArrowDownClick} />
					)}

					<span className='combobox-loader' />
				</div>

				{createPortal(
					<AnimatePresence>
						{dropdownOpen && (
							<motion.div
								ref={dropdownRef}
								initial='initial'
								exit='exit'
								animate='animate'
								variants={variants}
								transition={selectTransition}
								style={selectStyle}
								className='combobox-select'
							>
								<ScrollBar autoHeight autoHeightMax={250} scrollbarRef={scrollbarRef}>
									<div className='py-2 px-5 w-100 d-flex flex-column'>
										{options.length === 0 && optionsEmptyText ? (
											<span className='combobox-option text-center'>{optionsEmptyText}</span>
										) : (
											options.map((option) => {
												const id = idFromValue(option);
												const isSearched = id === (searchedOption && idFromValue(searchedOption));
												const isSelected = selectedOptionsMap[idFromValue(option)];

												return (
													<div
														key={id}
														ref={optionsRefMap[id]}
														className={classnames({
															"combobox-option": true,
															"combobox-option--searched": isSearched,
															"combobox-option--selected": isSelected,
														})}
														onClick={() => handleSelectValue(option)}
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

export default memo(Combobox) as typeof Combobox;
