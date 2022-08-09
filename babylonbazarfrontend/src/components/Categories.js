import SubCategories from "./SubCategories";
import CategoriesButton from "./CategoriesButton"
import { useEffect, useState } from 'react'
import React from 'react';

const Categories = (props) => {
    let [categories, setCategories] = useState([])
    useEffect(() => {
        fetch(`https://localhost:7136/Product/GetCategoriesGroup`, { method: "GET", })
            .then(response => response.json())
            .then((response) => { setCategories(response) })
    }, [])

    let [currentCategoryId, setCurrentCategoryId] = useState(0)
    let [currentSubCategoryId, setCurrentSubCategoryId] = useState(0)

    const changeCurrentCategoryId = (id) => {
        setCurrentCategoryId(id)
        setCurrentSubCategoryId(0)
    }
    const changeSubCategoryId = (id) => {
        setCurrentSubCategoryId(id)
    }

    return (
        <div>
            {categories.map((category, index) =>
                <React.Fragment key={index}>
                    <CategoriesButton buttonStyle="CategoriesHeaderButton" buttonTextStyle="CategoriesHeaderButtonText" categoryId={category.id} link={changeCurrentCategoryId} text={category.name} />
                    <SubCategories changeCategory={props.changeCategory} parentId={category.id} currentCategoryId={currentCategoryId} currentSubCategoryId={currentSubCategoryId} changeSubCategoryId={changeSubCategoryId} selectProduct={props.selectProduct} />
                </React.Fragment>
                )}
        </div>
    );
}

export default Categories;