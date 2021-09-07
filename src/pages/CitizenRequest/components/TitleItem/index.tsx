import "./styles.scss";

interface Props {
	label: string;
	text: string;
}

const TitleItem: React.FC<Props> = (props) => {
	const { label, text } = props;

	return (
		<div className='title-item'>
			<div className='title-item-label'>{label}</div>
			<div className='title-item-text'>{text}</div>
		</div>
	);
};

export default TitleItem;
