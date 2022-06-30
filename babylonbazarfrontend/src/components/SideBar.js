import Categories from "./Categories"





const Sidebar = (props) => {
    
    return (
        <div>
            <h1>Categories</h1>
            <Categories changeCategory={props.changeCategory} />
            {/*<Filter msg={this.SetFilterSupplier(this.state)} />*/}
            {/*<Filter msg={this.SetFilterRating(this.state)} />*/}
            {/*<Filter msg={this.SetFilterPrice(this.state)} />*/}
        </div>
    );
}

export default Sidebar;
