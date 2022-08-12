import React from 'react';
import {useAtom} from "jotai";
import {USER_ATOM} from "../STORE";
import {useEffect, useState} from "react";
import CartItem from "./CartItem";
import {Navigate} from "react-router-dom";
import LocationForm from "./LocationForm";

const DeliveryOptions = () => {
    let [user] = useAtom(USER_ATOM)
    const [form, setForm] = useState("")
    const userId = user.id

    const [reload, setReload] = useState(true)

    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [country, setCountry] =useState("")
    const [county, setCounty] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [zipCode, setZipCode] = useState("") //try variables


    const [selectedLocation, setSelectedLocation] = useState({
        userId: userId,
        name: "",
        phoneNumber: "",
        email: "",
        country: "",
        county: "",
        city: "",
        address: "",
        zipCode: ""
    })

    let [locations, setLocations] = useState([{
        userId: userId,
        name: "",
        phoneNumber: "",
        email: "",
        country: "",
        county: "",
        city: "",
        address: "",
        zipCode: ""
    }])

    useEffect(() => {
        fetch(`https://localhost:7136/User/GetUserLocations/${user.id}`, { method: "GET", })
            .then(response => response.json())
            .then((response) => { setLocations(response) })
    }, [user.id, reload, name, phoneNumber, email]) // crashed

    if (locations.name === "") {
        return <div>Loading...</div>
    }


    const addLocation = async (e) => {
        e.preventDefault()
        let res = await fetch('https://localhost:7136/user/AddLocation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' },
            body: JSON.stringify({
                userId,
                name,
                phoneNumber,
                email,
                country,
                county,
                city,
                address,
                zipCode
            })
        })
        setReload(!reload)
        setForm("")
    };

    const editLocation = async (e) => {
        e.preventDefault()
        formValues()
        let res = await fetch('https://localhost:7136/user/EditLocation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' },
            body: JSON.stringify({
                id,
                userId,
                name,
                phoneNumber,
                email,
                country,
                county,
                city,
                address,
                zipCode
            })
        }).then(() => {
            setReload(!reload)
            setForm("")

            setName("")
            setPhoneNumber("")
            setEmail("")
            setCountry("")
            setCounty("")
            setCity("")
            setAddress("")
            setZipCode("")
        })
    };

    const deleteLocation = async (locationId) => {
        await fetch(`https://localhost:7136/user/DeleteLocation/${locationId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' }}).then(() => setReload(!reload))

    };


    const refreshForm = () => {
        document.getElementById("form").reset()
    }

    const formValues = () => {
        if (name == null) {
            setName("selectedLocation.name")
        }
        setPhoneNumber((phoneNumber!== "") ? phoneNumber : selectedLocation.phoneNumber)
        setEmail((email !== "") ? email : selectedLocation.email)
        setCountry((country !== "") ? country : selectedLocation.country)
        setCounty((county !== "") ? county : selectedLocation.county)
        setCity((city !== "") ? city : selectedLocation.city)
        setAddress((address !== "") ? address : selectedLocation.address)
        setZipCode((zipCode!=="") ? zipCode : selectedLocation.zipCode)
    }

    return (
        <div>
            <h1 className="ProfilePageTitle">Delivery Options</h1>
            <button type={"button"} onClick={() => setForm("Add")} >Add Location</button>
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Phone Number</td>
                        <td>Email</td>
                        <td>Country</td>
                        <td>County</td>
                        <td>City</td>
                        <td>Address</td>
                        <td>ZipCode</td>
                    </tr>
                </thead>
                <tbody>
            {locations.map(location =>
                <tr>
                    <td>{location.name} </td>
                    <td>{location.phoneNumber}</td>
                    <td>{location.email}</td>
                    <td>{location.country}</td>
                    <td>{location.county}</td>
                    <td>{location.city}</td>
                    <td>{location.address}</td>
                    <td>{location.zipCode}</td>
                    <button type={"button"} onClick={() => {setSelectedLocation(location); setId(location.id); setForm("Edit"); refreshForm()}}>Edit</button>
                    <button type={"button"} onClick={(e) => { deleteLocation(location.id) }}>Delete</button>
                </tr>
            )}
                </tbody>
            </table>
            {form === "Add" &&
                <form onSubmit={addLocation}>
                    <h1>Name</h1>
                    <input type={"text"} onChange={e => setName(e.target.value)}/>
                    <h1>Phone Number</h1>
                    <input type={"text"} onChange={e => setPhoneNumber(e.target.value)}/>
                    <h1>Email</h1>
                    <input type={"text"} onChange={e => setEmail(e.target.value)}/>
                    <h1>Country</h1>
                    <input type={"text"} onChange={e => setCountry(e.target.value)}/>
                    <h1>County</h1>
                    <input type={"text"} onChange={e => setCounty(e.target.value)}/>
                    <h1>City</h1>
                    <input type={"text"} onChange={e => setCity(e.target.value)}/>
                    <h1>Address</h1>
                    <input type={"text"} onChange={e => setAddress(e.target.value)}/>
                    <h1>ZipCode</h1>
                    <input type={"text"} onChange={e => setZipCode(e.target.value)}/>
                    <br/>
                    <button type={"submit"}>Submit</button>
                </form>

            }
            {form === "Edit" &&
                <form id="form" onSubmit={editLocation}>
                    <h1>New Name</h1>
                    <input type={"text"} defaultValue={selectedLocation.name} onChange={e => setName(e.target.value)}/>
                    <h1>New Phone Number</h1>
                    <input type={"text"} defaultValue={selectedLocation.phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
                    <h1>New Email</h1>
                    <input type={"text"} defaultValue={selectedLocation.email} onChange={e => setEmail(e.target.value)}/>
                    <h1>New Country</h1>
                    <input type={"text"} defaultValue={selectedLocation.country} onChange={e => setCountry(e.target.value)}/>
                    <h1>New County</h1>
                    <input type={"text"} defaultValue={selectedLocation.county} onChange={e => setCounty(e.target.value)}/>
                    <h1>New City</h1>
                    <input type={"text"} defaultValue={selectedLocation.city} onChange={e => setCity(e.target.value)}/>
                    <h1>New Address</h1>
                    <input type={"text"} defaultValue={selectedLocation.address} onChange={e => setAddress(e.target.value)}/>
                    <h1>New ZipCode</h1>
                    <input type={"text"} defaultValue={selectedLocation.zipCode} onChange={e => setZipCode(e.target.value)}/>
                    <br/>
                    <button type={"submit"}>Submit</button>
                </form>
            }
        </div>
    );
};

export default DeliveryOptions;