import React from 'react';

class DropDown extends React.Component {
    constructor(props) {
        super(props);
    }
    

    render() {
        console.log(this.props.names)
        let aaa = ["aaa", "abb", "ccc"];
        const result = [];

        return (
            <div>
            <select>
                    {
                this.props.names?.map(item => {
                        <option>{item}</option>
                    }
                    )};
                    {result}
                </select>
            </div>
            /*<span>{this.props.msg}</span>*/
        );
    }
}
export default DropDown;
