import React, { useState } from "react";

const AddExperience = ({ onCancel }) => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const experience = {
      title,
      company,
      start_date: startDate,
      end_date: endDate,
      description,
      logo,
    };

    try {
      const response = await fetch("http://localhost:5000/resume/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(experience),
      });

      if (!response.ok) throw new Error("Failed");

      const data = await response.json();
      setMessage(`Experience added! ID: ${data.id}`);
    } catch (error) {
      setMessage("Error submitting experience.");
    }
  };

  return (
    <div className="experienceForm">
      <div className="form-row">
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      <div className="form-row">
        <input
          type="text"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Logo URL"
        value={logo}
        onChange={(e) => setLogo(e.target.value)}
      />
      <div className="form-actions">
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddExperience;
