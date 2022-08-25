import React, {useEffect, useState} from 'react';
import {useAtom} from "jotai";
import {USER_ATOM} from "../STORE";
import axios from "axios";

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

    let [products, setProducts] = useState([])

    let [pictures, setPictures]=useState([])
    let [file, setFile] = useState()
    let [image, setImage] = useState("")


    useEffect(() => {
        fetch(`https://localhost:7136/Product/GetProductImages/${id}`, {method: "GET"})
            .then(response => response.json())
            .then((response) => { setPictures(response) })
    }, [id, reload])


    useEffect(() => {
        fetch(`https://localhost:7136/Product/FilterBySupplier/${user.id}`, { method: "GET", })
            .then(response => response.json())
            .then((response) => { setProducts(response) })
    }, [user.id, reload, _name, _description, _price])

    let [categories, setCategories] = useState("")
    let [categoryId, setCategoryId] = useState("")
    useEffect(() => {
        fetch(`https://localhost:7136/Product/GetCategoriesGroup`, { method: "GET", })
            .then(response => response.json())
            .then((response) => { setCategories(response) })
    }, [])

    let [subCategories, setSubCategories] = useState("")
    let [subCategoryId, setSubCategoryId] = useState("")
    useEffect(() => {
        fetch(`https://localhost:7136/Product/GetCategoriesGroup/${categoryId}`, { method: "GET", })
            .then(response => response.json())
            .then((response) => { setSubCategories(response) })
    }, [categoryId])

    let [subSubCategories, setSubSubCategories] = useState("")
    let [subSubCategoryId, setSubSubCategoryId] = useState("")
    useEffect(() => {
        fetch(`https://localhost:7136/Product/GetCategoriesGroup/${subCategoryId}`, { method: "GET", })
            .then(response => response.json())
            .then((response) => { setSubSubCategories(response) })
    }, [subCategoryId])


    // if (products.length === 0) {
    //     return <div>Loading...</div>
    // }

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
                subSubCategoryId
            })
        })
        setReload(!reload)
        setForm("")
    };

    const editProduct = async (e) => {
        e.preventDefault()
        let name= (_name !== "")?_name:selectedProduct.name
        let price=((_price !== "") ? _price : selectedProduct.price)
        let description=((_description !== "") ? _description : selectedProduct.description)
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
            .then(() => {setReload(!reload); setForm("")})
    };

    const refreshForm = () => {
        document.getElementById("content").reset()
    };

    const getImage=(image)=>{setFile(image);setImage(image.name)}
    const uploadWithFormData = async ()=>{
        const formData = new FormData();
        formData.append("target", "Products");
        formData.append("_file", file);
        console.log(formData["_file"]);
        submitForm("multipart/form-data", formData, (msg) => console.log(msg));
    }
    const submitForm = (contentType, data, setResponse) => {
        axios({
            url: `https://localhost:7136/user/savephoto`,
            method: 'POST',
            data: data,
            headers: {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        }).then((response) => { setResponse(response.data);
        }).catch((error) => { setResponse(error);
        })
    }

    const submit = async (e) => {
        e.preventDefault()
        if (image !== "") { await uploadWithFormData()}
        const credentials = await fetch('https://localhost:7136/product/addproductimage', {
            method: "POST",
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000'},
            body: JSON.stringify({
                productId: id,
                name: image
            })
        })
        setReload(!reload)
    }

    const deleteImage = async (imageId) => {
        await fetch(`https://localhost:7136/product/DeleteProductImage/${imageId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' }})
            .then(() => setReload(!reload))
    };


    return (
        <div id="content">
            <h1 className="ProfilePageTitle">My Shop</h1>
            <button className={"CategoriesHeaderButton CategoriesHeaderButtonText"} type={"button"} onClick={() => setForm("Add")} >Add</button>
            <div className={"TableBorder"}>
                <table >
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
                            <td>{product.product.name} </td>
                            <td>{product.product.price}</td>
                            <td>{product.product.description}</td>
                            <td><button className={"CategoriesHeaderButton CategoriesHeaderButtonText TableButton"} type={"button"} onClick={() => { setId((product.product.id)); setForm("Pics"); refreshForm()}}>Manage</button></td>
                            <td><button className={"CategoriesHeaderButton CategoriesHeaderButtonText TableButton"} type={"button"} onClick={() => { setSelectedProduct(product.product); setId(product.product.id); setForm("Edit"); refreshForm()}}>Edit</button></td>
                            <td><button className={"CategoriesHeaderButton CategoriesHeaderButtonText TableButton"} type={"button"} onClick={() => { deleteProduct(product.product.id); refreshForm() }}>Delete</button></td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            {form === "Add" &&
                <form id="form" onSubmit={addProduct}>
                    <h1>Name</h1>
                    <input className={"InputField"} type={"text"} onChange={e => setName(e.target.value)} required={true}/>
                    <h1>Price</h1>
                    <input className={"InputField"} type={"number"} onChange={e => setPrice(e.target.value)} required={true}/>
                    <h1>Description</h1>
                    <input className={"InputField"} type={"text"} onChange={e => setDescription(e.target.value)} required={true}/>
                    {/*<br/>*/}
                    <h2>Main Category</h2>
                    <select className={"InputField"} onChange={(e) => setCategoryId(e.target.value)} required={true}>
                        <option></option>
                        {categories.map(category =>
                            <option className={"blackText"} value={category.id}>{category.name}</option>
                        )}
                    </select>
                    {categoryId !== "" &&
                        <>
                            <h2>Sub-Category</h2>
                            <select className={"InputField"} onChange={(e) => setSubCategoryId(e.target.value)} required={true}>
                            <option></option>
                                {subCategories.map(subCategory =>
                                    <option className={"blackText"} value={subCategory.id}>{subCategory.name}</option>
                                )}
                            </select>
                        </>
                    }
                    {subCategoryId !== "" &&
                        <>
                            <h2>Sub-Sub-Category</h2>
                            <select className={"InputField"} onChange={(e) => setSubSubCategoryId(e.target.value)} required={true}>
                            <option></option>
                                {subSubCategories.map(subSubCategory =>
                                    <option className={"blackText"} value={subSubCategory.id}>{subSubCategory.name}</option>
                                )}
                            </select>
                        </>
                    }
                    <br/>
                    <button className={"CategoriesHeaderButton CategoriesHeaderButtonText"} type={"submit"}>Submit</button>
                </form>
            }
            {form === "Edit" &&
                <form id="form" onSubmit={editProduct}>
                    <h1>New Name</h1>
                    <input className={"InputField"} type={"text"} defaultValue={selectedProduct.name} onChange={e => setName(e.target.value)}/>
                    <h1>New Price</h1>
                    <input className={"InputField"} type={"text"} defaultValue={selectedProduct.price} onChange={e => setPrice(e.target.value)}/>
                    <h1>New Description</h1>
                    <input className={"InputField"} type={"text"} defaultValue={selectedProduct.description} onChange={e => setDescription(e.target.value)}/>
                    <br/>
                    <button className={"CategoriesHeaderButton CategoriesHeaderButtonText"} type={"submit"}>Submit</button>
                </form>
            }
            {form === "Pics" &&
                <>
                    <br/>
                    <div className={"TableBorder"}>
                        <table>
                            <thead>
                            </thead>
                            <tbody>
                            {pictures.map(picture =>
                                <tr>
                                  <td><img className={"productPicturesInForm"} src={"https://localhost:7136/Images/Products/" + picture.name} /></td>
                                  <td><button className={"CategoriesHeaderButton CategoriesHeaderButtonText TableButton"} onClick={() => deleteImage(picture.id)}>Delete</button></td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <br/>
                    <form onSubmit={submit}>
                        <input className={"InputField"} type="file" onChange={e => getImage(e.target.files[0])}  />
                        <br/>
                        <button className={"CategoriesHeaderButton CategoriesHeaderButtonText"} type="submit">Upload</button>
                    </form>
                </>
            }
        </div>
    );
};

export default SellerProducts;