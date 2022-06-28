import React from 'react';
import Button from './Button';
import DropDown from './DropDown';
import Info from './Info';

class Categories extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const categories = [
                {
                    id: 1,
                    parentId: null,
                    name: "Electronics"
                },
                {
                    id: 2,
                    parentId: 1,
                    name: "PC"
                },
                {
                    id: 3,
                    parentId: 2,
                    name: "Laptop"
                },
                {
                    id: 4,
                    parentId: 2,
                    name: "Desktop"
                }
        ]
        const names = ["aaa", "abb", "ccc"]
        return (
            //<span>{this.props.msg}</span>
            <div>

                <Button link="" text={categories[0].name} />
                <Info msg={categories[1].name} />
                <DropDown names={names} />
            </div>
        );
    }
}
export default Categories;
