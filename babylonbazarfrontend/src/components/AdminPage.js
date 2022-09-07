import React, {useState} from 'react';
import {useEffect} from "react";
import AdminProducts from "./AdminProducts";
import AdminCategories from "./AdminCategories";
import AdminSubSubCategories from "./AdminSubSubCategories";
import AdminSubCategories from "./AdminSubCategories";
import ProfileButton from "./ProfileButton";
import AdminPaymentRequests from "./AdminPaymentRequests";

const AdminPage = () => {
    let [content, setContent] = useState("Admin Products")

    switch (content) {
        case "Admin Products":
            content = <AdminProducts/>;
            break;
        case "Payment Requests":
            content = <AdminPaymentRequests/>;
            break;
        case "Add Categories 1":
            content = <AdminCategories/>;
            break;
        case "Add Categories 2":
            content = <AdminSubCategories/>;
            break;
        case "Add Categories 3":
            content = <AdminSubSubCategories/>;
            break;
    }

    return (
        <div>
            <h1 className="ProfilePageTitle">Admin</h1>
            <div className={"Flex"}>
                <ProfileButton buttonStyle="CategoriesHeaderButton" buttonTextStyle="CategoriesHeaderButtonText" link={setContent} text="Admin Products" />
                <ProfileButton buttonStyle="CategoriesHeaderButton" buttonTextStyle="CategoriesHeaderButtonText" link={setContent} text="Payment Requests" />
                <ProfileButton buttonStyle="CategoriesHeaderButton" buttonTextStyle="CategoriesHeaderButtonText" link={setContent} text="Add Categories 1" />
                <ProfileButton buttonStyle="CategoriesHeaderButton" buttonTextStyle="CategoriesHeaderButtonText" link={setContent} text="Add Categories 2" />
                <ProfileButton buttonStyle="CategoriesHeaderButton" buttonTextStyle="CategoriesHeaderButtonText" link={setContent} text="Add Categories 3" />
            </div>
            {content}
        </div>
    )

};

export default AdminPage;