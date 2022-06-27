import React from 'react';

class Filter extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <span>{this.props.msg}</span>
        );
    }
}
export default Filter;
