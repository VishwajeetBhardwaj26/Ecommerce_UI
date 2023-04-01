import React, { useState } from "react";
import "./AddressForm.css";
import axios from "axios";
function AddressForm({ setClick, sum, updatedData1 }) {
  const [address, setAddress] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    let body = {
      userId: localStorage.getItem("UserId"),
      products: updatedData1,
      amount: sum,
      address: address,
    };
    await axios
      .post("http://localhost:3001/api/order/create", body, {
        headers: {
          token: localStorage.getItem("JWT"),
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          window.alert("Order Created Succesfully...")
        }
        // return  response;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="address-form-container">
      <div className="address-form-header">
        <h2>Enter your address</h2>
        <button
          className="close-button"
          onClick={() => {
            setClick(false);
          }}
        >
          <span className="close-icon">&times;</span>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Street Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddressForm;
