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
    sauce: "Must choose a sauce",
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
    name: yup.string().min(2).required("Name is required"),
    size: yup.mixed().oneOf(["personal", "medium", "large"]).required("Must choose a size"),
    sauce: yup.mixed().oneOf(["original", "alfredo"]).required("Must choose a sauce"),
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
          sauce: "Must choose a sauce",
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
      <form onSubmit={formSubmit}>
        <div>
          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              name="name"
              placeholder="name"
              value={formState.name}
              onChange={handleChange}
            />
          </label>
          {errorState.name.length > 0 ? <p>{errorState.name}</p> : null}
        </div>
        <div>
          <label htmlFor="size">
            Size
            <select id="size" name="size" onChange={handleChange}>
              <option value="">--Choose--</option>
              <option value="personal">Personal</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </label>
          {errorState.size.length > 0 ? <p>{errorState.size}</p> : null}
        </div>
        <div>
          <label htmlFor="original">
            <input
              type="radio"
              name="sauce"
              id="original"
              value="original"
              onChange={handleChange}
            />
            original
          </label>
          <label htmlFor="alfredo">
            <input type="radio" name="sauce" id="alfredo" value="alfredo" onChange={handleChange} />
            alfredo
          </label>
          {errorState.sauce.value !== "" ? (
            <>
              <br />
              <span> {errorState.sauce}</span>
            </>
          ) : null}
        </div>
        <div>
          <label htmlFor="cheese">
            <input
              type="checkbox"
              id="cheese"
              name="cheese"
              checked={formState.cheese}
              onChange={handleChange}
            />
            cheese
          </label>
          <label htmlFor="pepperoni">
            <input
              type="checkbox"
              id="pepperoni"
              name="pepperoni"
              checked={formState.pepperoni}
              onChange={handleChange}
            />
            pepperoni
          </label>
          <label htmlFor="sausage">
            <input
              type="checkbox"
              id="sausage"
              name="sausage"
              checked={formState.sausage}
              onChange={handleChange}
            />
            sausage
          </label>
          <label htmlFor="bacon">
            <input
              type="checkbox"
              id="bacon"
              name="bacon"
              checked={formState.bacon}
              onChange={handleChange}
            />
            bacon
          </label>
          <label htmlFor="mushrooms">
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
        <div>
          <label htmlFor="special">
            special instructions
            <input
              type="text"
              id="special"
              name="special"
              placeholder="special instructions"
              value={formState.special}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <button disabled={isButtonDisabled}>Order Now!</button>
        </div>
      </form>
      <pre>{JSON.stringify(returnData, null, 2)}</pre>
    </>
  );
};

export default Form;
