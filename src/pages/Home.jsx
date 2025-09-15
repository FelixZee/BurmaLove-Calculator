import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Home = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name1 || !name2) return;
    // navigate to /result with state
    navigate("/result", { state: { name1, name2 } });
  };

  return (
    <div className="container">
      <div className="card">
        <h2>💕 Love Calculator 💕</h2>
        <label>Your Name</label>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
        />
        <label>Partner's Name</label>
        <input
          type="text"
          placeholder="Enter Partner's Name"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
        /> <br />
              <button onClick={handleSubmit}>Love Calculate 💖</button><br /><br />
              <hr />
              <p style={{ fontSize: "12px", marginTop: "15px", color: "gray" }}>
  Note: This calculator is just for fun and entertainment purposes only 😄
</p>
          </div>
          
    </div>
  );
};

export default Home;
