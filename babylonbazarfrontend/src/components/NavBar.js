import Button from "./Button"
import Info from "./Info"
import { useEffect, useState } from 'react'
import {Link, useNavigate} from "react-router-dom";
import useToken from './useToken.js';

const NavBar = () => {
    //let { loggedIn, setLoggedIn } = useToken()
    const useLogout = () => {
        //sessionStorage.clear();
        console.log(sessionStorage.getItem('userId'))
        //    const target = useNavigate();
        //    target('/');
    }
    let loggedIn = sessionStorage.getItem('userId')!="-1";
    console.log(loggedIn)
    return (
        <nav className="NavBar" >
            {/*<Button buttonStyle="NavBarButtonStyle" buttonTextStyle="NavBarButtonText" link="" text="Home" />*/}
            <Link className="NavBarButtonStyle NavBarButtonText" to="/" >Home</Link>
            {sessionStorage.getItem('userId') == null &&
                <>
                    <Button buttonStyle="NavBarButtonStyle" buttonTextStyle="NavBarButtonText" link="" text="LogIn" />
                    <Button buttonStyle="NavBarButtonStyle" buttonTextStyle="NavBarButtonText" link="" text="Register" />
                </>
            }
            {sessionStorage.getItem('userId') != null &&
                <>
                    <Info text="User name" />
                    <Info text="User balance" />
                    <Link className="NavBarButtonStyle NavBarButtonText" to="/cart" >Cart</Link>
                    <Link className="NavBarButtonStyle NavBarButtonText" to="/profile" >Profile</Link>
                    <Button buttonStyle="NavBarButtonStyle" buttonTextStyle="NavBarButtonText" link={useLogout} text="Logout" />
                </>
            }



            <Link to="/about" >About</Link> |{" "}
            <Link to="/contacts" >Contacts</Link>




        </nav>
    );
}

export default NavBar;