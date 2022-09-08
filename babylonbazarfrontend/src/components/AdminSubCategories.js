import React from 'react';
import {useEffect, useState} from "react";

const AdminSubCategories = () => {
    let [name, setName] = useState('')

    let [categories, setCategories] = useState("")
    let [categoryId, setCategoryId] = useState(0)
    useEffect(() => {
        fetch(`https://localhost:7136/Product/GetCategoriesGroup`, { method: "GET", })
            .then(response => response.json())
            .then((response) => { setCategories(response) })
    }, [])




    const addCategory = async (e) => {
        e.preventDefault()
        console.log(name)
        await fetch(`https://localhost:7136/product/addcategory/${categoryId}?name=${name}`, {
            method: "POST",
            credentials: 'include',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000'},
            body: JSON.stringify({
                name: name
            })
        })
    }

    if (categories === "") {
        return (
            <div>Loading....</div>
        )
    }

    return (
        <div>
            <form onSubmit={addCategory}>
                <h2 className={"CategoriesAddHeadings"}>Main Category:</h2>
                <select className={"InputField"} onChange={(e) => setCategoryId(e.target.value)} required={true}>
                    <option></option>
                    {categories.map(category =>
                        <option className={"blackText"} value={category.id}>{category.name}</option>
                    )}
                </select>
                <br/>
                <h2 className={"CategoriesAddHeadings"}>New Category Name:</h2>
                <input className={"InputField"}  type={"text"} onChange={(e) => setName(e.target.value)} />
                <br/>
                <br/>
                <div className={"CategoriesHeaderButton"}>
                    <button className={"CategoriesHeaderButtonText"} type="submit">Add</button>
                </div>
            </form>
        </div>
    );
};

export default AdminSubCategories;