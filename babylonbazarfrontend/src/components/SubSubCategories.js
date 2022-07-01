import { useEffect, useState } from 'react'
import Button from './Button'

const SubSubCategories = (props) => {
    let result;
    let subSubCategoryClass = "";
    let [subSubCategories, setSubSubCategories] = useState([])

    useEffect(() => {
        fetch(`https://localhost:7136/Product/GetCategoriesGroup/${props.parentId}`, { method: "GET", })
            .then(response => response.json())
            .then((response) => { setSubSubCategories(response) })
    }, [])

    if (props.currentSubCategoryId === props.parentSubCategoryId) {
        subSubCategoryClass = "SubSubCategories";
        result = subSubCategories.map(category =>
            <Button class="SubSubCategoryButton" categoryId={category.id} link={props.changeCategory} text={category.name} />
            )
    }

    return (
        <div className={subSubCategoryClass}>
            {result}
        </div>
    );
}

export default SubSubCategories;