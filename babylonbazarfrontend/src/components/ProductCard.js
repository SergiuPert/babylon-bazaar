import Info from './Info.js'
import CategoriesButton from "./CategoriesButton";
// import Stars from "./Stars";
import StarRatings from "react-star-ratings";

const ProductCard = (props) => {
    const images = ["pc1.jpg", "pc2.png", "vase1.jpg", "vase2.jpg", "potatoes.jpg", "tomatoes.jpg", "wheel.jpg"]
    let emptyColor = '#b6b4b4'
    let ratedColor = '#e3a303'


    const addToCart = async (productId) => {await fetch(`https://localhost:7136/order/addtocart/${productId}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000'},
        credentials: "include"
    })}


    return (
        <div className="ProductCard">
            <div onClick={() => props.selectProduct(props.productModel.product.id)}>
                <img className="cardImage" src={"https://localhost:7136/Images/Products/" + props.productModel.image.name}></img>
            <div className="test">
                <span className="ProductCardText">{props.productModel.product.name}</span>
            </div>
            <div>
                <span className="ProductCardText" style={{paddingRight: "3vw"}}>{props.productModel.supplier}</span>
                {/*<Stars rating={props.productModel.rating} />*/}
                <StarRatings rating={props.productModel.rating} starDimension="1vw" starSpacing="0.01vw"  starRatedColor={ratedColor} starEmptyColor={emptyColor} />
                <span className="ProductCardText">({props.productModel.rating})</span>
            </div>
                <span className="ProductCardText">Price: {props.productModel.product.price}$</span>
            </div>
            <CategoriesButton buttonStyle="AddButton" buttonTextStyle="AddButtonText" link={addToCart} categoryId={props.productModel.product.id} text="Add" />
        </div>
    );
}

export default ProductCard;