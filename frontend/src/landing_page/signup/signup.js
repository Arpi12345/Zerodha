import React, { useState } from 'react';
import Card from '@mui/material/Card';
import { TextField } from '@mui/material';
import { Link } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;  
const DASH_URL =  process.env.REACT_APP_DASH_URL;// backend signup API

const Signup = () => {

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };


  const handleLoginClick = (e) => { 
    e.preventDefault();
     window.location.href = DASH_URL;
    }
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
       const response = await axios.post(`${API_URL}/signup`, user);

      if (response.status === 200 || response.status === 201) {
        alert("Signup successful! Please log in.");
        setUser({ email: "", username: "", password: "" });

        // ✅ redirect to frontend login page
            window.location.href = DASH_URL;

       
      }
    } catch (error) {
      console.error("Signup error", error)    


      if (error.response) {
        alert(error.response.data.message || "Signup failed.");
      } else {
        alert("Server not reachable. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <main>
        <div className="container" style={{ backgroundColor: "rgb(70, 68, 66)" }}>
          <div className="row m-3 p-3 ">
            <div className='col-6'>
              <div className="signup-image">
                <img src="media/images/signup.jpg" alt="signup"
                  width="500" height="500"
                  style={{ border: "5px solid Black", borderRadius: "10px" }} />
              </div>
            </div>

            <div className='col-6'>
              <Card style={{ border: "5px solid Black", borderRadius: "10px" }}>
               <div className=' text-center mb-5 p-3'>
                  <h1 className="mt-5">Signup Form</h1>
                  <br />
                  <form onSubmit={handleSubmit}>
                    <div className='m-3 p-3'>
                      <label htmlFor="email">Email &nbsp; &nbsp;</label>
                      <TextField
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        value={user.email}
                        onChange={handleInput}
                        required
                      />
                    </div>

                    <div className='m-3 p-3'>
                      <label htmlFor="username">Username&nbsp; &nbsp;</label>
                      <TextField
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter your username"
                        value={user.username}
                        onChange={handleInput}
                        required
                      />
                    </div>

                    <div className='m-3 p-3'>
                      <label htmlFor="password">Password &nbsp; &nbsp;</label>
                      <TextField
                        type="password"
                        name="password"

                        id="password"
                        placeholder="Enter your password"
                        value={user.password}
                        onChange={handleInput}
                        required
                      />
                    </div>

                    <button
                      type='submit'
                      className="p-2 btn btn-primary fs-5 mb-5"
                      
                   style={{ width: "40%", margin: "0 auto" }}
                      disabled={loading}
                    >
                      {loading ? "Signing up..." : "Sign up"}
                    </button>

                    <h4>Already have an account?</h4>
                    <Link onClick={handleLoginClick}
                    
                      style={{
                        background: "none",
                        border: "none",
                        color: "#007bff",
                        textDecoration: "none",
                        cursor: "pointer"
                      }}
                    >
                      Login <LoginIcon />
                    </Link>
                  </form>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Signup;
