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
import {REFRESH, USER_ATOM} from "./STORE";
import About from "./components/About";
import Privacy from "./components/Privacy";
import Contact from "./components/Contact";

function App() {
    const [username, setUserName] = useState('')
    const [user, setUser] = useAtom(USER_ATOM)
    const [userId, setUserId] = useState('')
    const [refresh] = useAtom(REFRESH)

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
  }, [userId, refresh]);

  const logout = async () => {
    await fetch('https://localhost:7136/login/logout', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })
    // setUserName('')
      setUser(null);
      setUserId('')
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
              <Route path="/login" element={<Login setUserId={setUserId} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />}/>
              <Route path="/contact" element={<Contact />}/>
          </Routes>
          <Footer />
      </BrowserRouter>
  );
}

export default App;
