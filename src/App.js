import React, { useState } from "react";
import "./App.css";

function App() {
  // Add state for user information
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="App">
      <h1>Resume Builder</h1>
      {/* User Information Section */}
      <div className="userInfoSection">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
      </div>
      {/* Display user info in resumeSection */}
      <div className="resumeSection">
        <div className="userInfoDisplay">
          <h2>{name}</h2>
          <p>
            {email && <span>{email}</span>}
            {email && phone && <span> | </span>}
          </p>
        </div>
      </div>
      <div className="resumeSection">
        <h2>Experience</h2>
        <p>Experience Placeholder</p>
        <button>Add Experience</button>
        <br></br>
      </div>
      <div className="resumeSection">
        <h2>Education</h2>
        <p>Education Placeholder</p>
        <button>Add Education</button>
        <br></br>
      </div>
      <div className="resumeSection">
        <h2>Skills</h2>
        <p>Skill Placeholder</p>
        <button>Add Skill</button>
        <br></br>
      </div>
      <br></br>
      <button>Export</button>
    </div>
  );
}

export default App;


export default App;
