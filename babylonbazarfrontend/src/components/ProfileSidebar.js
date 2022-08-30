import React from 'react';
import ProfileButton from "./ProfileButton";
import {useAtom} from "jotai";
import {USER_ATOM} from "../STORE";

const ProfileSidebar = (props) => {
    let [user] = useAtom(USER_ATOM)

    return (
        <div>
            <ProfileButton buttonStyle="CategoriesHeaderButton" buttonTextStyle="CategoriesHeaderButtonText" link={props.setCurrentPage} text="Show Profile" />
            <ProfileButton buttonStyle="CategoriesHeaderButton" buttonTextStyle="CategoriesHeaderButtonText" link={props.setCurrentPage} text="Edit Profile" />
            <ProfileButton buttonStyle="CategoriesHeaderButton" buttonTextStyle="CategoriesHeaderButtonText" link={props.setCurrentPage} text="Order History" />
            <ProfileButton buttonStyle="CategoriesHeaderButton" buttonTextStyle="CategoriesHeaderButtonText" link={props.setCurrentPage} text="My Products" />
            <ProfileButton buttonStyle="CategoriesHeaderButton" buttonTextStyle="CategoriesHeaderButtonText" link={props.setCurrentPage} text="Notifications" />
            <ProfileButton buttonStyle="CategoriesHeaderButton" buttonTextStyle="CategoriesHeaderButtonText" link={props.setCurrentPage} text="Delivery Options" />
            <ProfileButton buttonStyle="CategoriesHeaderButton" buttonTextStyle="CategoriesHeaderButtonText" link={props.setCurrentPage} text="Payment Options" />
            {user.role === "Admin" &&
                <ProfileButton buttonStyle="CategoriesHeaderButton" buttonTextStyle="CategoriesHeaderButtonText" link={props.setCurrentPage} text="Admin" />
            }
        </div>
    );
};

export default ProfileSidebar;