import React from 'react';
import HomePage from './HomePage.js'

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activePage: "HomePage" };
        this.setPage = this.setPage.bind(this);
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    setPage() {
        this.setState(() => ({ activePage: this.props.showPage }));
    }
    render() {
        return (
            < div >
            {this.state.activePage=="HomePage" && <HomePage />}
            {/*    <ProductPage />*/}
            {/*    <UserPage />*/}
            {/*    <UserCart />*/}
            {/*    <AdminPage />*/}
            {/*    <AboutPage />*/}
            {/*    <PrivacyPage />*/}
            {/*    <ContactPage />*/}
            </div>
        );
    }
}
export default Content;
