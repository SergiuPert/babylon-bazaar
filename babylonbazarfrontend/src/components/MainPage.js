import ProductList from "./ProductList"
import Sidebar from "./SideBar"
import { useEffect, useState } from 'react'







const MainPage = (props) => {
    let [categoryId, setCategoryId] = useState(0)

    const changeCategory = (id) => {
        setCategoryId(id)
    }

    return (
        <div style={{ display: "flex" }}>
            <Sidebar changeCategory={changeCategory} />
            <ProductList categoryId={categoryId} />
        </div>
    );
}

export default MainPage;