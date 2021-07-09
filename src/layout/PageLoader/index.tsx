import Spinner from "components/Spinner";

import "./styles.scss";

const PageLoader: React.FC = () => {
	return (
		<div className='page-loader'>
			<Spinner size={65} />
		</div>
	);
};

export default PageLoader;
