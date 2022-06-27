import React from 'react';
import NavBar from './NavBar.js'
import Content from './Content.js'
import Footer from './Footer.js'

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = { msg: "",showPage:""};
        this.dispatchMessage = this.dispatchMessage.bind(this);
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    dispatchMessage(msg) {
        this.setState((msg) => ({ showPage: msg }));
    }
    render() {
        return (
            <>
               <NavBar msg={this.dispatchMessage} />
               <Content showPage={ this.state.showPage}/>
               <Footer />
            </>
        );
    }
}
export default Layout;
