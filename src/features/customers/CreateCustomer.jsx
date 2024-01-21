import { useState } from "react";
import { useDispatch } from "react-redux";
import { fullnameNationalId } from "./CustomerSlice";

import Button from "../../components/Button";

function CreateCustomer() {
  const [value, setValue] = useState({ name: "", id: "" });
  const setValues = (e) =>
    setValue((data) => ({ ...data, [e.target.name]: e.target.value }));

  const dispatch = useDispatch();

  function handleCustomer() {
    if (!value.name || !value.id) return;
    dispatch(fullnameNationalId(value.name, value.id));
  }
  return (
    <div className="inputs">
      <h2>Create new Customer</h2>
      <div>
        <div>
          <label htmlFor="name"> Customer full name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={value.name}
            onChange={setValues}
          />
        </div>
        <div>
          <label htmlFor="id"> National ID: </label>
          <input
            type="text"
            id="id"
            name="id"
            value={value.id}
            onChange={setValues}
          />
        </div>

        <Button
          label="Create new customer"
          clickFunction={handleCustomer}
          disabled={!value.name || !value.id}
        />
      </div>
    </div>
  );
}

export default CreateCustomer;
