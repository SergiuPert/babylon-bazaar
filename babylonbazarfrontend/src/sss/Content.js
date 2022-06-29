import ProductList from "./ProductList"
import Sidebar from "./Sidebar"







const Content = (props) => {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <ProductList />
        </div>
    );
}

export default Content;