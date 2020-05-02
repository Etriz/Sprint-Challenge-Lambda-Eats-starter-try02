import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Form from "./components/Form";

const App = () => {
  return (
    <div>
      <h1>Lambda Eats</h1>
      <p>You can remove this code and create your own header</p>
      <Switch>
        <Route to="/">
          <Home />
        </Route>
        <Route to="/pizza">
          <Form />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
