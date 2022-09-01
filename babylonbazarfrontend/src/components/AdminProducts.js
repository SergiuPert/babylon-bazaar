import React from 'react';
import {useEffect, useState} from "react";

const AdminProducts = () => {
    let [products, setProducts] = useState([])
    let [page, setPage] = useState(0)
    let [refresh, setRefresh] = useState(true)
    useEffect(() => {
        fetch(`https://localhost:7136/Product/GetAllProducts/${page}`, { method: "GET" })
            .then(response => response.json())
            .then((response) => { setProducts(response) })
    }, [refresh])

    const switchApproval = (id) => {
        fetch(`https://localhost:7136/Product/SwitchApproval/${id}`, { method: "POST" })
            .then(response => response.json())
            .then((response) => { setRefresh(!refresh) })
    }


    if (products === []) {
        return (
            <div>Loading....</div>
        )
    }
    console.log(products)
    return (
        <div>
            <div className={"TableBorder"}>
                <table>
                    <thead>
                    <tr>
                        <td>Image</td>
                        <td>Name</td>
                        <td>Supplier</td>
                        <td>Description</td>
                        <td>Price</td>
                        <td>Rating</td>
                        <td>Category</td>
                        <td>Status</td>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(product =>
                        <tr>
                            <td>
                                {product.image != null &&
                                    <img className="AdminTablePics" src={"https://localhost:7136/Images/Products/" + product.image.name}></img>
                                }
                                {product.image == null &&
                                    <img className="AdminTablePics" src={require("../images/default-image.jpg")}></img>
                                }
                            </td>
                            <td>{product.product.name}</td>
                            <td>{product.supplier}</td>
                            <td>{product.product.description}</td>
                            <td>{product.product.price}$</td>
                            <td>{product.rating} stars</td>
                            <td>{product.categories.name}</td>
                            {!product.product.aproved &&
                                <td><button className={"NotificationButtonComplete SubCategoryButtonText"} type={"button"} onClick={() => switchApproval(product.product.id)}>Approve</button></td>
                            }
                            {product.product.aproved &&
                                <td><button className={"NotificationButtonComplete SubCategoryButtonText"} type={"button"} onClick={() => switchApproval(product.product.id)}>Reject</button></td>
                            }
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProducts;