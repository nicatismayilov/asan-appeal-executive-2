import { useSelector } from "react-redux";

import { selectCategories, selectCategoriesLoading } from "store/categories/selectors";

import TreeSelect from "components/TreeSelect";

import { Category } from "types/category";

type Value = Category | undefined;

interface Props {
	value: Value;
	onChange: (value: Value) => void;
	active: boolean;
}

const categoryIdFromValue = (s: Category) => s.id.toString();

const categoryRender = (s: Category) => s.name;

const CategorySelect: React.FC<Props> = (props) => {
	const { value, onChange, active } = props;
	const categories = useSelector(selectCategories);
	const categoriesLoading = useSelector(selectCategoriesLoading);

	if (!active) return null;

	return (
		<div className='col-12 col-md-6 col-lg-3'>
			<TreeSelect
				options={categories}
				loading={categoriesLoading}
				childrenKey='subCategories'
				value={value}
				idFromValue={categoryIdFromValue}
				render={categoryRender}
				onChange={onChange}
				clearable
				name='categoryId'
				label='Müraciət təsnifatı'
				dropdownWidth='50vw'
			/>
		</div>
	);
};

export default CategorySelect;
