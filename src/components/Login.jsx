import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setisLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Something Went Wrong");
      console.error(error);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something Went Wrong");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center my-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-sm">
          {isLogin ? "Login" : "Signup"}
        </legend>

        {!isLogin && (
          <>
            <label className="label">First Name</label>
            <input
              type="text"
              className="input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
            />
            <label className="label">Last Name</label>
            <input
              type="text"
              className="input"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
          </>
        )}

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="text-red-600  font-medium">{error}</p>
        <button
          className="btn btn-neutral mt-2"
          onClick={isLogin ? handleLogin : handleSignup}
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        <p
          className="text-[15px] font-medium mt-2   cursor-pointer"
          onClick={() => setisLogin((value) => !value)}
        >
          {isLogin ? "New Users? Signup Here" : "Existing User? Login Here"}
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
