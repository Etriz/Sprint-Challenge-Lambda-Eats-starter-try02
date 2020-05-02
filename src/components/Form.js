import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

const Form = () => {
  const [formState, setFormstate] = useState({
    name: "",
    size: "",
    sauce: "",
    cheese: true,
    pepperoni: false,
    sausage: false,
    bacon: false,
    mushrooms: false,
    special: "",
  });
  const [errorState, setErrorstate] = useState({
    name: "",
    size: "",
    sauce: "must choose a sauce",
    pepperoni: "",
    sausage: "",
    bacon: "",
    mushrooms: "",
    special: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [returnData, setReturnData] = useState({});
  //!end states
  const formSchema = yup.object().shape({
    name: yup.string().min(2).required("name is required"),
    size: yup.mixed().oneOf(["personal", "medium", "large"]).required("must choose a size"),
    sauce: yup.mixed().oneOf(["original", "alfredo"]).required("must choose a sauce"),
    cheese: yup.boolean(),
    pepperoni: yup.boolean(),
    sausage: yup.boolean(),
    bacon: yup.boolean(),
    mushrooms: yup.boolean(),
    special: yup.string().notRequired(),
  });
  const handleChange = (e) => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };
    validateChange(e);
    setFormstate(newFormData);
  };
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
  const clearForm = () => {
    setFormstate({
      name: "",
      size: "",
      sauce: "",
      cheese: true,
      pepperoni: false,
      sausage: false,
      bacon: false,
      mushrooms: false,
      special: "",
    });
  };
  const formSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    axios
      .post("https://reqres.in/api/users", formState)
      .then((res) => {
        // console.log(res.data);
        clearForm();
        setIsButtonDisabled(true);
        setErrorstate({
          name: "",
          size: "",
          sauce: "must choose a sauce",
          pepperoni: "",
          sausage: "",
          bacon: "",
          mushrooms: "",
          special: "",
        });
        setReturnData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(formState);
  }, [formState]);
  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      console.log("is it valid?", valid);
      return valid ? setIsButtonDisabled(false) : null;
    });
    //eslint-disable-next-line
  }, [formState]);

  return (
    <>
      <form onSubmit={formSubmit} className="container max-w-xl rounded border border-black my-6">
        <div className="bg-red-600 pt-2">
          <label htmlFor="name" className="block pl-2">
            name
            <input
              type="text"
              id="name"
              name="name"
              placeholder="name"
              value={formState.name}
              onChange={handleChange}
              className="block w-full p-2 -mx-1"
            />
          </label>
          {errorState.name.length > 0 ? (
            <p className="block px-2 mx-1 bg-white text-red-600">{errorState.name}</p>
          ) : null}
        </div>
        <div className="bg-red-600 pt-2">
          <label htmlFor="size" className="block pl-2">
            size
            <select
              id="size"
              name="size"
              onChange={handleChange}
              className="block w-full p-2 -mx-1">
              <option value="">--Choose--</option>
              <option value="personal">Personal</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </label>
          {errorState.size.length > 0 ? <p>{errorState.size}</p> : null}
        </div>
        <div className="bg-red-600 pt-2">
          <span className="px-2">select a sauce</span>
          <br />
          <label htmlFor="original" className="block pl-2 bg-white">
            <input
              type="radio"
              name="sauce"
              id="original"
              value="original"
              onChange={handleChange}
            />
            original
          </label>
          <label htmlFor="alfredo" className="block pl-2 bg-white">
            <input type="radio" name="sauce" id="alfredo" value="alfredo" onChange={handleChange} />
            alfredo
          </label>
          {errorState.sauce.value !== "" ? (
            <>
              <span className="block px-2 bg-white text-red-600"> {errorState.sauce}</span>
            </>
          ) : null}
        </div>
        <div className="bg-red-600 pt-2">
          <span className="px-2">add toppings</span>
          <br />
          <label htmlFor="cheese" className="block pl-2 bg-white">
            <input
              type="checkbox"
              id="cheese"
              name="cheese"
              checked={formState.cheese}
              onChange={handleChange}
            />
            cheese
          </label>
          <label htmlFor="pepperoni" className="block pl-2 bg-white">
            <input
              type="checkbox"
              id="pepperoni"
              name="pepperoni"
              checked={formState.pepperoni}
              onChange={handleChange}
            />
            pepperoni
          </label>
          <label htmlFor="sausage" className="block pl-2 bg-white">
            <input
              type="checkbox"
              id="sausage"
              name="sausage"
              checked={formState.sausage}
              onChange={handleChange}
            />
            sausage
          </label>
          <label htmlFor="bacon" className="block pl-2 bg-white">
            <input
              type="checkbox"
              id="bacon"
              name="bacon"
              checked={formState.bacon}
              onChange={handleChange}
            />
            bacon
          </label>
          <label htmlFor="mushrooms" className="block pl-2 bg-white">
            <input
              type="checkbox"
              id="mushrooms"
              name="mushrooms"
              checked={formState.mushrooms}
              onChange={handleChange}
            />
            mushrooms
          </label>
        </div>
        <div className="bg-red-600 pt-2">
          <label htmlFor="special" className="block pl-2">
            special instructions
            <input
              type="text"
              id="special"
              name="special"
              placeholder="special instructions"
              value={formState.special}
              onChange={handleChange}
              className="block w-full p-2 -mx-1"
            />
          </label>
        </div>
        <div className="bg-red-600 p-2">
          <button
            type="submit"
            disabled={isButtonDisabled}
            className="rounded px-2 py-1 bg-white hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-75">
            Order Now!
          </button>
        </div>
      </form>
      <pre>{JSON.stringify(returnData, null, 2)}</pre>
    </>
  );
};

export default Form;
