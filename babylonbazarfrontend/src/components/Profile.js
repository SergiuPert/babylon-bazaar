import React from 'react';
import {useEffect, useState} from "react";

const Profile = (props) => {
    let [user, setUser] = useState(null)
    useEffect(() => {
        fetch(`https://localhost:7136/User/ProfilePage/${props.userId}`, { method: "GET", })
            .then(response => response.json())
            .then((response) => { setUser(response) })
    }, [props.userId])
    if (user === null) {
        return <div>Loading...</div>
    }
    return (
        <div style={{backgroundColor: "white"}}>
            <h1>Username: {user.name}</h1>
            <h1>Email: {user.email}</h1>
            <h1>Role: {user.balance}</h1>
            <h1>Image: {user.image}</h1>
        </div>
    );
}

export default Profile;