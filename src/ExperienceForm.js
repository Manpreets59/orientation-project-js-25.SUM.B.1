import { useState, useEffect } from "react";

const url = "http://127.0.0.1:5000/resume/experience";

function ExperienceForm() {
  const [inputValue, setInputValue] = useState("");
  const [experience, setExperience] = useState([]);
  const [buttonText, setButtonText] = useState("Save");

  async function getExperience() {
    const response = await fetch(url);
    const data = await response.json();

    if (response.status > 300) {
      console.log("Error in fetching");
      return;
    }

    setExperience(data);
    console.log(experience);

    setInputValue(
      data.length > 0
        ? Object.entries(data[data.length - 1])
            .map(([key, val]) => `${key}: ${val}`)
            .join("\n")
        : ""
    );
  }

  useEffect(() => {
    getExperience();
  }, []);

  async function submitHandler(e) {
    e.preventDefault();

    const parsed = {};
    inputValue.split("\n").forEach((line) => {
      const [key, value] = line.split(":").map((str) => str.trim());
      if (key && value !== undefined) {
        parsed[key] = value;
      }
    });

    const response = await fetch(`${url}/0`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed),
    });

    if (response.ok) {
      console.log("Submitted successfully");
      setInputValue("");
      setButtonText("Saved successfully");
      getExperience();
    } else {
      console.error("Failed to submit");
    }
  }

  return (
    <div>
      <form onSubmit={submitHandler} className="justify-content-center px-2">
        <textarea
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setButtonText("Save");
          }}
          rows={6}
          className="form-control mt-2"
        ></textarea>
        <br></br>
        <button className="form-control btn addbutton" type="submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default ExperienceForm;
