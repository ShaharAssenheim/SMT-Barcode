import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import "./App/App.css";

const InputUsername = ({ selectUserName }) => {
  const [wn, setWN] = useState(""); //should be "" if we want to get userName.
  const [password, setPassword] = useState("");

  const Login = async () => {
    const API =
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_Server_ADDRESS_Production
        : process.env.REACT_APP_Server_ADDRESS;
    await fetch(API + "/auth/Login", {
      method: "POST",
      body: JSON.stringify({
        WN: wn,
        Password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((res) => {
            selectUserName(wn, password, res.Name);
            localStorage.setItem("token", res.data);
          });
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid item xs={12} md={6} lg={6}>
        <div className="inputBox">
          {
            <input
              type="text"
              onChange={(e) => setWN(e.target.value)}
              value={wn}
              className="input"
              placeholder="מספר עובד"
            />
          }
          {
            <input
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="input"
              placeholder="סיסמה"
            />
          }
          <button className="btn" onClick={() => Login()}>
            התחבר
          </button>
        </div>
      </Grid>
    </Box>
  );
};

export default InputUsername;
