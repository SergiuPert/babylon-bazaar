import React from 'react';
import {useEffect, useState} from "react";

const AdminPaymentRequests = () => {
    let [requests, setRequests] = useState([])
    let [page, setPage] = useState(0)
    let [refresh, setRefresh] = useState(true)
    useEffect(() => {
        (async () => {
                await fetch(`https://localhost:7136/Product/GetPaymentRequests`, {method: "GET"})
                    .then(response => response.json())
                    .then((response) => setRequests(response))
            }
        )();
    }, [refresh])

    const CompleteRequest = async (id) => {
        await fetch(`https://localhost:7136/Product/CompletePaymentRequest/${id}`, { method: "POST" })
            .then(() => { setRefresh(!refresh) })
    }


    if (requests === []) {
        return (
            <div>Loading....</div>
        )
    }
    return (
        <div>
            <div className={"TableBorder"}>
                <table>
                    <thead>
                    <tr>
                        <td>User</td>
                        <td>Sum</td>
                        <td>IBAN</td>
                        <td>Status</td>
                    </tr>
                    </thead>
                    <tbody>
                    {requests.map(request =>
                        <tr>
                            <td>{request.username}</td>
                            <td>{request.request.sum}</td>
                            <td>{request.request.iban}</td>
                            {!request.request.status &&
                                <td><button className={"NotificationButtonComplete SubCategoryButtonText"} type={"button"} onClick={() => CompleteRequest(request.request.id)}>Complete</button></td>
                            }
                            {request.request.status &&
                                <td><button className={"NotificationButtonDone SubCategoryButtonText"} type={"button"}>Done</button></td>
                            }
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPaymentRequests;