import React, {useState} from 'react';
import {useAtom} from "jotai";
import {REFRESH, USER_ATOM} from "../STORE";
import {NotificationManager} from "react-notifications";
import NotificationContainer from "react-notifications/lib/NotificationContainer";

const WithdrawFunds = () => {
    let [sum, setSum] = useState(0)
    let [IBAN, setIBAN] = useState("")
    let [user] = useAtom(USER_ATOM)
    let [refresh, setRefresh] = useAtom(REFRESH)

    const handleSubmit = async () => {
        await fetch('https://localhost:7136/product/addpaymentrequest', {
            method: "POST",
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000'},
            credentials: "include",
            body: JSON.stringify({
                Sum: sum,
                IBAN: IBAN
            })
        })
            .then(() => setRefresh(!refresh))

    }

    const createNotification = (type) => {
        return () => {
            switch (type) {
                case 'success':
                    handleSubmit()
                    NotificationManager.success('Withdraw Request Successful', 'Success', 2000);
                    break;
                case 'warning':
                    NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                    break;
                case 'error':
                    NotificationManager.error('Insufficient Funds', 'Error', 5000);
                    break;
            }
        };
    };

    return (
        <div>
            <form id="payment-form">
                <label>Amount</label>
                <br/>
                <input className={"InputField"} type={"number"} defaultValue={"Amount"} onChange={(e) => setSum(e.target.value)} required={true}/>
                <br/>
                <br/>
                <label>IBAN</label>
                <br/>
                <input className={"InputField"} type={"text"} onChange={(e) => setIBAN(e.target.value)} required={true}/>
                <br/>
                <div className={"CategoriesHeaderButton"} onClick={createNotification((user.balance > sum) ? "success": "error")}>
                    <button className={"CategoriesHeaderButtonText"} type={"button"}>Request Withdrawal</button>
                </div>
            </form>
            <NotificationContainer />
        </div>
    );
};

export default WithdrawFunds;