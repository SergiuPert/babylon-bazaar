import CategoriesButton from "./CategoriesButton"
import Info from "./Info"
import {Fragment, useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import useToken from './useToken.js';

const NavBar = (props) => {
    return (
        <nav className="NavBar" >
            {/*{props.user != null && <h1>{props.user.name}</h1>}*/}
            <Link className="Logo MarginRightAuto" to="/" >Babylon Bazaar</Link>
            {props.user === null &&
                <>
                    <Link className="NavBarButtonStyle NavBarButtonText" to="/register" >Register</Link>
                    <Link className="NavBarButtonStyle NavBarButtonText" to="/login" >Login</Link>
                </>
            }
            {props.user != null &&
                <>
                    {/*<div>*/}
                    <Info class="Info" text={"Hello " + props.user.name + ", your balance is: " + props.user.balance + "$"} />
                    {/*<Info class="Info" text={"! Your balance is: "+props.user.balance+"$"} />*/}
                        {/*<br/>*/}
                    <Link className="NavBarButtonStyle NavBarButtonText" to="/cart" >Cart</Link>
                    <Link className="NavBarButtonStyle NavBarButtonText" to="/profile" >Profile</Link>
                    <Link className="NavBarButtonStyle NavBarButtonText" onClick={props.logout} to="/login" >Logout</Link>
                    {/*</div>*/}

                </>
            }
        </nav>
    );
}

export default NavBar;