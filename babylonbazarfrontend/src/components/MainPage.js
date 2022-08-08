import ProductList from "./ProductList"
import Sidebar from "./Sidebar"
import ProductDetails from "./ProductDetails"
import { useEffect, useState } from 'react'

const MainPage = (props) => {
    let [categoryId, setCategoryId] = useState(0)
    // jotai - state management
    const changeCategory = (id) => {
        setCategoryId(id)
    }
    let [selectedProductId, setSelectedProductId] = useState(0)
    let result = "";
    const selectProduct = (id) => {
        setSelectedProductId(id)
    }

    // let [product, setProduct] = useState(null)
    // useEffect(() => {
    //     fetch(`https://localhost:7136/Product/ProductDetails/${selectedProductId}`, { method: "GET", })
    //         .then(response => response.json())
    //         .then((response) => { setProduct(response) })
    // }, [selectedProductId])
        if (selectedProductId == 0) {
            result = <ProductList categoryId={categoryId} selectProduct={selectProduct} />
        }
        else {
            // result = <ProductDetails productId={selectedProductId} product={product}  />
            result = <ProductDetails productId={selectedProductId}  />
        }
    return (
        <div className="MainPage">
            <Sidebar changeCategory={changeCategory} selectProduct={selectProduct} />
            {result}
        </div>
    );
}

export default MainPage;