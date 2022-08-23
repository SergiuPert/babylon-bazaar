import React, {useEffect, useState} from 'react';
import {useAtom} from "jotai";
import {USER_ATOM} from "../STORE";

const FinancialData = () => {
    let [user] = useAtom(USER_ATOM)
    const [form, setForm] = useState("")
    const userId = user.id
    const [reload, setReload] = useState(true)

    const [CardNumber, setCardNumber] = useState("")
    const [OwnerName, setOwnerName] = useState("")
    let [ExpirationDate, setExpirationDate] = useState("")
    const [CVC, setCVC] = useState("")

    let [cards,setCards]=useState([{
        userId:userId,
        cardNumber:"",
        ownerName:"",
        expirationDate:"",
        cvc:""
    }])

    useEffect(() => {
        fetch(`https://localhost:7136/User/GetUserCards/${user.id}`, { method: "GET", })
            .then(response => response.json())
            .then((response) => { setCards(response) })
    }, [user.id, reload, CardNumber, OwnerName, ExpirationDate, CVC]) // crashed

    if (cards.cardNumber === "") return <div>Loading...</div>

    const addCard = async (e) => {
        e.preventDefault()
        let res = await fetch('https://localhost:7136/user/AddCard', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' },
            body: JSON.stringify({
                userId,
                cardNumber:CardNumber,
                ownerName:OwnerName,
                expirationDate:ExpirationDate,
                cvc:CVC
            })
        })
        setReload(!reload)
        setForm("")
    };

    const deleteCard = async (cardId) => {
        await fetch(`https://localhost:7136/user/DeleteCard/${cardId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' }})
            .then(() => setReload(!reload))
    };

    return (
        <div>
            <h1 className="ProfilePageTitle">Financial Options</h1>
            <button type={"button"} onClick={() => setForm("Add")} >Add Card</button>
            <table>
                <thead>
                <tr>
                    <td>Card Number</td>
                    <td>Owner</td>
                    <td>Expires on</td>
                    <td>CVC</td>
                </tr>
                </thead>
                <tbody>
                {cards.map(card =>
                    <tr>
                        <td>{card.cardNumber} </td>
                        <td>{card.ownerName}</td>
                        <td>{card.expirationDate.substring(0,10)}</td>
                        <td>{card.cvc}</td>
                        <td><button type={"button"} onClick={() => { deleteCard(card.id) }}>Delete</button></td>
                    </tr>
                )}
                </tbody>
            </table>
            {form === "Add" &&
                <form onSubmit={addCard}>
                    <h1>CardNumber</h1>
                    <input type={"text"} onChange={e => setCardNumber(e.target.value)} required={true}/>
                    <h1>OwnerName</h1>
                    <input type={"text"} onChange={e => setOwnerName(e.target.value)} required={true}/>
                    <h1>ExpirationDate</h1>
                    <input type={"date"} onChange={e => setExpirationDate(e.target.value)} required={true}/>
                    <h1>CVC</h1>
                    <input type={"text"} onChange={e => setCVC(e.target.value)} required={true}/>
                    <br/>
                    <button type={"submit"}>Submit</button>
                </form>
            }
        </div>
    );
};

export default FinancialData;