import CategoriesButton from "./CategoriesButton"
import Info from "./Info"
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div className="Footer">
            <Info class="Info" text="Copyright OOPanik @2022" />
            <Link className="NavBarButtonStyle NavBarButtonText" to="/about">About</Link>
            <Link className="NavBarButtonStyle NavBarButtonText" to="/privacy">Privacy</Link>
            <Link className="NavBarButtonStyle NavBarButtonText" to="/contact">Contact</Link>
        </div>
    );
}

export default Footer;