import Button from "./Button"
import Info from "./Info"
import { useEffect, useState } from 'react'
import {Link} from "react-router-dom";

const NavBar = () => {
    let [loggedIn, setLoggedIn] = useState(true)

    return (
        <nav className="NavBar" >
            {/*<Button buttonStyle="NavBarButtonStyle" buttonTextStyle="NavBarButtonText" link="" text="Home" />*/}
            <Link className="NavBarButtonStyle NavBarButtonText" to="/" >Home</Link>
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
                    <Link className="NavBarButtonStyle NavBarButtonText" to="/cart" >Cart</Link>
                    <Link className="NavBarButtonStyle NavBarButtonText" to="/profile" >Profile</Link>
                    <Link className="NavBarButtonStyle NavBarButtonText" to="/" >LogOut</Link>
                </>
            }



            <Link to="/about" >About</Link> |{" "}
            <Link to="/contacts" >Contacts</Link>




        </nav>
    );
}

export default NavBar;