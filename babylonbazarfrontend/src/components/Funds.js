import React, {useState} from 'react';
import axios from "axios";

const Funds = () => {


    return (
        <div className="registerForm">
            <form onSubmit={submit}>
                <h1>Register</h1>
                <input placeholder="Username" onChange={e => setName(e.target.value)} required />
                <br/>
                <input type="email" placeholder="Email address" onChange={e => setEmail(e.target.value)} required />
                <br/>
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
                <br/>
                <button type="submit">Register</button>
                {/*adjust the form*/}
            </form>
        </div>
    );
};

export default Funds;