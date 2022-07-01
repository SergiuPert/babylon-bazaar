import Info from './Info.js'

const ProductCard = (props) => {
    return (
        <div className="ProductCard">
            <div style={{ paddingBottom: "3%" }}>
                {props.productModel.categories.map(category =>
                    <span>{category.name}  </span>
                )}
                <span style={{ fontWeight:"bold", fontSize:"larger" }}>{props.productModel.product.name}</span>
            </div>
            <div style={{ paddingBottom: "3%" }}>
                <Info text="Sold by: " /><h3 style={{ display: "inline"}}>{props.productModel.supplier}</h3>
            </div>
            <h5>Image: {props.productModel.image.name}</h5>
            <div style={{ display: "flex", alignContent: "space-between", paddingLeft:"10%" }}>
                <h2 style={{ display: "inline", paddingLeft:"10%"}}>{props.productModel.product.price}$</h2>
                <h4 style={{ display: "inline", paddingLeft:"30%"}}>Rating:<br/> {props.productModel.rating}</h4>
            </div>
            <h4>{props.productModel.product.description}</h4>
        </div>
    );
}

export default ProductCard;