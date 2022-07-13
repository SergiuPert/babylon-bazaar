import { useEffect, useState } from 'react'
import Button from './Button'
import React from 'react';

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
        result = subSubCategories.map((category, index) =>
                <React.Fragment key={index} >
                    <div onClick={() => props.selectProduct(0)}>
                        <Button class="SubSubCategoryButton" categoryId={category.id} link={props.changeCategory} text={category.name} onClick={() => props.selectProduct(0)} />
                    </div>
                </React.Fragment>
            )
    }

    return (
        <div className={subSubCategoryClass}>
            {result}
        </div>
    );
}

export default SubSubCategories;