import CategoriesButton from "./CategoriesButton"
import Info from "./Info"

const Footer = () => {
    return (
        <div className="Footer">
            <Info class="Info" text="Copyright OOPanik @2022" />
            <CategoriesButton buttonStyle="NavBarButtonStyle" buttonTextStyle="NavBarButtonText" link="" text="About" />
            <CategoriesButton buttonStyle="NavBarButtonStyle" buttonTextStyle="NavBarButtonText" link="" text="Privacy" />
            <CategoriesButton buttonStyle="NavBarButtonStyle" buttonTextStyle="NavBarButtonText" link="" text="Contact" />
        </div>
    );
}

export default Footer;