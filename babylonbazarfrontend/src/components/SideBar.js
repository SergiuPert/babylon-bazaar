import Categories from "./Categories"

const Sidebar = (props) => {
    
    return (
        <div className="Categories">
            <Categories changeCategory={props.changeCategory} selectProduct={props.selectProduct} />
            {/*<Filter msg={this.SetFilterSupplier(this.state)} />*/}
            {/*<Filter msg={this.SetFilterRating(this.state)} />*/}
            {/*<Filter msg={this.SetFilterPrice(this.state)} />*/}
        </div>
    );
}

export default Sidebar;
