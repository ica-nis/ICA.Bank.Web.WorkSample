import React from "react";
import Nav from "./components/Nav";
import PostList from "./components/PostList";
import Post from "./components/Post";
import PostForm from "./components/PostForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Nav />
      <PostForm />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/posts" exact component={PostList} />
        <Route path="/posts/:id" component={Post} />
      </Switch>
    </Router>
  );
};

// HOME ROUTE
const Home: React.FC = () => <h1>Home</h1>;

export default App;
