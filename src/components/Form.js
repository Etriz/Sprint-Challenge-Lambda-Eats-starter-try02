import React from "react";

const Form = () => {
  return (
    <form>
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
