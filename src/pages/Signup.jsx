import React, { useState } from "react";
import styles from "./signup.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [signupuser, setSignupuser] = useState({
    username: "",
    email: "",
    password: "",
    phoneno: "",
    gender: "",
    dob: "",
    agreement: false,
  });

  const navitage = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupuser({
      ...signupuser,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const signupFormSubmit = (e) => {
    e.preventDefault();
    // console.log(signupuser);
    if (signupuser.agreement) {
      axios
        .post("http://localhost:4040/users", signupuser) //payload
        .then(() => {
          console.log("data sent successfully");
          toast.success("signup successfully..!");
          //clearing input field
          setSignupuser({
            username: "",
            email: "",
            password: "",
            phoneno: "",
            gender: "",
            dob: "",
            agreement: false,
          });
          navitage("/login"); //navigate to login component
        })
        .catch((err) => {
          console.log("Error", err);
        });
    } else {
      toast.error("please accept the agreement..!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1>Signup</h1>
        <form onSubmit={signupFormSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              value={signupuser.username}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={signupuser.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={signupuser.password}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="phoneno">Phone Number</label>
            <input
              type="tel"
              id="phoneno"
              name="phoneno"
              placeholder="Enter phone number"
              minLength={10}
              maxLength={10}
              value={signupuser.phoneno}
              onChange={handleChange}
            />
          </div>

          <div className={styles.radioGroup}>
            <label>Gender</label>

            <label htmlFor="male">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={signupuser.gender === "male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label htmlFor="female">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={signupuser.gender === "female"}
                onChange={handleChange}
              />
              Female
            </label>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={signupuser.dob}
              onChange={handleChange}
            />
          </div>

          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              name="agreement"
              checked={signupuser.agreement}
              onChange={handleChange}
            />
            <span>Agree & Continue</span>
          </div>

          <button type="submit" className={styles.submitButton}>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
