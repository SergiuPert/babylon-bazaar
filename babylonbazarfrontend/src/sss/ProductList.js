import ProductCard from "./ProductCard";





const ProductList = (props) => {
    const productModels = [
        {
            product:
            {
                Id: 1,
                UserId: 1,
                Name: "Graphics card",
                Price: 10,
                Description: "Its just a graphics card man",
                Approved: true
            },
            rating: 5,
            supplier: "Johnny boy",
            image:
            {
                Id: 1,
                ProductId: 1,
                Name: "image name"
            },
            categories: [
                {
                    Id: 1,
                    Name: "PC"
                },
                {
                    Id: 1,
                    Name: "Laptops"
                }
            ]
        },
        {
            product:
            {
                Id: 2,
                UserId: 2,
                Name: "Credit card",
                Price: 20,
                Description: "Its just a credit card man",
                Approved: true
            },
            rating: 5,
            supplier: "Me",
            image:
            {
                Id: 2,
                ProductId: 2,
                Name: "image name2"
            },
            categories: [
                {
                    Id: 1,
                    Name: "PC"
                },
                {
                    Id: 1,
                    Name: "Laptops"
                }
            ]
        },
        {
            product:
            {
                Id: 3,
                UserId: 3,
                Name: "Business card",
                Price: 100,
                Description: "Its just a Business card man",
                Approved: true
            },
            rating: 5,
            supplier: "Johnny boy",
            image:
            {
                Id: 3,
                ProductId: 3,
                Name: "image name"
            },
            categories: [
                {
                    Id: 1,
                    Name: "PC"
                },
                {
                    Id: 1,
                    Name: "Laptops"
                }
            ]
        }

    ]
    return (
        <div>
            {productModels.map(productModel =>

                <ProductCard productModel={productModel} />
            )}

        </div>
    );
}

export default ProductList;