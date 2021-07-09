import { memo, useState } from "react";
import classnames from "classnames";

import Spinner from "components/Spinner";
import Icon from "components/Icon";

import "./styles.scss";

interface Props {
	url: string;
}

const TableImage: React.FC<Props> = (props) => {
	const { url } = props;
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);

	const handleLoadEnd = () => {
		setIsLoaded(true);
		setError(false);
	};

	const handleLoadStart = () => {
		setIsLoaded(false);
	};

	const handleError = () => {
		setIsLoaded(true);
		setError(true);
	};

	return (
		<div className='w-100 d-flex align-center justify-center'>
			<div
				className={classnames({
					"table-image-wrapper": true,
					"table-image-wrapper--expanded": isExpanded,
				})}
			>
				<img
					src={`${process.env.REACT_APP_FILES_URL}/${url}`}
					alt='Müraciət şəkli'
					className='table-image'
					onLoad={handleLoadEnd}
					onLoadStart={handleLoadStart}
					onError={handleError}
				/>

				{/* <div className='table-image-resize-icon' onClick={() => setIsExpanded((prev) => !prev)}>
					<Icon name={!isExpanded ? "expand" : "compress"} />
				</div> */}

				{!isLoaded && (
					<div className='table-image-spinner-wrapper'>
						<Spinner size={50} />
					</div>
				)}

				{error && (
					<div className='table-image-not-found'>
						<Icon name='no-image' height={50} width={50} />
					</div>
				)}
			</div>
		</div>
	);
};

export default memo(TableImage);
