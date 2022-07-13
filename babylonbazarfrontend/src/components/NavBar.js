import Button from "./Button"
import Info from "./Info"
import { useEffect, useState } from 'react'
import {Link} from "react-router-dom";

const NavBar = () => {
    let [loggedIn, setLoggedIn] = useState(true)

    return (
        <nav className="NavBar" >
            <Button buttonStyle="NavBarButtonStyle" buttonTextStyle="NavBarButtonText" link="" text="Home" />
            {!loggedIn &&
                <>
                    <Button buttonStyle="NavBarButtonStyle" buttonTextStyle="NavBarButtonText" link="" text="LogIn" />
                <Button buttonStyle="NavBarButtonStyle" buttonTextStyle="NavBarButtonText" link="" text="Register" />
                </>
            }
            {loggedIn &&
                <>
                    <Info text="User name" />
                    <Info text="User balance" />
                    <Button buttonStyle="NavBarButtonStyle" buttonTextStyle="NavBarButtonText" link="" text="Cart" />
                    <Button buttonStyle="NavBarButtonStyle" buttonTextStyle="NavBarButtonText" link="" text="Profile" />
                    <Button buttonStyle="NavBarButtonStyle" buttonTextStyle="NavBarButtonText" link="" text="LogOut" />
                </>
            }



            <Link className="NavBarButtonStyle NavBarButtonText" to="/" >Cart</Link> |{" "}
            <Link to="/about" >About</Link> |{" "}
            <Link to="/contacts" >Contacts</Link>




        </nav>
    );
}

export default NavBar;