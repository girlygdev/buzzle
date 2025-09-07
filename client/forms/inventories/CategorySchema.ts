 import * as Yup from 'yup';

 const CategorySchema = Yup.object().shape({
	title: Yup.string().required('Title is required.').max(250)
 })

 export default CategorySchema