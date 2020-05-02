import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Home from "./components/Home";
import Form from "./components/Form";

const App = () => {
  return (
    <div className="container">
      <nav className="flex justify-around py-2 border-b border-black">
        <h1 className="text-2xl">Lambda Eats</h1>
        <div>
          <NavLink to="/">
            <button className="rounded px-2 py-1 bg-red-600 text-white hover:bg-blue-600">
              home
            </button>
          </NavLink>{" "}
          <NavLink to="/pizza">
            <button className="rounded px-2 py-1 bg-red-600 text-white hover:bg-blue-600">
              order
            </button>
          </NavLink>
        </div>
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
