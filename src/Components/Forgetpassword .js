import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Forgetpassword = (props) => {
  const [credentials, setCredentials] = useState({ email: '', newPassword: '' });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/reset-password", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        newPassword: credentials.newPassword,  // Use correct newPassword field
      }),
    });

    const result = await response.json();
    console.log(result);

    if (result.success) {
      props.showalert("Password reset successfully", "success");
      navigate("/login"); // Redirect to login after password reset
    } else {
      props.showalert(result.message || "Failed to reset password", "danger");
    }
  };

  const onChangeHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <form onSubmit={handleClick}>
            <div className="mb-4" style={{ marginTop: "100px" }}>
              <h2 className="text-center">Reset Password</h2> {/* Updated heading */}
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
              <label htmlFor="newPassword" className="form-label">New Password</label> {/* Updated name attribute */}
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="newPassword"  // Updated to match credentials.newPassword
                  name="newPassword"  // Match the state field name
                  value={credentials.newPassword}  // Use newPassword here
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
              <button type="submit" className="btn btn-primary mb-3">Reset Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgetpassword;
