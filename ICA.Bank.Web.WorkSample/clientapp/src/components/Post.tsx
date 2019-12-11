import React, { useState, useEffect } from "react";
import styles from "../styles/post.module.scss";

interface SinglePostProps {
  match: any;
}

interface SinglePostState {
  id?: number;
  heading?: string;
  subheading?: string;
  author?: string;
  email?: string;
  text?: string;
}

const Post: React.FC<SinglePostProps> = ({ match }) => {
  useEffect(() => {
    fetchSinglePost();
  }, []);

  const [singlePost, setSinglePost] = useState<SinglePostState>({});

  const fetchSinglePost = async () => {
    try {
      const fetchSinglePost = await fetch(
        `http://localhost:3001/api/posts/${match.params.id}`
      );
      const singlePost = await fetchSinglePost.json();
      setSinglePost(singlePost);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.heading}>{singlePost.heading}</h1>
        <div className={styles.categories}>
          <p>
            <span className={styles.bold}>{singlePost.author}</span>
          </p>
          <p className={styles.secound}>
            <span className={styles.bold}>{singlePost.email}</span>
          </p>
        </div>
        <h2 className={styles.subheading}>{singlePost.subheading}</h2>
        <p className={styles.text}>{singlePost.text}</p>
      </div>
    </>
  );
};

export default Post;
