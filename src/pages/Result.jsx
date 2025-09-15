import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name1, name2 } = location.state || {};
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    if (!name1 || !name2) {
      navigate("/"); // no names → back to form
      return;
    }

    const combined = (name1 + name2).toLowerCase().replace(/ /g, "");
    let counts = {};
    for (let char of combined) {
      counts[char] = (counts[char] || 0) + 1;
    }

    let numbers = Object.values(counts);
    let stepList = [numbers];

    while (numbers.length > 2) {
      let temp = [];
      for (let i = 0; i < numbers.length / 2; i++) {
        let sum = numbers[i] + (numbers[numbers.length - 1 - i] || 0);
        if (sum >= 10) {
          temp.push(...String(sum).split("").map(Number));
        } else {
          temp.push(sum);
        }
      }
      numbers = temp;
      stepList.push(numbers);
    }

    let finalResult = parseInt(numbers.join(""));
    if (finalResult > 100) finalResult = 100;

    setResult(finalResult);
    setSteps(stepList);
    
  }, [name1, name2, navigate]);

   const getMessage = (score) => {
    if (score >= 90) {
      return "Your love is destined to shine across the whole world 🎉";
    } else if (score >= 75) {
      return "You both are deeply connected at heart ❤️";
    } else if (score >= 50) {
      return "This could be a good beginning 🙂";
    } else if (score >= 30) {
      return "There might be challenges, but with effort it can work.";
    } else {
      return "With this low compatibility, love may be difficult to start — but trust and effort can make a difference.";
    }
  };

  return (
      <div className="container">
          <div className="result-card">
              <h1>Result 💕</h1>
        <h3>
          {name1} ❤️ {name2}
        </h3>
        <p>Compatibility: {result}%</p>
         <progress value={result} max="100"></progress>
        <p>
          {result !== null ? getMessage(result) : "Calculating... "}
        </p>
        <hr />

        <h2>Your Calculation Steps 🔍</h2>

        <p>Here's how we calculated <b>{name1}</b> + <b>{name2}</b> = {result}%:</p>

<div>
  {steps.map((s, index) => (
    <div key={index} style={{ border: "1px solid #ddd", borderRadius: "10px",
            padding: "15px", marginBottom: "10px", background: "#fff",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)", textAlign: "left"
      }}>
          
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", }}>
              
            <div style={{ background: "green", color: "white", borderRadius: "50%",
                width: "28px", height: "28px", display: "flex", justifyContent: "center",
                alignItems: "center", marginRight: "10px",fontWeight: "bold" }}>
                    {index + 1}
            </div>
                <b style={{ color: "black", fontSize: "20px"}}>Step {index + 1}</b>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {s.map((num, i) => (
          <div key={i}
            style={{
              border: "1px solid #ccc",
              borderRadius: "6px",
              padding: "6px 10px",
              minWidth: "30px",
              color: "black",
              textAlign: "center",
              background: "#ffffff",
                }}>
            {num}
          </div>
            ))}
        </div>
    </div>
  ))}
</div>

<p style={{ fontSize: "12px", marginTop: "15px", color: "gray" }}>
  Note: This calculator is just for fun and entertainment purposes only 😄
</p>


        <button onClick={() => navigate("/")}>Try Again 🔄</button>
      </div>
    </div>
  );
};

export default Result;
