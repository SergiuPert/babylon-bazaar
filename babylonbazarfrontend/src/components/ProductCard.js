







const ProductCard = (props) => {
    return (
        <div className="ProductCard">
            <h1>Name: {props.productModel.product.name}</h1>
            <h2>Price: {props.productModel.product.price}</h2>
            <h4>Description: {props.productModel.product.description}</h4>
            <h4>Rating: {props.productModel.rating}</h4>
            <h3>Supplier: {props.productModel.supplier}</h3>
            <h5>Image: {props.productModel.image.name}</h5>

            <span>
                <h3>Categories: </h3>

                {props.productModel.categories.map(category =>
                    <span>{category.name}</span>
                    )}
            </span>
        </div>
    );
}

export default ProductCard;