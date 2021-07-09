import "./styles.scss";

interface Props {
	size?: number;
}

const Spinner: React.FC<Props> = (props) => {
	const { size = 37 } = props;

	return (
		<div className='spinner' style={{ height: size, width: size }}>
			{[...Array(12)].map((_, idx) => (
				<div
					key={`bar-${idx + 1}`}
					className={`bar${idx + 1}`}
					style={{ width: size / 11.41, height: size / 4.28 }}
				/>
			))}
		</div>
	);
};

export default Spinner;
