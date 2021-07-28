import { memo } from "react";

import Image from "components/Image";

import useFileUrl from "hooks/useFileUrl";

import "./styles.scss";

interface Props {
	url: string;
	height: number;
	width: number;
}

const TableImage: React.FC<Props> = (props) => {
	const { url } = props;
	const imageURL = useFileUrl(url);

	return (
		<div className='w-100 d-flex align-center justify-center'>
			<div className='table-image-wrapper'>
				<Image src={imageURL} className='table-image' />
			</div>
		</div>
	);
};

export default memo(TableImage);
