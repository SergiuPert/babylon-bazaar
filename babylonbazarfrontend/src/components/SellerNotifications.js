import React, {useEffect, useState} from 'react';
import {useAtom} from "jotai";
import {REFRESH, USER_ATOM} from "../STORE";

const SellerNotifications = () => {
    let [notifications, setNotifications] = useState([])
    const [user] = useAtom(USER_ATOM)
    let [updateBalance, setUpdateBalance] = useAtom(REFRESH)
    let [refresh, setRefresh] = useState(true)
    useEffect(() => {
        fetch(`https://localhost:7136/User/NotificationsPage`, {
            method: "GET",
            credentials: "include"
        })
            .then(response => response.json())
            .then((response) => setNotifications(response))

    }, [user, refresh])

    const completeNotification = (id) => {
        fetch(`https://localhost:7136/User/CompleteOrder/${id}`, {
            method: "POST",
            credentials: "include"
        })
            .then(() => {setRefresh(!refresh); setUpdateBalance(!updateBalance)})
    }



    return (
        <div>
            <h1 className="ProfilePageTitle">Notifications</h1>
            <div className={"TableBorder"}>
                <table>
                    <thead>
                        <tr>
                            <td>Date</td>
                            <td>Buyer</td>
                            <td>Product</td>
                            <td>Quantity</td>
                            <td>Country</td>
                            <td>County</td>
                            <td>City</td>
                            <td>Address</td>
                            <td>Phone Number</td>
                            <td>Zip Code</td>
                            <td>Status</td>
                        </tr>
                    </thead>
                    <tbody>
                    {notifications.map(notification =>
                        <tr>
                            <td>{notification.order.date}</td>
                            <td>{notification.name}</td>
                            <td>{notification.product.name}</td>
                            <td>{notification.orderItem.quantity}</td>
                            <td>{notification.location.country}</td>
                            <td>{notification.location.county}</td>
                            <td>{notification.location.city}</td>
                            <td>{notification.location.address}</td>
                            <td>{notification.location.phoneNumber}</td>
                            <td>{notification.location.zipCode}</td>
                            {!notification.notification.completed &&
                                <td><button className={"NotificationButtonComplete"} type={"button"} onClick={() => completeNotification(notification.notification.id)}>Complete Order</button></td>
                            }
                            {notification.notification.completed &&
                                <td><button className={"NotificationButtonDone"} type={"button"}>Done</button></td>
                            }
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellerNotifications;