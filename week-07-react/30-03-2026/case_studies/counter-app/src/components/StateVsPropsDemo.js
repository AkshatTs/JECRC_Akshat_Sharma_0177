import React, { useState } from "react";

function DisplayCard({ title, value, onChange, style, step }) {
  const [internalCount, setInternalCount] = useState(0);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "20px",
        margin: "10px",
        width: "220px",
        textAlign: "center",
        ...style,
      }}
    >
      <h3>{title}</h3>
      <p>Props Value from Parent: {value}</p>
      <p>Internal Count: {internalCount}</p>

      <button
        onClick={() => {
          setInternalCount(internalCount + 1);
        }}
        style={{ marginRight: "10px" }}
      >
        Update Internal Count
      </button>

      <button
        onClick={() => {
          onChange(value + step);
        }}
      >
        Update Parent Count
      </button>
    </div>
  );
}

function StateVsPropsDemo() {
  const [parentCount, setParentCount] = useState(0);
  const [parentStep, setParentStep] = useState(1);
  const [displayColor, setDisplayColor] = useState("lightblue");

  const handleParentCountChange = (newCount) => {
    setParentCount(newCount);
    setDisplayColor(newCount % 2 === 0 ? "lightblue" : "lightcoral");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>State vs Props Demo</h2>

      <p>Parent Count: {parentCount}</p>

      <button
        onClick={() => setParentStep(parentStep + 1)}
        style={{ margin: "10px" }}
      >
        Increase Step (Current: {parentStep})
      </button>

      <button
        onClick={() =>
          setDisplayColor(
            displayColor === "lightblue" ? "lightcoral" : "lightblue"
          )
        }
        style={{ margin: "10px" }}
      >
        Toggle Display Color
      </button>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        <DisplayCard
          title="Child Component 1 Counter Card"
          value={parentCount}
          onChange={handleParentCountChange}
          step={parentStep}
          style={{ backgroundColor: displayColor }}
        />

        <DisplayCard
          title="Child Component 2 Counter Card"
          value={parentCount}
          onChange={handleParentCountChange}
          step={parentStep}
          style={{ backgroundColor: displayColor }}
        />
      </div>
    </div>
  );
}

export default StateVsPropsDemo;