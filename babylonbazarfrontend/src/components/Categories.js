import SubCategories from "./SubCategories";
import Button from "./Button"
import { useEffect, useState } from 'react'
//import axios from "axios"




const Categories = (props) => {
    let [categories, setCategories] = useState([])
    useEffect(() => {
        fetch(`https://localhost:7136/Product/GetCategoriesGroup`, { method: "GET", })
            .then(response => response.json())
            .then((response) => { setCategories(response) })
        },[])

    let [currentCategoryId, setCurrentCategoryId] = useState(0)
    let [currentSubCategoryId, setCurrentSubCategoryId] = useState(0)
    
    const changeCurrentCategoryId = (id) => {
        setCurrentCategoryId(id)
        setCurrentSubCategoryId(0)
    }
    const changeSubCategoryId = (id) => {
        setCurrentSubCategoryId(id)
    }
//                    <h2>{category.name}</h2>

    return (
        <div>
            {categories.map(category =>
                <>
                    <Button class="CategoriesHeaderButton" categoryId={category.id} link={changeCurrentCategoryId} text={category.name} />
                    <SubCategories changeCategory={props.changeCategory} parentId={category.id} currentCategoryId={currentCategoryId} currentSubCategoryId={currentSubCategoryId} changeSubCategoryId={changeSubCategoryId} />
                </>
                )}
        </div>
    );
}

export default Categories;