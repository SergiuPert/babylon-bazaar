import React, {useState} from 'react';
import {useAtom} from "jotai";
import {USER_ATOM} from "../STORE";
import axios from "axios";

const EditProfile = () => {
    const [user] = useAtom(USER_ATOM)

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
        formData.append("_file", file);
        console.log(formData["_file"]);
        submitForm("multipart/form-data", formData, (msg) => console.log(msg));
    }
    const uploadWithJSON = async ()=>{
        const toBase64 = _file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(_file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
        const data = { image: await toBase64(file) }
        submitForm("application/json", data, (msg) => console.log(msg));
    }
    const submit = async (e) => {
        e.preventDefault()
        if (image !== "") { await uploadWithFormData()
            // const formData = new FormData();
            // formData.append("image", image);
            // const response = await fetch('https://localhost:7136/user/savephoto', {
            //         method: "POST",
            //         headers: {'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': 'http://localhost:3000'},
            //         body: formData
            //     });
            // const content = response.json( )

            // try one or the other
            // uploadWithFormData()
            // uploadWithJSON()
        }
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
    }
const getImage=(image)=>{setFile(image);setImage(image.name)}

    return (
        <div>
            <form onSubmit={submit}>
                <h1 className="ProfilePageTitle">Edit Profile</h1>
                <p>Username</p>
                <input type="text" placeholder={user.name} onChange={e => setName(e.target.value)}  />
                <p>Email</p>
                <input type="email" placeholder={user.email} onChange={e => setEmail(e.target.value)}  />
                <p>Password</p>
                <input type="password" placeholder={user.password} onChange={e => setPassword(e.target.value)}  />
                <p>Profile Image</p>
                <input type="file" onChange={e => getImage(e.target.files[0])}  />
                <button type="submit">Submit</button>


            </form>
        </div>
    );
};

export default EditProfile;