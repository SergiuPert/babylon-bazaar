import Button from "./Button"
import Info from "./Info"
import { useEffect, useState } from 'react'


const NavBar = () => {
    let [loggedIn, setLoggedIn] = useState(false)

    return (
        <div style={{ display: "flex" }}>
            <Button link="" text="HomePage" />
            {!loggedIn &&
                <>
                    <Button link="" text="LogIn" />
                    <Button link="" text="Register" />
                </>
            }
            {loggedIn &&
                <>
                    <Info text="User name" />
                    <Info text="User balance" />
                    <Button link="" text="Profile" />
                    <Button link="" text="LogOut" />
                </>
            }
        </div>
    );
}

export default NavBar;