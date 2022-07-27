import Button from "./Button"
import Info from "./Info"
import { useEffect, useState } from 'react'
import {Link, useNavigate} from "react-router-dom";
import useToken from './useToken.js';

const NavBar = () => {
    const [username, setUserName] = useState('')

    useEffect(() => {
        (
            async () => {
                const response = await fetch('https://localhost:7136/login/user', {
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' },
                    credentials: 'include',
                });
                const content = await response.json();
                setUserName(content.name)
            }
        )();
    });

    return (
        <nav className="NavBar" >
            {/*<Button buttonStyle="NavBarButtonStyle" buttonTextStyle="NavBarButtonText" link="" text="Home" />*/}
            <Link className="NavBarButtonStyle NavBarButtonText" to="/" >Home</Link>
            {sessionStorage.getItem('userId') == null &&
                <>
                    <Link className="NavBarButtonStyle NavBarButtonText" to="/register" >Register</Link>
                    <Link className="NavBarButtonStyle NavBarButtonText" to="/login" >Login</Link>
                </>
            }
            {sessionStorage.getItem('userId') != null &&
                <>
                    <Info text={"Hello" + {username}} />
                    <Info text="User balance" />
                    <Link className="NavBarButtonStyle NavBarButtonText" to="/cart" >Cart</Link>
                    <Link className="NavBarButtonStyle NavBarButtonText" to="/profile" >Profile</Link>
                    <Button buttonStyle="NavBarButtonStyle" buttonTextStyle="NavBarButtonText" link="" text="Logout" />
                </>
            }



            <Link to="/about" >About</Link> |{" "}
            <Link to="/contacts" >Contacts</Link>




        </nav>
    );
}

export default NavBar;