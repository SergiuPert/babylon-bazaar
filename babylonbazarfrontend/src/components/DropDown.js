import React from 'react';

class DropDown extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <span>{this.props.msg}</span>
        );
    }
}
export default DropDown;
