import React from 'react';
import SideBar from './SideBar.js'
import ProductsList from './ProductsList.js'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "",Sorting:"rating",
            FilterBySupplier: "false", SupplierName: "",
            FilterByPrice: "false", MinPrice: "0", MaxPrice: "1000000000",
            FilterByRating: "true", MinRating: "0", MaxRation: "5"
        };
        this.dispatchMessage = this.dispatchMessage.bind(this);
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    dispatchMessage(msg) {
        this.setState(() => ({/*XXXXXXXXXXXXXX*/}));
    }
    render() {
        return (
            <div >
                <SideBar msg={this.dispatchMessage(this.state)} />
                <ProductsList msg={this.state } />
            </div>
        );
    }
}
export default HomePage;
