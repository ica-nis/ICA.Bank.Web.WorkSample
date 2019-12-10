import React, { useState, useEffect } from "react";

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
  timestamp?: number | string;
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
      console.log(singlePost);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>{singlePost.heading}</h1>
      <h4>{singlePost.subheading}</h4>
      <p>{singlePost.text}</p>
      <p>{singlePost.author}</p>
      <p>{singlePost.email}</p>
      <p>{singlePost.timestamp}</p>
    </>
  );
};

export default Post;
