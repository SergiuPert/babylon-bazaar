import React from 'react';
import Categories from './Categories.js'
import Filter from './Filter.js'
import DropDown from './DropDown.js'

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "", Sorting:"rating",
            FilterBySupplier: "false", SupplierName: "",
            FilterByPrice: "false", MinPrice: "0", MaxPrice: "1000000000",
            FilterByRating: "true", MinRating: "0", MaxRating: "5"
        };
        this.SetCategory = this.SetCategory.bind(this);
        this.SetFilterSupplier = this.SetFilterSupplier.bind(this);
        this.SetFilterRating = this.SetFilterRating.bind(this);
        this.SetFilterPrice = this.SetFilterPrice.bind(this);
        this.SetSorting = this.SetSorting.bind(this);
        this.DispatchMessage = this.DispatchMessage.bind(this);
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    SetCategory(msg) {
        this.setState(() => ({ category: msg.category }));
    }
    SetFilterSupplier(msg) {
        this.setState(() => ({ FilterBySupplier: msg.filter,SupplierName:msg.name }));
    }
    SetFilterRating(msg) {
        this.setState(() => ({FilterByRating: msg.filter, MinRating: msg.min, MaxRating: msg.max }));
    }
    SetFilterPrice(msg) {
    this.setState(() => ({ FilterByPrice: msg.filter, MinPrice: msg.min, MaxPrice: msg.max }));
    }
    SetSorting(msg) {
    this.setState(() => ({ Sorting: msg.sorting }));
    }
    DispatchMessage() {
        this.props.msg(this.state);
    }
    render() {
        return (
            <div>
                <Categories msg={this.SetCategory(this.state)} />
                <Filter msg={this.SetFilterSupplier(this.state)} />
                <Filter msg={this.SetFilterRating(this.state)} />
                <Filter msg={this.SetFilterPrice(this.state)} />
                {/*<DropDown msg={this.SetSorting(this.state)}/>*/}
            </div>
        );
    }
}
export default SideBar;
