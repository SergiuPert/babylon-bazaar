import SubCategories from "./SubCategories";
import Button from "./Button"
import { useEffect, useState } from 'react'

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
            {categories.map((category, i) =>
                <Fragment key={i}>
                    <Button buttonStyle="CategoriesHeaderButton" buttonTextStyle="CategoriesHeaderButtonText" categoryId={category.id} link={changeCurrentCategoryId} text={category.name} />
                    <SubCategories changeCategory={props.changeCategory} parentId={category.id} currentCategoryId={currentCategoryId} currentSubCategoryId={currentSubCategoryId} changeSubCategoryId={changeSubCategoryId} />
                </Fragment>
                )}
        </div>
    );
}

export default Categories;