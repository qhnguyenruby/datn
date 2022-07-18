import { useState } from "react";
import "./index.css";
import { accountApi } from "../../api/account/account.api";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const [registerModel, setRegisterModel] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [warnemail, setwarnemail] = useState(false);
  const [warnusername, setwarnusername] = useState(false);
  const [warnpassword, setwarnpassword] = useState(false);

  const [eye, seteye] = useState(true);
  const [password, setpassword] = useState("password");
  const [type, settype] = useState(false);

  const inputEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setRegisterModel((lastValue) => {
      return {
        ...lastValue,
        [name]: value,
      };
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setwarnemail(false);
    setwarnpassword(false);
    setwarnusername(false);
    if (registerModel.email === "") {
      setwarnemail(true);
    } else if (registerModel.username === "") {
      setwarnusername(true);
    } else if (registerModel.password === "") {
      setwarnpassword(true);
    } else {
      const res = await accountApi.register(registerModel);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.resultObj);
        alert("Register Success");
        navigate("/login");
      } else {
        alert("Register Failed");
      }
    }
  };

  const Eye = () => {
    if (password === "password") {
      setpassword("text");
      seteye(false);
      settype(true);
    } else {
      setpassword("password");
      seteye(true);
      settype(false);
    }
  };

  return (
    <>
      <div className="form-register-container">
        <div className="card">
          <div className="text">
            <h3>Register Form</h3>
            <p>Enter your information to register your account.</p>
          </div>
          <form onSubmit={submitForm}>
            <div className="input-text">
              <span>Username:</span>
              <input
                type="text"
                className={` ${warnusername ? "warning" : ""}`}
                placeholder="Enter your username"
                value={registerModel.username}
                onChange={inputEvent}
                name="username"
              />
              <i className="fa fa-envelope"></i>
            </div>
            <div className="input-text">
              <span>Email:</span>
              <input
                type="text"
                className={` ${warnemail ? "warning" : ""}`}
                placeholder="Enter your email"
                value={registerModel.email}
                onChange={inputEvent}
                name="email"
              />
              <i className="fa fa-envelope"></i>
            </div>
            {/* <div className="input-text">
              <span>Phone Number:</span>
              <input
                type="text"
                className={` ${warnphonenumber ? "warning" : ""}`}
                placeholder="Enter your phone number"
                value={registerModel.phoneNumber}
                onChange={inputEvent}
                name="phoneNumber"
              />
              <i className="fa fa-envelope"></i>
            </div> */}
            <div className="input-text">
              <span>Password:</span>
              <input
                type={password}
                className={` ${warnpassword ? "warning" : ""} ${
                  type ? "type_password" : ""
                }`}
                placeholder="Enter your password"
                value={registerModel.password}
                onChange={inputEvent}
                name="password"
              />
              <i className="fa fa-lock"></i>
              <i
                onClick={Eye}
                className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}
              ></i>
            </div>
            <div className="buttons">
              <button type="submit">Sign up</button>
            </div>
            <div className="sign-in">
              {/* <p>
                Not a member ? <a href="#">Sign up now</a>
              </p> */}
              Have already an account?<Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
