import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TranslateComponent from "./translate";
import './Navbar.css'; // Import custom CSS file for styling

const Navbar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Example useEffect to handle location changes (if needed)
  useEffect(() => {
    // You can implement any logic here based on location change
  }, [location]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActiveLink = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand gradient-text" to="/">
          Today's
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {localStorage.getItem("token") && (
              <>
                {["/", "/sport", "/business", "/entertainment", "/health", "/technology"].map((path) => (
                  <li className="nav-item" key={path}>
                    <Link
                      className={`nav-link ${isActiveLink(path) ? "active" : ""}`}
                      to={path}
                    >
                      {path === "/" ? "General" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                    </Link>
                  </li>
                ))}
              </>
            )}
          </ul>

          <div className="d-flex align-items-center">
            {localStorage.getItem("token") && (
              <input
                className="form-control me-2 search-input"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={props.onchangeHandler}
                value={props.text}
              />
            )}

            {localStorage.getItem("token") && (
              <div className="mx-2">
                <TranslateComponent />
              </div>
            )}

            <div className="d-flex">
              {!localStorage.getItem("token") ? (
                <form className="d-flex" role="search">
                  <Link className="btn btn-primary mx-2" to="/login" role="button">
                    Login
                  </Link>
                  <Link className="btn btn-primary mx-2" to="/signup" role="button">
                    Sign Up
                  </Link>
                </form>
              ) : (
                <button className="btn btn-danger mx-2" onClick={logout}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
