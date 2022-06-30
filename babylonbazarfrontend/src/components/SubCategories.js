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
    //const subCategories = [
    //    {
    //        id: 10,
    //        parentId: 1,
    //        name: "PC"
    //    },
    //    {
    //        id: 21,
    //        parentId: 1,
    //        name: "Kitchen"
    //    },
    //    {
    //        id: 30,
    //        parentId: 1,
    //        name: "Sport Cars"
    //    },
    //    {
    //        id: 40,
    //        parentId: 1,
    //        name: "Kitchen Supplies"
    //    }
    //]

//                <h4>{subCategory.name}</h4>

    let currentSubCategoryId = props.currentSubCategoryId;
    let subSubCategories;
    if (props.parentId === props.currentCategoryId) {
        subSubCategories = subCategories.map(subCategory =>
            <>
                <Button class="SubCategoryButton" categoryId={subCategory.id} link={props.changeSubCategoryId} text={subCategory.name} />
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