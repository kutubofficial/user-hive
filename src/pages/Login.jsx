import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [registerdUser, setRegisterdUser] = useState(null);
  useEffect(() => {
    async function getsignupUsers() {
      let { data } = await axios.get("http://localhost:4040/users");
      // console.log(data);
      setRegisterdUser(data); //storing data to state
    }
    getsignupUsers();
  }, []);
  const navitage = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    const authUser = registerdUser?.find((user) => {
      return (
        user.email === formData.email && user.password === formData.password
      );
    });
    // console.log(authUser);

    //!FOR ADMIN ACSESS
    if (
      authUser?.email === "admin@gmail.com" &&
      authUser?.password === "admin123"
    ) {
      toast.success("Welcome Admin");
      navitage("/admin");
      sessionStorage.setItem("adminID", authUser.id);
    } else if (authUser) {
      //navigate to profile page
      toast.success("Welcome to your profile");
      navitage("/profile"); // navigate to home component
      sessionStorage.setItem("userID", authUser.id);
    } else {
      //popup
      toast.error("Not registerd.!");
      navitage("/signup"); //navigate to signup component
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
