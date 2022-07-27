import React from 'react';
import NavBar from "./NavBar";
import Footer from "./Footer";
import Profile from "./Profile"
import {useState} from "react";

const ProfilePage = (props) => {
    let [userId, setUserId] = useState(2)
    return (
        <div>
            <Profile userId={userId} />
        </div>
    );
}

export default ProfilePage;