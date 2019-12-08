import React from "react";
import Nav from "./components/Nav";
import PostList from "./components/PostList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/posts" exact component={PostList} />
      </Switch>
    </Router>
  );
};

// HOME ROUTE
const Home: React.FC = () => <h1>Home</h1>;

export default App;
