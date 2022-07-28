import Button from "./Button"
import Info from "./Info"
import { useEffect, useState } from 'react'
import {Link, useNavigate} from "react-router-dom";
import useToken from './useToken.js';

const NavBar = (props) => {
    return (
        <nav className="NavBar" >
            <Link className="NavBarButtonStyle NavBarButtonText" to="/" >Home</Link>
            {props.username == '' &&
                <>
                    <Link className="NavBarButtonStyle NavBarButtonText" to="/register" >Register</Link>
                    <Link className="NavBarButtonStyle NavBarButtonText" to="/login" >Login</Link>
                </>
            }
            {props.username != '' &&
                <>
                    <Info text={props.username} />
                    <Info text="User balance" />
                    <Link className="NavBarButtonStyle NavBarButtonText" to="/cart" >Cart</Link>
                    <Link className="NavBarButtonStyle NavBarButtonText" to="/profile" >Profile</Link>
                    <Link className="NavBarButtonStyle NavBarButtonText" onClick={props.logout} to="/login" >Logout</Link>
                </>
            }



            <Link to="/about" >About</Link> |{" "}
            <Link to="/contacts" >Contacts</Link>




        </nav>
    );
}

export default NavBar;