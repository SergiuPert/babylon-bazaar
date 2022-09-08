import React from 'react';
import {useAtom} from "jotai";
import {USER_ATOM} from "../STORE";
import {useEffect, useState} from "react";

const DeliveryOptions = () => {
    let [user] = useAtom(USER_ATOM)
    const [form, setForm] = useState("")
    const userId = user.id

    const [reload, setReload] = useState(true)

    const [id, setId] = useState("")
    const [_name, setName] = useState("")
    const [_phoneNumber, setPhoneNumber] = useState("")
    const [_email, setEmail] = useState("")
    const [_country, setCountry] =useState("")
    const [_county, setCounty] = useState("")
    const [_city, setCity] = useState("")
    const [_address, setAddress] = useState("")
    const [_zipCode, setZipCode] = useState("") //try variables

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
        fetch(`https://localhost:7136/User/GetUserLocations`, {
            method: "GET",
            credentials: "include"
        })
            .then(response => response.json())
            .then((response) => { setLocations(response) })
    }, [user.id, reload, _name, _phoneNumber, _email])

    if (locations.name === "") {
        return <div>Loading...</div>
    }


    const addLocation = async (e) => {
        e.preventDefault()
        let res = await fetch('https://localhost:7136/user/AddLocation', {
            method: 'POST',
            credentials: "include",
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' },
            body: JSON.stringify({
                userId,
                name: _name,
                phoneNumber: _phoneNumber,
                email: _email,
                country: _country,
                county: _county,
                city: _city,
                address: _address,
                zipCode: _zipCode
            })
        })
        setReload(!reload)
        setForm("")
    };

    const editLocation = async (e) => {
        e.preventDefault()
        let name= (_name !== "")?_name:selectedLocation.name
        let phoneNumber=((_phoneNumber!== "") ? _phoneNumber : selectedLocation.phoneNumber)
        let email=((_email !== "") ? _email : selectedLocation.email)
        let country=((_country !== "") ? _country : selectedLocation.country)
        let county=((_county !== "") ? _county : selectedLocation.county)
        let city=((_city !== "") ? _city : selectedLocation.city)
        let address=((_address !== "") ? _address : selectedLocation.address)
        let zipCode=((_zipCode!=="") ? _zipCode : selectedLocation.zipCode)
        let res = await fetch('https://localhost:7136/user/EditLocation', {
            method: 'POST',
            credentials: "include",
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
            credentials: "include",
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' }})
            .then(() => setReload(!reload))
    };

    const refreshForm = () => {
        document.getElementById("form").reset()
    }

    return (
        <div>
            <h1 className="ProfilePageTitle">Delivery Options</h1>
            <button className={"CategoriesHeaderButton CategoriesHeaderButtonText"} type={"button"} onClick={() => setForm("Add")} >Add</button>
            <div className={"TableBorder"}>
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
                        <td><button className={"CategoriesHeaderButton CategoriesHeaderButtonText TableButton"} type={"button"} onClick={() => {setSelectedLocation(location); setId(location.id); setForm("Edit"); refreshForm()}}>Edit</button></td>
                        <td><button className={"CategoriesHeaderButton CategoriesHeaderButtonText TableButton"} type={"button"} onClick={() => { deleteLocation(location.id) }}>Delete</button></td>
                    </tr>
                )}
                    </tbody>
                </table>
            </div>
            {form === "Add" &&
                <form onSubmit={addLocation}>
                    <h1>Name</h1>
                    <input className={"InputField"} type={"text"} onChange={e => setName(e.target.value)}/>
                    <h1>Phone Number</h1>
                    <input className={"InputField"} type={"text"} onChange={e => setPhoneNumber(e.target.value)}/>
                    <h1>Email</h1>
                    <input className={"InputField"} type={"text"} onChange={e => setEmail(e.target.value)}/>
                    <h1>Country</h1>
                    <input className={"InputField"} type={"text"} onChange={e => setCountry(e.target.value)}/>
                    <h1>County</h1>
                    <input className={"InputField"} type={"text"} onChange={e => setCounty(e.target.value)}/>
                    <h1>City</h1>
                    <input className={"InputField"} type={"text"} onChange={e => setCity(e.target.value)}/>
                    <h1>Address</h1>
                    <input className={"InputField"} type={"text"} onChange={e => setAddress(e.target.value)}/>
                    <h1>ZipCode</h1>
                    <input className={"InputField"} type={"text"} onChange={e => setZipCode(e.target.value)}/>
                    <br/>
                    <button className={"CategoriesHeaderButton CategoriesHeaderButtonText"} type={"submit"}>Submit</button>
                </form>
            }
            {form === "Edit" &&
                <form id="form" onSubmit={editLocation}>
                    <h1>New Name</h1>
                    <input className={"InputField"} type={"text"} defaultValue={selectedLocation.name} onChange={e => setName(e.target.value)}/>
                    <h1>New Phone Number</h1>
                    <input className={"InputField"} type={"text"} defaultValue={selectedLocation.phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
                    <h1>New Email</h1>
                    <input className={"InputField"} type={"text"} defaultValue={selectedLocation.email} onChange={e => setEmail(e.target.value)}/>
                    <h1>New Country</h1>
                    <input className={"InputField"} type={"text"} defaultValue={selectedLocation.country} onChange={e => setCountry(e.target.value)}/>
                    <h1>New County</h1>
                    <input className={"InputField"} type={"text"} defaultValue={selectedLocation.county} onChange={e => setCounty(e.target.value)}/>
                    <h1>New City</h1>
                    <input className={"InputField"} type={"text"} defaultValue={selectedLocation.city} onChange={e => setCity(e.target.value)}/>
                    <h1>New Address</h1>
                    <input className={"InputField"} type={"text"} defaultValue={selectedLocation.address} onChange={e => setAddress(e.target.value)}/>
                    <h1>New ZipCode</h1>
                    <input className={"InputField"} type={"text"} defaultValue={selectedLocation.zipCode} onChange={e => setZipCode(e.target.value)}/>
                    <br/>
                    <button className={"CategoriesHeaderButton CategoriesHeaderButtonText"} type={"submit"}>Submit</button>
                </form>
            }
        </div>
    );
};

export default DeliveryOptions;