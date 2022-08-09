import React from 'react';
import {useAtom} from "jotai";
import {USER_ATOM} from "../STORE";

const ProfileInfo = () => {
    let [user] = useAtom(USER_ATOM)
    return (
        <div>
            <h1 className="ProfilePageTitle">Profile</h1>
            <div className="Flex">
                <img className="ProfilePic" src={require("../images/profilePic.jpg")}/>
                <div className="ProfileInfo">
                    <h1 className="ProfileInfoLines">Username: {user.name}</h1>
                    <h1 className="ProfileInfoLines">Email: {user.email}</h1>
                    <h1 className="ProfileInfoLines">Balance: {user.balance}</h1>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;