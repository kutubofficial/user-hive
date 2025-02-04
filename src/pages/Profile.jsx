import React, { useState, useEffect } from "react";
import axios from "axios";
import { userMedia } from "./profileData/userMedia";
import styles from "./profile.module.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const userID = sessionStorage.getItem("userID");

  useEffect(() => {
    async function getLoggedInUser() {
      try {
        const { data } = await axios.get(
          `http://localhost:4040/users/${userID}`
        );
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    getLoggedInUser();
  }, [userID]);

  return (
    <div className={styles.container}>
      <header className={styles.profile_header}>
        <h1>Hey, {userData?.username}! Welcome to your profile</h1>
      </header>
      <div className={styles.media_grid}>
        {userMedia?.map((media) => (
          <div className={styles.media_card} key={media.id}>
            <img
              src={media.url}
              alt={media.description}
              className={styles.media_image}
            />
            <div className={styles.media_content}>
              <h3>{media.description}</h3>
              <p className={styles.media_tags}>Tags: {media.tags.join(", ")}</p>
              <p className={styles.media_uploaded}>
                Uploaded At: {new Date(media.uploadedAt).toLocaleString()}
              </p>
              <p className={styles.media_likes}>Likes: {media.likes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;




// {userMedia.map((post) => (
//   <article key={post.id} className={styles.card}>
//     <img src={post.url} alt={post.description} className={styles.image} />
//     <div className={styles.content}>
//       <h3 className={styles.title}>{post.description}</h3>
//       <p className={styles.likes}>❤️ {post.likes} likes</p>
//       <ul className={styles.tags}>
//         {post.tags.map((tag, index) => (
//           <li key={index} className={styles.tag}>
//             #{tag}
//           </li>
//         ))}
//       </ul>
//       <div className={styles.comments}>
//         <h4>Comments</h4>
//         {post.comments.map((comment, index) => (
//           <p key={index}>
//             <strong>User {comment.userId}:</strong> {comment.text}
//           </p>
//         ))}
