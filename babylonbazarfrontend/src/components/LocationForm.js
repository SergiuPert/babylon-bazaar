import React from 'react';
import {useState} from "react";

const LocationForm = (props) => {
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [country, setCountry] =useState("")
    const [county, setCounty] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [zipCode, setZipCode] = useState("")

    const setData = () => {
        props.setSelectedLocation((l) => ({ ...l, name: name }));
    };



    return (
        <div>

        </div>
    );
};

export default LocationForm;