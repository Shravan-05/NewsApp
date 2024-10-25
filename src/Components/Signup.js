import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const history = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onChangeHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (credentials.password !== credentials.cpassword) {
      props.showalert("Passwords do not match", "danger");
      return;
    }

    // API call to backend for signup
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password
      })
    });

    const res = await response.json();
    if (res.success) {
      // Save the authToken and redirect to home
      props.showalert("Account created successfully", "success");
      history('/login');
    } else {
      props.showalert(res.error || "Invalid credentials", "danger");
      setCredentials({name:'',email:'',password:'',cpassword:''});
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <form onSubmit={handleClick}>
            <div className="mb-4" style={{ marginTop: "50px" }}>
              <h2 className="text-center">Sign Up</h2>
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={credentials.name}
                onChange={onChangeHandler}
                required
                minLength={3}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={credentials.email}
                onChange={onChangeHandler}
                required
              />
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
                  minLength={5}
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

            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">Confirm Password</label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  id="cpassword"
                  name="cpassword"
                  value={credentials.cpassword}
                  onChange={onChangeHandler}
                  required
                  minLength={5}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="text-center">
            <button type="submit" className="btn btn-primary mb-3  w-100">SignUp</button> {/* Full width button */}
          </div>          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
