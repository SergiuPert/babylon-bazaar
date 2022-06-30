import { useEffect, useState } from 'react'
import Button from './Button'




const SubSubCategories = (props) => {
    let [subSubCategories, setSubSubCategories] = useState([])
    useEffect(() => {
        fetch(`https://localhost:7136/Product/GetCategoriesGroup/${props.parentId}`, { method: "GET", })
            .then(response => response.json())
            .then((response) => { setSubSubCategories(response) })
    }, [])

    //const subSubCategories = [
    //    {
    //        id: 100,
    //        parentId: 10,
    //        name: "Laptop"
    //    },
    //    {
    //        id: 210,
    //        parentId: 10,
    //        name: "Desktop"
    //    },
    //    {
    //        id: 300,
    //        parentId: 10,
    //        name: "Mouse"
    //    },
    //    {
    //        id: 400,
    //        parentId: 10,
    //        name: "Keyboard"
    //    }
    //]
    let result;
    if (props.currentSubCategoryId === props.parentSubCategoryId) {
        result = subSubCategories.map(category =>
            <Button class="SubSubCategoryButton" categoryId={category.id} link={props.changeCategory} text={category.name} />
            )
    }
    return (
        <div className="SubCategories">
            {result}
        </div>
    );
}

export default SubSubCategories;