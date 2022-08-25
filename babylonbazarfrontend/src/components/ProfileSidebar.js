import React from 'react';
import ProfileButton from "./ProfileButton";

const ProfileSidebar = (props) => {


    return (
        <div>
            <ProfileButton buttonStyle="CategoriesHeaderButton" buttonTextStyle="CategoriesHeaderButtonText" link={props.setCurrentPage} text="Show Profile" />
            <ProfileButton buttonStyle="CategoriesHeaderButton" buttonTextStyle="CategoriesHeaderButtonText" link={props.setCurrentPage} text="Edit Profile" />
            <ProfileButton buttonStyle="CategoriesHeaderButton" buttonTextStyle="CategoriesHeaderButtonText" link={props.setCurrentPage} text="Order History" />
            <ProfileButton buttonStyle="CategoriesHeaderButton" buttonTextStyle="CategoriesHeaderButtonText" link={props.setCurrentPage} text="My Products" />
            <ProfileButton buttonStyle="CategoriesHeaderButton" buttonTextStyle="CategoriesHeaderButtonText" link={props.setCurrentPage} text="Notifications" />
            <ProfileButton buttonStyle="CategoriesHeaderButton" buttonTextStyle="CategoriesHeaderButtonText" link={props.setCurrentPage} text="Delivery Options" />
            <ProfileButton buttonStyle="CategoriesHeaderButton" buttonTextStyle="CategoriesHeaderButtonText" link={props.setCurrentPage} text="Payment Options" />
        </div>
    );
};

export default ProfileSidebar;