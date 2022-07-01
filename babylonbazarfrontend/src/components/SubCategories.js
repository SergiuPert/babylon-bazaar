import Button from "./Button";
import SubSubCategories from "./SubSubCategories"
import { useEffect, useState } from 'react'

const SubCategories = (props) => {
    let [subCategories, setSubCategories] = useState([])
    useEffect(() => {
        fetch(`https://localhost:7136/Product/GetCategoriesGroup/${props.parentId}`, { method: "GET", })
            .then(response => response.json())
            .then((response) => { setSubCategories(response) })
    }, [])

    let currentSubCategoryId = props.currentSubCategoryId;
    let subSubCategories;
    if (props.parentId === props.currentCategoryId) {
        subSubCategories = subCategories.map(subCategory =>
            <>
                <Button buttonStyle="SubCategoryButton" buttonTextStyle="SubCategoryButtonText" categoryId={subCategory.id} link={props.changeSubCategoryId} text={subCategory.name} />
                <SubSubCategories changeCategory={props.changeCategory} parentId={subCategory.id} currentSubCategoryId={currentSubCategoryId} parentSubCategoryId={subCategory.id} />
            </>
        )
    }

    return (
        <div>
            {subSubCategories}
        </div>
    );
}

export default SubCategories;