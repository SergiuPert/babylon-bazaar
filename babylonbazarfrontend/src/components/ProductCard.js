import React from 'react';

class ProductCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>{this.props.Name}</h1>
                <div>
                    <img src={this.props.Image}/>
                    <p>{this.props.Description}</p>
                 </div>
                <div>
                    <h3>{this.props.Price}...
                    <span>{this.props.Rating}</span></h3>
                </div>
            </div>
        );
    }
}
export default ProductCard;
