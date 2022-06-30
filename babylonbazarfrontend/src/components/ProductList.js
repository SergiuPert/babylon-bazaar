import { useEffect, useState } from 'react'
import Button from "./Button";
import ProductAddForm from "./ProductAddForm";
import ProductCard from "./ProductCard";





const ProductList = (props) => {
    const [showForm, setShowForm] = useState(false)
    let [productModels, setProductModels] = useState([])
    useEffect(() => {
        fetch(`https://localhost:7136/Product/FilterByCategory/${props.categoryId}`, { method: "GET", })
            .then(response => response.json())
            .then((response) => { setProductModels(response) })////////to work ss
    })

    const add = (product) => {
        const id = productModels.length
        let newProduct =
        {
            product:
            {
                Id: id,
                UserId: 1,
                Name: product.name,
                Price: product.price,
                Description: product.description,
                Approved: true
            },
            rating: 0,
            supplier: product.supplier,
            image:
            {
                Id: Math.floor(Math.random() * 10000) + 1,
                ProductId: id,
                Name: product.image
            },
            categories: [
                {
                    Id: 5000,
                    Name: "New Category"
                },
                {
                    Id: 5000,
                    Name: "New Category2"
                }
            ]
        }
        setProductModels([...productModels, newProduct])
        activateForm()
    }
    const activateForm = () => {
        setShowForm(!showForm)
    }
    return (
        <div>
            {showForm && <ProductAddForm add={add} />}
            {!showForm && productModels.map(productModel =>
                        <ProductCard productModel={productModel} />
                    )
            }
            {!showForm && <Button link={activateForm} text="Add Product" />}
        </div>
    );
}

export default ProductList;