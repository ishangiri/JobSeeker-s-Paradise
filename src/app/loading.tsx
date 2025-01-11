import React, { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#1e293b",
    width: 200,
  };

  const loading = true;
  let color = "#1e293b";
  let size = 200;
  let speed = 2;

  return (
    <div className="flex items-center justify-center h-screen ">
      <ClipLoader
        loading={loading}
        color={color}
        size={size}
        cssOverride={override}
        speedMultiplier={speed}
        
      />
    </div>
  );
};

export default Loading;
