import Info from './Info.js'
import Button from "./Button";
// import Stars from "./Stars";
import StarRatings from "react-star-ratings";

const ProductCard = (props) => {
    const images = ["pc1.jpg", "pc2.png", "vase1.jpg", "vase2.jpg", "potatoes.jpg", "tomatoes.jpg", "wheel.jpg"]
    let emptyColor = '#b6b4b4'
    let ratedColor = '#e3a303'
    return (
        <div className="ProductCard" onClick={() => props.selectProduct(props.productModel.product.id)}>
                <img className="cardImage" src={require(`../images/${images[Math.floor(Math.random()*images.length)]}`)}></img>
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
            <br/>
            <Button buttonStyle="AddButton" buttonTextStyle="AddButtonText" link="" text="Add" />
        </div>
    );
}

export default ProductCard;