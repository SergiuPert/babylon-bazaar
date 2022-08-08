import './App.css';
import NavBar from "./components/NavBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import React from "react";
import {useEffect, useState} from "react";
import MainPage from "./components/MainPage";
import {useAtom} from "jotai";
import {USER_ATOM} from "./STORE";

function App() {
    const [username, setUserName] = useState('')
    const [userId, setUserId] = useState('')
    const [user, setUser] = useAtom(USER_ATOM)
  useEffect(() => {
    (
        async () => {
          const response = await fetch('https://localhost:7136/login/user', {
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' },
            credentials: 'include',
          });
          const content = await response.json();
          // setUserName(content.name);
          // setUserId(content.Id);
          setUser(content)
        }
    )();
  });

  const logout = async () => {
    await fetch('https://localhost:7136/login/logout', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })
    // setUserName('')
      setUser(null)
  }

  // if (user === null) {
  //     return <div>Loading...</div>
  // }


  return (
      <BrowserRouter>
        <NavBar user={user} setUser={setUser} logout={logout} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
