import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface PostListProps {}

interface PostListState {
  id: number;
  heading: string;
  text: string;
}

const PostList: React.FC = () => {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState<PostListState[]>([]);

  const fetchItems = async () => {
    try {
      const data = await fetch("http://localhost:3001/api/posts");
      const items = await data.json();
      setItems(items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {items.map(item => (
        <div key={item.id}>
          <h1>
            <Link to={`/posts/${item.id}`}>{item.heading}</Link>
          </h1>
          <p>{item.text}</p>
        </div>
      ))}
    </>
  );
};

export default PostList;
