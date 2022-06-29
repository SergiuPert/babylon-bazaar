import { useEffect, useState } from 'react'
import Button from "./Button";
import ProductAddForm from "./ProductAddForm";
import ProductCard from "./ProductCard";





const ProductList = (props) => {
    const [showForm, setShowForm] = useState(false)
    let [productModels, setProductModels] = useState([])
    //useEffect(() => {
    //    fetch(`https://localhost:7136/Product/FilterByCategory/${props.categoryId}`, { method: "GET", })
    //        .then(response => response.json())
    //        .then((response) => { setProductModels(response) })////////to work ss
    //}, [])

    console.log(props.productModels)
    //const [productModels, setProductModels] = useState([
    //    {
    //        product:
    //        {
    //            Id: 1,
    //            UserId: 1,
    //            Name: "Graphics card",
    //            Price: 10,
    //            Description: "Its just a graphics card man",
    //            Approved: true
    //        },
    //        rating: 5,
    //        supplier: "Johnny boy",
    //        image:
    //        {
    //            Id: 1,
    //            ProductId: 1,
    //            Name: "image name"
    //        },
    //        categories: [
    //            {
    //                Id: 1,
    //                Name: "PC"
    //            },
    //            {
    //                Id: 1,
    //                Name: "Laptops"
    //            }
    //        ]
    //    },
    //    {
    //        product:
    //        {
    //            Id: 2,
    //            UserId: 2,
    //            Name: "Credit card",
    //            Price: 20,
    //            Description: "Its just a credit card man",
    //            Approved: true
    //        },
    //        rating: 5,
    //        supplier: "Me",
    //        image:
    //        {
    //            Id: 2,
    //            ProductId: 2,
    //            Name: "image name2"
    //        },
    //        categories: [
    //            {
    //                Id: 1,
    //                Name: "PC"
    //            },
    //            {
    //                Id: 1,
    //                Name: "Laptops"
    //            }
    //        ]
    //    },
    //    {
    //        product:
    //        {
    //            Id: 3,
    //            UserId: 3,
    //            Name: "Business card",
    //            Price: 100,
    //            Description: "Its just a Business card man",
    //            Approved: true
    //        },
    //        rating: 5,
    //        supplier: "Johnny boy",
    //        image:
    //        {
    //            Id: 3,
    //            ProductId: 3,
    //            Name: "image name"
    //        },
    //        categories: [
    //            {
    //                Id: 1,
    //                Name: "PC"
    //            },
    //            {
    //                Id: 1,
    //                Name: "Laptops"
    //            }
    //        ]
    //    }

    //])
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
            {!showForm && props.productModels.map(productModel =>
                        <ProductCard productModel={productModel} />
                    )
            }
            {!showForm && <Button link={activateForm} text="Add Product" />}
        </div>
    );
}

export default ProductList;