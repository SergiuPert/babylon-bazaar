import { useEffect, useState } from 'react'
import ProductCard from "./ProductCard";
import React from 'react';
import CategoriesButton from "./CategoriesButton";

const ProductList = (props) => {
    let [productModels, setProductModels] = useState([])
    let [page, setPage] = useState(0)
    let [pages, setPages] = useState(0)
    useEffect(() => {
        fetch(`https://localhost:7136/Product/FilterByCategory/${props.categoryId}?page=${page}`,
            { method: "GET", })
            .then(response => response.json())
            .then((response) => { setProductModels(response) })
            .then(() => setPages(productModels.length>0 ? productModels[0].pages : 0))
    }, [props.categoryId, page])

    return (
        <div className="ProductList">

            {productModels.map((productModel, index) =>
                    <React.Fragment key={index}>
                        <ProductCard productModel={productModel} selectProduct={props.selectProduct} />
                    </React.Fragment>
                )
            }
            {productModels.length > 0 &&
                <div className={"Flex"}>
                    {/*{page > 0 &&*/}
                    {/*    <div className={"CategoriesHeaderButton"} onClick={() => setPage(page - 1)}>*/}
                    {/*        <button className={"CategoriesHeaderButtonText"} > Previous </button>*/}
                    {/*    </div>*/}
                    {/*}*/}
                    {/*{page < pages &&*/}
                    {/*    // <div className={"CategoriesHeaderButton"} onClick={() => setPage(page + 1)}>*/}
                    {/*    //     <button className={"CategoriesHeaderButtonText"} > Next </button>*/}
                    {/*        <CategoriesButton buttonTextStyle={"CategoriesHeaderButton"} buttonStyle={"CategoriesHeaderButtonText"} link={setPage} categoryId={page+1} text={"Next"} />*/}
                    {/*    // </div>*/}
                    {/*}*/}
                    {/*<CategoriesButton buttonTextStyle={"CategoriesHeaderButton"} buttonStyle={"CategoriesHeaderButtonText"} link={setPage} categoryId={page+1} text={"Next"} />*/}
                    {/*PAGINATION!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/}
                </div>
            }

        </div>
    );
}

export default ProductList;