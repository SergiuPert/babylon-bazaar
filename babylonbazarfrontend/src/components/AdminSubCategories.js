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
                <select className={"InputField"} onChange={(e) => setCategoryId(e.target.value)} required={true}>
                    <option></option>
                    {categories.map(category =>
                        <option className={"blackText"} value={category.id}>{category.name}</option>
                    )}
                </select>
                <label>New Category Name:</label>
                <input type={"text"} onChange={(e) => setName(e.target.value)} />
                <button type={"submit"}>Add</button>
            </form>
        </div>
    );
};

export default AdminSubCategories;