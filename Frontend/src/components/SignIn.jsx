import { useEffect, useRef, useState } from "react";
import { useUser } from "../App";
import { NavLink, useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const SignIn = () => {
  const { currentPage, setCurrentPage } = useUser();
  const { userID, setUserID } = useUser();

  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [failLogin, setFailLogin] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: user,
      password: pwd,
    };

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Handle success
        const responseData = await response.json();
        console.log("Login data submitted successfully:", responseData);
        setFailLogin(false);
        // Store the accessToken and refreshToken in local storage
        localStorage.setItem("accessToken", responseData.accessToken);
        localStorage.setItem("userID", user);
        if (responseData.refreshToken) {
          // Store refreshToken if available
          localStorage.setItem("refreshToken", responseData.refreshToken);
        }

        // Navigate to home and set user context/state as needed
        navigate("/home");
        setCurrentPage("Home");
        setUserID(user);
        setSuccess(true);
      } else {
        // Handle error
        const errorData = await response.json();
        console.error("Error submitting login data:", errorData);
        setFailLogin(true);
      }
    } catch (error) {
      console.error("Error submitting login data:", error);
      setFailLogin(true);
    } finally {
      // Reset form fields regardless of the outcome
      setUser("");
      setPwd("");
      setMatchPwd(""); // Assuming this is part of your form, reset it as well
    }
  };

  return (
    <section className="flex justify-center min-h-screen items-center gap-[20px] w-screen pb-[10%]">
      <div className="flex-1 flex flex-col gap-10 items-center max-w-[600px] bg-blue-300 rounded-[5%]">
        <h1 className="formh1">Sign In</h1>

        {errMsg ||
          (failLogin && (
            <p
              ref={errRef}
              className={
                errMsg || failLogin
                  ? "errmsg text-red-500 bg-red-200 rounded-md mt-4 px-4"
                  : "offscreen"
              }
              aria-live="assertive"
            >
              Incorrect username or password.
              <br /> Please try again.
            </p>
          ))}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center"
        >
          <label htmlFor="username" className="formh2">
            Username:
            <p className={validName ? "" : "hidden"} />
            <p className={validName || !user ? "hidden" : ""} />
          </label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            className="text-black pl-1"
          />

          <label htmlFor="password" className="formh2">
            Password:
            {/* <img src={tick} className={`${validPwd ? "" : "hidden"} h-[20px] w-[20px]`} />
                    <img src={tick} className={`${validPwd || !pwd ? "hidden" : ""} h-[20px] w-[20px]`} /> */}
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            className="text-black pl-1"
          />

          <button
            onClick={handleSubmit}
            className="mt-8 bg-green-100 text-green-600 rounded-xl px-4 py-[2px]"
          >
            Sign In
          </button>
        </form>
        <div>
          <p className="text-center text-sm font-semibold text-gray-700 mb-2">
            Not registered yet? <br />
            <span className="ml-1 text-coral3">
              <NavLink
                to="/registration"
                onClick={() => setCurrentPage("Register")}
                className="underline text-green-700"
              >
                Register Now!
              </NavLink>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
