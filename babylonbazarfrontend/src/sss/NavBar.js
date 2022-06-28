import Button from "./Button"
import Info from "./Info"


const NavBar = () => {
    return (
        <div style={{ display: "flex" }}>
            <Button link="" text="HomePage" />
            <Button link="" text="LogIn" />
            <Button link="" text="Register" />
            <Info text="User name" />
            <Info text="User balance" />
            <Button link="" text="Profile" />
            <Button link="" text="LogOut" />
        </div>
    );
}

export default NavBar;