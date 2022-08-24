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
        case "Orders":
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
        case "Payment Options":
            content = <FinancialData />;
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