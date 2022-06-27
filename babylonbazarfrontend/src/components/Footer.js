import React from 'react';
import Button from './Button.js'
import Info from './Info.js'

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Info msg="Copyright OOPanik @2022" />
                <Button link="" text="About Us" />
                <Button link="" text="Privacy Policy" />
                <Button link="" text="Contact Us" />
            </div>
        );
    }
}
export default Footer;
