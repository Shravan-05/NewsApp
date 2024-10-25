import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const history = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": credentials.email,
        "password": credentials.password,
      }),
    });
    setCredentials('');
    const token = await response.json();
    if (token.success) {
      localStorage.setItem("token", token.authToken);
      props.showalert("Logged in successfully", "success");
      history("/");
    } else {
      props.showalert("Invalid credentials", "danger");
      setCredentials({email:'',password:''});
    }
  };

  const onChangeHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10"> {/* Responsive width */}
          <form onSubmit={handleClick}>
            <div className="mb-4" style={{ marginTop: "50px" }}>
              <h2 className="text-center">Login</h2> {/* Added heading for clarity */}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                aria-describedby="emailHelp"
                value={credentials.email}
                onChange={onChangeHandler}
                required
              />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={onChangeHandler}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary w-100 mb-3">Login</button> {/* Full width button */}
              <a href="/forgotpassword" className="btn btn-link">Forgot Password?</a> {/* Forgot Password button */}
            </div>
          </form>
          <div className="text-center mt-3">
            <p>Don't have an account? <a href="/signup" className="link-primary">Sign Up</a></p> {/* Link to Sign Up */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
