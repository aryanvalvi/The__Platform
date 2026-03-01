import React from "react"
import "./skeleton.scss"

interface SkeletonLoaderProps {
  count?: number // Number of skeletons to display
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({count = 6}) => {
  return (
    <div className="skeleton-container">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="skeleton-card">
          {/* Image/Video skeleton */}
          <div className="skeleton-image"></div>

          {/* Hover strip skeleton */}
          <div className="skeleton-hover-strip">
            {/* Profile image skeleton */}
            <div className="skeleton-profile"></div>

            {/* Title text skeleton */}
            <div className="skeleton-title"></div>

            {/* Like section skeleton */}
            <div className="skeleton-like-section">
              <div className="skeleton-like-count"></div>
              <div className="skeleton-heart"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkeletonLoader
