import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./admindashboard.module.css";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [allusers, setAllUsers] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    async function getAllRegistreduser() {
      const { data } = await axios.get("http://localhost:4040/users");
      // console.log(data);
      setAllUsers(data); //--------------
    }
    getAllRegistreduser();
  }, [toggle]);

  async function deleteUser(id) {
    try {
      await axios.delete(`http://localhost:4040/users/${id}`);
      toast.success("user deleted");
      setToggle(!toggle);
    } catch (error) {
      toast.error("unable to delete");
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>AdminDashboard</h1>
      <main>
        {allusers.map((user) => {
          if (
            user.email !== "admin@gmail.com" &&
            user.password !== "admin123"
          ) {
            return (
              <section key={user.id} className={styles.userCard}>
                <div className={styles.userInfo}>
                  <h3>Name: {user.username}</h3>
                  <h3>Email: {user.email}</h3>
                  <h3>Password: {user.password}</h3>
                  <h3>Phone no: {user.phoneno}</h3>
                  <h3>Gender: {user.gender}</h3>
                </div>
                <div className={styles.actions}>
                  <button className={`${styles.button} ${styles.editButton}`}>
                    <Link to={`/edit/${user.id}`}>Edit</Link>
                  </button>
                  <button
                    className={`${styles.button} ${styles.deleteButton}`}
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </section>
            );
          }
        })}
      </main>
    </div>
  );
};

export default AdminDashboard;
