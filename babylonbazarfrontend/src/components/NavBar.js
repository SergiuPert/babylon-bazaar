import Button from "./Button"
import Info from "./Info"
import { useEffect, useState } from 'react'


const NavBar = () => {
    let [loggedIn, setLoggedIn] = useState(false)

    return (
        <div className="NavBar" >
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
                    <Button buttonStyle="NavBarButtonStyle" buttonTextStyle="NavBarButtonText" link="" text="Profile" />
                    <Button buttonStyle="NavBarButtonStyle" buttonTextStyle="NavBarButtonText" link="" text="LogOut" />
                </>
            }
        </div>
    );
}

export default NavBar;