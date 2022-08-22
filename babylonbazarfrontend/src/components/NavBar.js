import CategoriesButton from "./CategoriesButton"
import Info from "./Info"
import { useEffect, useState } from 'react'
import {Link, useNavigate} from "react-router-dom";
import useToken from './useToken.js';

const NavBar = (props) => {
    return (
        <nav className="NavBar" >
            {/*{props.user != null && <h1>{props.user.name}</h1>}*/}
            <Link className="NavBarButtonStyle NavBarButtonText" to="/" >Home</Link>
            {props.user === null &&
                <>
                    <Link className="NavBarButtonStyle NavBarButtonText" to="/register" >Register</Link>
                    <Link className="NavBarButtonStyle NavBarButtonText" to="/login" >Login</Link>
                </>
            }
            {props.user != null &&
                <>
                    <Info class="Info" text={props.user.name} />
                    <Info class="Info" text={" Balance "+props.user.balance+"$"} />
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