import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

const Form = () => {
  const [formState, setFormstate] = useState({
    name: "",
    size: "",
    sauce: "original",
    pepperoni: true,
    sausage: false,
    bacon: false,
    mushrooms: false,
    special: "",
  });
  const [errorState, setErrorstate] = useState({
    name: "",
    size: "",
    sauce: "",
    pepperoni: "",
    sausage: "",
    bacon: "",
    mushrooms: "",
    special: "",
  });
  const formSchema = yup.object().shape({
    name: yup.string().min(2).required("Name is required"),
    size: yup.string().required("Size is required"),
    sauce: yup.string().required("Sauce is required"),
    pepperoni: yup.boolean(),
    sausage: yup.boolean(),
    bacon: yup.boolean(),
    mushrooms: yup.boolean(),
    instructions: yup.string(),
  });
  const handleChange = (e) => {};
  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrorstate({ ...errorState, [e.target.name]: "" });
      })
      .catch((err) => {
        setErrorstate({ ...errorState, [e.target.name]: err.errors[0] });
      });
  };
  const submitForm = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
  };
  return (
    <form onSubmit={submitForm}>
      <div>
        <label htmlFor="name">
          Name
          <input type="text" id="name" name="name" placeholder="name" />
        </label>
      </div>
      <div>
        <label htmlFor="size">
          Size
          <select id="size" name="size">
            <option value="">--Choose--</option>
            <option value="personal">Personal</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
      </div>
      <div>
        <label htmlFor="original">
          <input type="radio" name="sauce" id="original" value="original" checked />
          original
        </label>
        <label htmlFor="alfredo">
          <input type="radio" name="sauce" id="alfredo" value="alfredo" />
          alfredo
        </label>
      </div>
      <div>
        <label htmlFor="pepperoni">
          <input type="checkbox" id="pepperoni" name="pepperoni" />
          pepperoni
        </label>
        <label htmlFor="sausage">
          <input type="checkbox" id="sausage" name="sausage" />
          sausage
        </label>
        <label htmlFor="bacon">
          <input type="checkbox" id="bacon" name="bacon" />
          bacon
        </label>
        <label htmlFor="mushrooms">
          <input type="checkbox" id="mushrooms" name="mushrooms" />
          mushrooms
        </label>
      </div>
      <div>
        <label htmlFor="special">
          special instructions
          <input type="text" id="special" name="special" placeholder="special instructions" />
        </label>
      </div>
      <div>
        <button>Order Now!</button>
      </div>
    </form>
  );
};

export default Form;
