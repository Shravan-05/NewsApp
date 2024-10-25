import React from "react";
import './Newsitem.css'
const NewsItem = (props) => {
  let { title, description, imagetoUrl, imageurl, author, time, source } = props;
  
  return (
    <div className="news-card-container">
      <div className="card news-card" id={imagetoUrl}>
        <img
          src={
            imagetoUrl
              ? imagetoUrl
              : "https://th.bing.com/th/id/OIP.eGosTpNrtZzGKRqUqt8tvQHaEK?w=321&h=180&c=7&r=0&o=5&pid=1.7"
          }
          className="card-img-top img-fluid"
          alt="News Thumbnail"
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <span
            className="badge rounded-pill"
            style={{
              backgroundColor: "#28a745", // Green background for the badge
              color: "#fff", // White text for better contrast
              position: "absolute",
              top: "0", // Adjusted top position
              right: "0", // Adjusted right position
              zIndex: 1, // Ensure it appears on top
              padding: "8px 12px", // Added padding for better visibility
              minWidth: "100px", // Minimum width to prevent wrapping
              textAlign: "center", // Center align text
            }}
          >
            {source ? source.slice(0, 20) : "Unknown Source"}
          </span>
          <h5 className="card-title" style={{ fontWeight: "bold", color: "#333" }}>
            {title ? title.slice(0, 88) : "Untitled News"}...
          </h5>
          <p className="card-text" style={{ fontSize: "14px", color: "#555" }}>
            {description ? description.slice(0, 88) : "No description available"}...
          </p>
          <p className="card-text">
            <small className="text-muted">By {author ? author : "Unknown Author"}</small>
          </p>
          <p className="card-text">
            <small className="text-muted">Published At {new Date(time).toGMTString()}</small>
          </p>
          <a href={imageurl} className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
