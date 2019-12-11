import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/postList.module.scss";

interface PostListProps {}

interface PostListState {
  id: number;
  heading: string;
  text: string;
  timestamp: number | string;
}

const PostList: React.FC<PostListProps> = () => {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState<PostListState[]>([]);

  const fetchItems = async () => {
    try {
      const data = await fetch("http://localhost:3001/api/posts");
      const items = await data.json();

      setItems(items);
      console.log("Right after items been sent to state", items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {items.map(item => (
        <div className={styles.container} key={item.id}>
          <Link to={`/posts/${item.id}`}>
            <div
              style={
                {
                  // border: "1px solid red"
                }
              }
            >
              <h1>{item.heading}</h1>
              <p>{new Date(item.timestamp).toLocaleDateString()}</p>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default PostList;
