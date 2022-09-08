import React from 'react';
import {useEffect, useState} from "react";
import {useAtom} from "jotai";
import {USER_ATOM} from "../STORE";
import ProfileSidebar from "./ProfileSidebar";
import ProfileInfo from "./ProfileInfo";
import EditProfile from "./EditProfile";
import OrderHistory from "./OrderHistory";
import SellerProducts from "./SellerProducts";
import SellerNotifications from "./SellerNotifications";
import DeliveryOptions from "./DeliveryOptions";
import FinancialData from "./FinancialData";
import AdminPage from "./AdminPage";
import PaymentForm from "./PaymentForm";
import WithdrawFunds from "./WithdrawFunds";

const Profile = () => {
    let [user] = useAtom(USER_ATOM)
    let [currentPage, setCurrentPage] = useState("Show Profile")
    let content = "";
    switch (currentPage) {
        case "Show Profile":
            content = <ProfileInfo />;
            break;
        case "Edit Profile":
            content = <EditProfile setCurrentPage={setCurrentPage} />;
            break;
        case "Order History":
            content = <OrderHistory />;
            break;
        case "My Products":
            content = <SellerProducts />;
            break;
        case "Notifications":
            content = <SellerNotifications />;
            break;
        case "Delivery Options":
            content = <DeliveryOptions />;
            break;
        // case "Payment Options":
        //     content = <FinancialData />;
        //     break;
        case "Add Funds":
            content = <PaymentForm />;
            break;
        case "Withdraw Funds":
            content = <WithdrawFunds />;
            break;
        case "Admin":
            content = <AdminPage />;
            break;
    }
    if (user === null) {
        return <div>Loading...</div>
    }
    return (
        <div className="Profile">
            <ProfileSidebar setCurrentPage={setCurrentPage} />
            {content}
        </div>
    );
}

export default Profile;