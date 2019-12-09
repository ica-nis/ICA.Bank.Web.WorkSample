import React, { useState, useEffect } from "react";

interface SinglePostProps {
  match: any;
}

interface SinglePostState {
  id?: number;
  heading?: string;
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
      <h1>{singlePost.heading}</h1>
      <p>{singlePost.text}</p>{" "}
    </>
  );
};

export default Post;
