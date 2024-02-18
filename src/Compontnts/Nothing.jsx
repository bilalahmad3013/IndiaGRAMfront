import React from 'react';

export default function Nothing({ comp }) {
  console.log(comp)
  const commonStyles = {
    height: "300px",
    width: "100%",
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
    flexDirection: "column",
    opacity: '0.6',
  };

  const marginTopValue = comp === "1" ? "-20px" : "180px";

  return (
    <div style={{ ...commonStyles, marginTop: marginTopValue }}>
      <i className="fa-solid fa-magnifying-glass fa-4x"></i>
      <h3>Nothing to show here.</h3>
    </div>
  );
}
