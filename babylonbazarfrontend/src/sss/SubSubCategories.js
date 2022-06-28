


const SubSubCategories = (props) => {
    const subSubCategories = [
        {
            id: 100,
            parentId: 10,
            name: "Laptop"
        },
        {
            id: 210,
            parentId: 10,
            name: "Desktop"
        },
        {
            id: 300,
            parentId: 10,
            name: "Mouse"
        },
        {
            id: 400,
            parentId: 10,
            name: "Keyboard"
        }
    ]
    let result;
    if (props.currentSubCategoryId === props.parentSubCategoryId) {
        result = subSubCategories.map(category =>
            <p>{category.name}</p>
            )
    }
    return (
        <div>
            {result}
        </div>
    );
}

export default SubSubCategories;







