import Categories from "./Categories"




  //          {/*<h1>Categories</h1>*/}

const Sidebar = (props) => {
    
    return (
        <div className="Categories">
            <Categories changeCategory={props.changeCategory} />
            {/*<Filter msg={this.SetFilterSupplier(this.state)} />*/}
            {/*<Filter msg={this.SetFilterRating(this.state)} />*/}
            {/*<Filter msg={this.SetFilterPrice(this.state)} />*/}
        </div>
    );
}

export default Sidebar;
