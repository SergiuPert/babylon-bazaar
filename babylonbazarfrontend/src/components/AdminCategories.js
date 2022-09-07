import React, {useState} from 'react';

const AdminCategories = () => {
    let [name, setName] = useState('')

    const addCategory = async (e) => {
        e.preventDefault()
        console.log(name)
        await fetch(`https://localhost:7136/product/addcategory/0?name=${name}`, {
            method: "POST",
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000'},
            body: JSON.stringify({
                name: name
            })
        })
    }



    return (
        <div>
            {/*<h1 className="ProfilePageTitle">c</h1>*/}
            <form onSubmit={addCategory}>
                <label>New Category Name:</label>
                <input className={"InputField"}  type={"text"} onChange={(e) => setName(e.target.value)} />
                <div className={"CategoriesHeaderButton"}>
                    <button className={"CategoriesHeaderButtonText"} type="submit">Add</button>
                </div>
            </form>
        </div>
    );
};

export default AdminCategories;