import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Form from "./components/Form";

const App = () => {
  return (
    <div>
      <nav>
        <h1>Lambda Eats</h1>
        <Link to="/">
          <button>home</button>
        </Link>
        <Link to="/pizza">
          <button>order</button>
        </Link>
      </nav>

      <Switch>
        <Route path="/pizza">
          <Form />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
