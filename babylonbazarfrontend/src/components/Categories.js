import React from 'react';

class Categories extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <span>{this.props.msg}</span>
        );
    }
}
export default Categories;
