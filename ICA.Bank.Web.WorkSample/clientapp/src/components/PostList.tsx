import React, { useState, useEffect } from "react";

interface PostListProps {}

interface PostListState {
  id: number;
  heading: string;
  text: string;
}

const PostList = () => {
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
          <h1>{item.heading}</h1>
          <p>{item.text}</p>
        </div>
      ))}
    </>
  );
};

export default PostList;

////////////////////////
// CLASS COMPONENT
////////////////////////
// import React, { Component } from "react";

// interface State {
//   items: any;
// }

// class PostList extends Component<{}, State> {
//   state = {
//     items: [{ name: "hej" }]
//   };

//   async fetchData() {
//     try {
//       await fetch("http://localhost:3001/api/posts")
//         .then(response => response.json())
//         .then(responseData => {
//           console.log(responseData);
//           this.setState({
//             items: responseData.results
//           });
//         });
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   render() {
//     const { items } = this.state;
//     return (
//       <>
//         {items.map((item, index) => (
//           <h1 key={index}>{item.name}</h1>
//         ))}
//       </>
//     );
//   }
// }

// export default PostList;
