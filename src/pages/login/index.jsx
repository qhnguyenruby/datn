import { useState } from "react";
import "./index.css";
import { accountApi } from "../../api/account/account.api";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [loginModel, setLoginModel] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [warnemail, setwarnemail] = useState(false);
  const [warnpassword, setwarnpassword] = useState(false);

  const [eye, seteye] = useState(true);
  const [password, setpassword] = useState("password");
  const [type, settype] = useState(false);

  const inputEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLoginModel((lastValue) => {
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
    if (loginModel.email === "") {
      setwarnemail(true);
    } else if (loginModel.password === "") {
      setwarnpassword(true);
    } else {
      // await dispatch(login(loginModel));

      // if (accountState.token) {
      //   localStorage.setItem("token", accountState.token);
      //   navigate("/");
      // } else {
      //   alert("Invalid email or password");
      // }

      // const res = await accountApi.login(loginModel);
      // if (res.status === 200) {
      //   localStorage.setItem("token", res.data.resultObj);
      //   navigate("/report");
      // } else {
      //   alert("Invalid email or password");
      // }

      const res = await accountApi.login(loginModel);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.resultObj);
        // navigate("/");
        window.location.reload(false);
      } else {
        alert("Invalid email or password");
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
    <div className="form-login-container">
      <div className="card">
        <div className="text">
          <h3 style={{ background: "transparent", fontWeight: "bold" }}>
            Welcome Back
          </h3>
          <p>Enter your credentials to access your account.</p>
        </div>
        <form onSubmit={submitForm} style={{ background: "transparent" }}>
          <div className="input-text">
            <span style={{ background: "transparent" }}>Email:</span>
            <input
              type="text"
              className={` ${warnemail ? "warning" : ""}`}
              placeholder="Enter your email"
              value={loginModel.email}
              onChange={inputEvent}
              name="email"
            />
            {/* <i className="bi bi-envelope"></i> */}
            {/* <BsEnvelope className="fa fa-envelope" /> */}
          </div>
          <div className="input-text">
            <span style={{ background: "transparent" }}>Password:</span>
            <input
              type={password}
              className={` ${warnpassword ? "warning" : ""} ${
                type ? "type_password" : ""
              }`}
              placeholder="Enter your password"
              value={loginModel.password}
              onChange={inputEvent}
              name="password"
            />
            {/* <i className="bi bi-lock"></i>
              <i
                onClick={Eye}
                className={`bi ${eye ? "bi-eye-slash" : "bi-eye"}`}
              ></i> */}
          </div>
          <div className="buttons" style={{ background: "transparent" }}>
            <button type="submit">Sign in</button>
          </div>
          <div className="sign-up" style={{ background: "transparent" }}>
            {/* <p>
                Not a member ? <a href="#">Sign up now</a>
              </p> */}
            Don't have an account?{" "}
            <Link to="/register" style={{ background: "transparent" }}>
              {" "}
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
