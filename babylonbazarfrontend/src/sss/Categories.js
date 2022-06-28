import SubCategories from "./SubCategories";





const Categories = (props) => {
    let currentCategoryId = 2;
    let currentSubCategoryId = 30;
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
    return (
        <div>
            {categories.map(category =>
                <>
                    <h2>{category.name}</h2>
                    <SubCategories parentId={category.id} currentCategoryId={currentCategoryId} currentSubCategoryId={currentSubCategoryId} />
                </>
                )}
        </div>
    );
}

export default Categories;