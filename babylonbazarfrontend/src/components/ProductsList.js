import React from 'react';
import ProductCard from './ProductCard.js'
import Button from './Button.js'

class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.dispatchMessage = this.dispatchMessage.bind(this);
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    dispatchMessage() {
        this.setState(() => ({ activePage: this.props.showPage }));
    }
    render() {
        return (
            <div >
                <ProductCard Name="product1" Description="description1" Price="123.45" Rating="5" Image="none" />
                <ProductCard Name="product2" Description="description2" Price="321.65" Rating="4.5" Image="none" />
                <ProductCard Name="product3" Description="description3" Price="213.26" Rating="4" Image="none" />
                <Button link="" text="PrevPage" />
                <Button link="" text="NextPage" />
            </div>
        );
    }
}
export default ProductsList;
