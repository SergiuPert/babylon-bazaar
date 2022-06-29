







const ProductCard = (props) => {
    return (
        <div style={{ borderStyle: "solid", borderColor: "black" }}>
            <h1>Name: {props.productModel.product.Name}</h1>
            <h2>Price: {props.productModel.product.Price}</h2>
            <h4>Description: {props.productModel.product.Description}</h4>
            <h4>Rating: {props.productModel.rating}</h4>
            <h3>Supplier: {props.productModel.supplier}</h3>
            <h5>Image: {props.productModel.image.Name}</h5>
            <div style={{ display: "flex" }}>
                <h3>Categories: </h3>
                {props.productModel.categories.map(category =>
                    <h3>{category.Name}, </h3>
                    )}
            </div>
        </div>
    );
}

export default ProductCard;