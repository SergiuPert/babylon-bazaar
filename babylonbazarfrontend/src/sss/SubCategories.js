import Button from "./Button";
import SubSubCategories from "./SubSubCategories"


const SubCategories = (props) => {
    const subCategories = [
        {
            id: 10,
            parentId: 1,
            name: "PC"
        },
        {
            id: 21,
            parentId: 1,
            name: "Kitchen"
        },
        {
            id: 30,
            parentId: 1,
            name: "Sport Cars"
        },
        {
            id: 40,
            parentId: 1,
            name: "Kitchen Supplies"
        }
    ]


    let currentSubCategoryId = props.currentSubCategoryId;
    let subSubCategories;
    if (props.parentId === props.currentCategoryId) {
        subSubCategories = subCategories.map(subCategory =>
            <>
                <h4>{subCategory.name}</h4>
                <Button categoryId={subCategory.id} link={props.changeSubCategoryId} text={subCategory.name} />
                <SubSubCategories currentSubCategoryId={currentSubCategoryId} parentSubCategoryId={subCategory.id} />
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