import Info from './Info.js'

const ProductCard = (props) => {
    const images = ["pc1.jpg", "pc2.png", "vase1.jpg", "vase2.jpg", "potatoes.jpg", "tomatoes.jpg", "wheel.jpg"]
    return (
        <div className="ProductCard" onClick={() => props.selectProduct(props.productModel.product.id)}>
            <img className="cardImage" src={require(`../images/${images[Math.floor(Math.random()*images.length)]}`)}></img>
            <div>
                <span style={{ fontWeight:"bold", fontSize:"larger" }}>{props.productModel.product.name}</span>
            </div>
            <div style={{ display: "flex", alignContent: "space-between", paddingLeft:"25%" }}>
                <span style={{ fontWeight:"bold", fontSize:"larger" }}>{props.productModel.supplier}</span>
                {/*<h4 style={{ paddingLeft: "10%"}}>Rating: {props.productModel.rating}</h4>*/}
                <span style={{ fontWeight:"bold", fontSize:"larger", paddingLeft: "20%" }}>Rating: {props.productModel.rating}</span>
            </div>
                <span style={{ fontWeight:"bold", fontSize:"larger" }}>{props.productModel.product.price}$</span>
            <br/>
            <button>Add</button>
        </div>
    );
}

export default ProductCard;