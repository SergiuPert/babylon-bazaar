import React from 'react';
import Button from './Button.js'
import Info from './Info.js'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { msg: "", LoggedIn:"none" };
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    GetUserBalance() {
    }
    GetUserName() {
    }
    render() {
        return (
            <div>
                <Button link={this.props.msg("HomePage")} text="HomePage" />
                {this.state.LoggedIn == "none" &&
                    <>
                        <Button link="" text="LogIn" />
                        <Button link="" text="Register" />
                    </>
                    }
                {this.state.LoggedIn != "none" &&
                    <>
                        <Info msg="user name" />
                        <Info msg="user balance" />
                        <Button link="" text="Profile" />
                        <Button link="" text="LogOut" />
                    </>
                    }
            </div>
        );
    }
}
export default NavBar;
