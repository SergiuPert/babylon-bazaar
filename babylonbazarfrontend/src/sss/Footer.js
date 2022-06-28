import Button from "./Button"
import Info from "./Info"


const Footer = () => {
    return (
        <div style={{ display: "flex" }}>
            <Info text="Copyright OOPanik @2022" />
            <Button link="" text="About Us" />
            <Button link="" text="Privacy Policy" />
            <Button link="" text="Contact Us" />
        </div>
    );
}

export default Footer;