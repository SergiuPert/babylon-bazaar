import { useEffect, useState } from 'react'
import ProductCard from "./ProductCard";
import React from 'react';

const ProductList = (props) => {
    const [showForm, setShowForm] = useState(false)
    let [productModels, setProductModels] = useState([])
    useEffect(() => {
        fetch(`https://localhost:7136/Product/FilterByCategory/${props.categoryId}`,
            { method: "GET", })
            .then(response => response.json())
            .then((response) => { setProductModels(response) })////////to work ss
    }, [props.categoryId])

    return (
        <div className="ProductList">

            {productModels.map((productModel, index) =>
                    <React.Fragment key={index}>
                        <ProductCard productModel={productModel} selectProduct={props.selectProduct} />
                    </React.Fragment>
                )
            }
        </div>
    );
}

export default ProductList;