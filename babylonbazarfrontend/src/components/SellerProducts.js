import React, {useEffect, useState} from 'react';
import {useAtom} from "jotai";
import {USER_ATOM} from "../STORE";

const SellerProducts = () => {
    let [user] = useAtom(USER_ATOM)
    const [form, setForm] = useState("")
    const userId = user.id

    const [reload, setReload] = useState(true)

    const [id, setId] = useState("")
    const [_name, setName] = useState("")
    const [_price, setPrice] = useState("")
    const [_description, setDescription] =useState("")

    const [selectedProduct, setSelectedProduct] = useState({
        userId: userId,
        name: "",
        price: "",
        description: "",
    })

    let [products, setProducts] = useState([{
        userId: userId,
        name: "",
        price: "",
        description: "",
    }])

    let [pictures, setPictures]=useState([{
        productId:"",
        name:""
    }])

    useEffect(() => {
        fetch(`https://localhost:7136/Product/FilterBySupplier/${user.id}`, { method: "GET", })
            .then(response => response.json())
            .then((response) => { setProducts(response) })
    }, [user.id, reload, _name, _description, _price])

    if (products.name === "") {
        return <div>Loading...</div>
    }

    const addProduct = async (e) => {
        e.preventDefault()
        let res = await fetch('https://localhost:7136/product/AddProduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' },
            body: JSON.stringify({
                userId,
                name: _name,
                price: _price,
                description: _description,
            })
        })
        setReload(!reload)
        setForm("")
    };

    const editProduct = async (e) => {
        e.preventDefault()
        let name= (_name !== "")?_name:selectedProduct.name
        let price=((_price !== "") ? _price : selectedProduct.email)
        let description=((_description !== "") ? _description : selectedProduct.country)
        let res = await fetch('https://localhost:7136/product/EditProduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' },
            body: JSON.stringify({
                id,
                userId,
                name,
                price,
                description,
            })
        }).then(() => {
            setReload(!reload)
            setForm("")

            setName("")
            setPrice("")
            setDescription("")
        })
    };

    const deleteProduct = async (locationId) => {
        await fetch(`https://localhost:7136/product/DeleteProduct/${locationId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' }})
            .then(() => setReload(!reload))
    };

    const refreshForm = () => {
        document.getElementById("form").reset()
    };

    const productPhotos = async (id) => {
            await fetch(`https://localhost:7136/Product/GetProductImages/${user.id}`, { method: "GET", })
                .then(response => response.json())
                .then((response) => { setPictures(response);setForm("Pics") })
        }

    return (
        <div>
            <h1 className="ProfilePageTitle">My Shop</h1>
            <button type={"button"} onClick={() => setForm("Add")} >Add Product</button>
            <table>
                <thead>
                <tr>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Description</td>
                    <td>Photos</td>
                </tr>
                </thead>
                <tbody>
                {products.map(product =>
                    <tr>
                        <td>{product.name} </td>
                        <td>{product.price}</td>
                        <td>{product.description}</td>
                        <td><button type={"button"} onClick={() => { productPhotos(product.id) }}>ManagePhotos</button></td>
                        <td><button type={"button"} onClick={() => {setSelectedProduct(product); setId(product.id); setForm("Edit"); refreshForm()}}>Edit</button></td>
                        <td><button type={"button"} onClick={() => { deleteProduct(product.id) }}>Delete</button></td>
                    </tr>
                )}
                </tbody>
            </table>
            {form === "Add" &&
                <form onSubmit={addProduct}>
                    <h1>Name</h1>
                    <input type={"text"} onChange={e => setName(e.target.value)}/>
                    <h1>Price</h1>
                    <input type={"text"} onChange={e => setPrice(e.target.value)}/>
                    <h1>Description</h1>
                    <input type={"text"} onChange={e => setDescription(e.target.value)}/>
                    <br/>
                    <button type={"submit"}>Submit</button>
                </form>
            }
            {form === "Edit" &&
                <form id="form" onSubmit={editProduct}>
                    <h1>New Name</h1>
                    <input type={"text"} defaultValue={selectedProduct.name} onChange={e => setName(e.target.value)}/>
                    <h1>New Price</h1>
                    <input type={"text"} defaultValue={selectedProduct.price} onChange={e => setPrice(e.target.value)}/>
                    <h1>New Description</h1>
                    <input type={"text"} defaultValue={selectedProduct.description} onChange={e => setDescription(e.target.value)}/>
                    <br/>
                    <button type={"submit"}>Submit</button>
                </form>
            }
            {form === "Pics" &&
                <form id="form" onSubmit={editProduct}>
                    <h1>Cum drak pun lista de poze aici?</h1>
                    <input type={"text"} defaultValue={"broken"} onChange={e => setName(e.target.value)}/>
                    <br/>
                    <button type={"submit"}>Submit</button>
                </form>
            }
        </div>
    );
};

export default SellerProducts;