import React from "react";
import "./skeleton.scss"; // Import custom styles for skeletons

interface SkeletonLoaderProps {
  count?: number; // Number of skeletons to display
  height?: string; // Height of each skeleton
  width?: string; // Width of each skeleton
  borderRadius?: string; // Border radius for smoothness
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  count = 6,
  height = "200px",
  width = "300px",
  borderRadius = "10px",
}) => {
  return (
    <div className="skeleton-container">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="skeleton"
          style={{ height, width, borderRadius }}
        ></div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
