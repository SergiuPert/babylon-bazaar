import React from 'react';
import {useEffect, useState} from "react";

const Profile = (props) => {
    let [userId, setUserId] = useState(2)
    let [user, setUser] = useState(null)
    useEffect(() => {
        fetch(`https://localhost:7136/User/ProfilePage/${userId}`, { method: "GET", })
            .then(response => response.json())
            .then((response) => { setUser(response) })
    }, [props.userId])
    if (user === null) {
        return <div>Loading...</div>
    }
    return (
        <div className="Profile">
            <div className="Flex">
                <h1>Image: {user.image}</h1>
                <div>
                    <h1>Username: {user.name}</h1>
                    <h1>Email: {user.email}</h1>
                    <h1>Balance: {user.balance}</h1>
                </div>
            </div>
        </div>
    );
}

export default Profile;