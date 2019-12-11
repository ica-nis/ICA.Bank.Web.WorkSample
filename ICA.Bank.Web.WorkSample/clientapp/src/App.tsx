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
      <Switch>
        <Route path="/" exact component={PostList} />
        <Route path="/create" exact component={PostForm} />
        <Route path="/posts" exact component={PostList} />
        <Route path="/posts/:id" component={Post} />
      </Switch>
    </Router>
  );
};

export default App;
