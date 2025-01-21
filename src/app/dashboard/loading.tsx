import React, { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#1e293b",
  };

  const loading = true;
  const color = "#1e293b";
  const size = 100; // Reduced size for a balanced UI
  const speed = 1.5;

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-blue-200">
      <div className="text-center">
        <ClipLoader
          loading={loading}
          color={color}
          size={size}
          cssOverride={override}
          speedMultiplier={speed}
        />
        <p className="mt-4 text-lg font-semibold text-gray-700 animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loading;