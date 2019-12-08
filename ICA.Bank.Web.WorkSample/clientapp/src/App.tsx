import React from "react";
import Nav from "./components/Nav";
import Post from "./components/Post";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/post" exact component={Post} />
      </Switch>
    </Router>
  );
};

// HOME ROUTE
const Home: React.FC = () => <h1>Home</h1>;

export default App;
