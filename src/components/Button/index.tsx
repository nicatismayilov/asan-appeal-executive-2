import { useMemo, memo, CSSProperties } from "react";
import classnames from "classnames";

import Spinner from "../Spinner";

import "./styles.scss";

interface Props {
	text?: string;
	style?: React.CSSProperties;
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	loading?: boolean;
	customClassName?: string;
	backgroundColor?: string;
	color?: string;
	border?: string;
	loadingColor?: string;
	disabled?: boolean;
	size?: "small" | "default" | "large";
}

const Button: React.FC<Props & React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
	const {
		text,
		style,
		loading = false,
		customClassName = "",
		backgroundColor = "",
		color = "",
		border = "none",
		disabled = false,
		children,
		size = "default",
		...rest
	} = props;
	const { onClick } = props;

	// classes
	const buttonClass = useMemo(() => {
		return classnames({
			[customClassName + " button"]: true,
			"button--loading": loading,
			"button-disabled": disabled || loading,
			[`button-size--${size}`]: true,
		});
	}, [customClassName, loading, disabled, size]);
	//

	// inline styles
	const buttonStyles = useMemo<CSSProperties>(() => {
		return { ...style, backgroundColor, color, border };
	}, [backgroundColor, style, color, border]);

	return (
		<button
			className={buttonClass}
			onClick={onClick}
			style={buttonStyles}
			{...rest}
			disabled={disabled || loading}
		>
			{loading && (
				<div className='button-loader-wrapper'>
					<Spinner size={25} />
				</div>
			)}

			{text}

			{children}
		</button>
	);
};

export default memo(Button);
