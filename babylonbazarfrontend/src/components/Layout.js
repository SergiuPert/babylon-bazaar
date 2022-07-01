import Content from "./Content"
import Footer from "./Footer"
import NavBar from "./NavBar"

const Layout = () => {
    return (
        <div className="Layout">
            <NavBar />
            <Content />
            <Footer />
        </div>
    );
}

export default Layout;