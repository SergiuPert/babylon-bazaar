import ProductList from "./ProductList"
import Sidebar from "./Sidebar"
import { useEffect, useState } from 'react'







const MainPage = (props) => {
    let [categoryId, setCategoryId] = useState(0)

    let [productModels, setProductModels] = useState([])

    const changeCategory = (id) => {
        setCategoryId(id)
        console.log("the current subsubcat is: " + id)
        fetch(`https://localhost:7136/Product/FilterByCategory/${categoryId}`, { method: "GET", })
            .then(response => response.json())
            .then((response) => { setProductModels(response) })
    }

    return (
        <div style={{ display: "flex" }}>
            <Sidebar changeCategory={changeCategory} />
            <ProductList productModels={productModels} categoryId={categoryId} />
        </div>
    );
}

export default MainPage;