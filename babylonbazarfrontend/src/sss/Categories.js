import SubCategories from "./SubCategories";
import Button from "./Button"
import { useEffect, useState } from 'react'
//import axios from "axios"




const Categories = (props) => {
    //let [thing, setThing] = useState([])
    //useEffect(() => {
    //    fetch(`https://localhost:7136/Product/GetMainCategories`, { method: "GET", })
    //        .then(response => response.json())
    //        .then((response) => { setThing(response) })
    //    },[])

    //console.log(thing)
    let [currentCategoryId, setCurrentCategoryId] = useState(0)
    let [currentSubCategoryId, setCurrentSubCategoryId] = useState(0)
    const categories = [
        {
            id: 1,
            parentId: null,
            name: "Electronics"
        },
        {
            id: 2,
            parentId: null,
            name: "Cars"
        },
        {
            id: 3,
            parentId: null,
            name: "Household"
        },
        {
            id: 4,
            parentId: null,
            name: "Pet"
        }
    ]
    const changeCurrentCategoryId = (id) => {
        setCurrentCategoryId(id)
        setCurrentSubCategoryId(0)
    }
    const changeSubCategoryId = (id) => {
        setCurrentSubCategoryId(id)
    }

    return (
        <div>
            {categories.map(category =>
                <>
                    <h2>{category.name}</h2>
                    <Button categoryId={category.id} link={changeCurrentCategoryId} text={category.name} />
                    <SubCategories parentId={category.id} currentCategoryId={currentCategoryId} currentSubCategoryId={currentSubCategoryId} changeSubCategoryId={changeSubCategoryId} />
                </>
                )}
        </div>
    );
}

export default Categories;