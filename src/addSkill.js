// import { format } from 'prettier';
import React, { useState } from "react";
import "./App.css";

export default function AddSkill({ userId, setUserId }) {
  const [inputs, setInputs] = useState({ name: "", proficiency: "", logo: "" });
  const [alert, setAlert] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target; // Destructure name and value from the event target
    setInputs((prevInputs) => ({
      ...prevInputs, // Spread existing input values
      [name]: value, // Update the specific input field by its name
    }));
  };
  const updateList = (event) => {
    event.preventDefault(); //stop page refresh
    console.log("update to data base==========", inputs);
    // alert("experience saved!")

    const url = "http://localhost:5000/resume/skill";

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserId(data);
        console.log("response=====", data);
        if (data.error) {
          setAlert(data.error);
        } else {
          console.log("Skill saved successfully!");
          setInputs({ name: "", proficiency: "", logo: "" });
        }
      })
      .catch((err) => {
        console.log(err);

        console.log(err.message);
      });
  };
  console.table(inputs);
  return (
    <div className="App">
      <form onSubmit={updateList}>
        <div className="resumeSection">
          <label>
            Enter your name:
            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div className="resumeSection">
          <label>
            enter your proficiency:
            <input
              type="text"
              name="proficiency"
              value={inputs.proficiency}
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div className="resumeSection">
          <label>
            enter your Logo:
            <input
              type="text"
              name="logo"
              value={inputs.logo}
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        <p>{alert}</p>
      </div>
    </div>
  );
}
