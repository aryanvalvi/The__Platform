import React from "react";

const Login = () => {
  const ClickGoole = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };
  return (
    <div>
      <button onClick={ClickGoole}>Login</button>
    </div>
  );
};

export default Login;
