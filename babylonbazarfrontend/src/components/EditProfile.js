import React, {useState} from 'react';
import {useAtom} from "jotai";
import {REFRESH, USER_ATOM} from "../STORE";
import axios from "axios";

const EditProfile = (props) => {
    const [user] = useAtom(USER_ATOM)
    const [refresh, setRefresh] = useAtom(REFRESH)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")
    let [file, setFile] = useState();

    const submitForm = (contentType, data, setResponse) => {
        axios({
            url: `https://localhost:7136/user/savephoto`,
            method: 'POST',
            data: data,
            headers: {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        }).then((response) => { setResponse(response.data);
        }).catch((error) => { setResponse(error);
        })
    }
    const uploadWithFormData = async ()=>{
        const formData = new FormData();
        formData.append("target", "Users");
        formData.append("fileName", image)
        formData.append("_file", file);
        submitForm("multipart/form-data", formData, (msg) => console.log(msg));
    }
    const submit = async (e) => {
        e.preventDefault()
        if (image !== "") { await uploadWithFormData()}
        const credentials = await fetch('https://localhost:7136/user/editcredentials', {
                method: "POST",
                headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000'},
                credentials: 'include',
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    image
                })
            })
        props.setCurrentPage("Show Profile")
        setRefresh(!refresh)
    }
const getImage = (image) => {
        setFile(image);
        let fileName = image.name.split(".")
        let name = fileName[0] + Date.now().toString() + "." + fileName[1]
        setImage(name)
    }

    return (
        <div>
            <form onSubmit={submit}>
                <h1 className="ProfilePageTitle">Edit Profile</h1>
                <p>Username</p>
                <input className={"InputField"} type="text" defaultValue={user.name} onChange={e => setName(e.target.value)}  />
                <p>Email</p>
                <input className={"InputField"} type="email" defaultValue={user.email} onChange={e => setEmail(e.target.value)}  />
                <p>Password</p>
                <input className={"InputField"} type="password" onChange={e => setPassword(e.target.value)}  />
                <p>Profile Image</p>
                <input className={"InputField"} type="file" onChange={e => getImage(e.target.files[0])}  />
                <br/>
                <button className={"CategoriesHeaderButton CategoriesHeaderButtonText"} type="submit">Submit</button>


            </form>
        </div>
    );
};

export default EditProfile;