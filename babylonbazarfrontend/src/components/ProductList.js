import { useEffect, useState } from 'react'
import ProductCard from "./ProductCard";
import React from 'react';
import CategoriesButton from "./CategoriesButton";
import Info from "./Info";
import Pagination from "./Pagination";

const ProductList = (props) => {
    let [productModels, setProductModels] = useState([])
    let [page, setPage] = useState(0)
    let [pages, setPages] = useState(-1)
    useEffect(() => {
        (
            async ()=> {
                await fetch(`https://localhost:7136/Product/FilterByCategory/${props.categoryId}?page=${page}`,
                    { method: "GET", })
                    .then(response => response.json())
                    .then((response) => setProductModels(response))
            }
        )();
    }, [props.categoryId, page])
    useEffect(()=>{setPages(productModels.length>0 ? productModels[0].pages : 0)},[productModels])

    return (
        <>
        {productModels.length > 0 &&
            <div className="ProductList">
                <div className="Products">
                    {productModels.map((productModel, index) =>
                        <React.Fragment key={index}>
                            <ProductCard productModel={productModel} selectProduct={props.selectProduct} />
                        </React.Fragment>
                    )}
                </div>
                <div>
                    {pages > 0 &&
                        <Pagination page={page} pages={pages} setPage={setPage}/>
                    }
                </div>
            </div>
        }
        </>
    );
}

export default ProductList;