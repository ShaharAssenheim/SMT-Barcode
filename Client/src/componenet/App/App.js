import React, { Component } from "react";
import "./App.css";
import InputUsername from "../InputUsername";
import MyScanner from "../MyScanner";
import Footer from "../Partials/Footer";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      wn: "",
      password: "",
      Line: "",
      isFinish: false,
    };
  }

  selectUserName = (wn, password, name) => {
    this.setState({
      name: name,
      wn: wn,
      password: password,
    });
  };

  SaveToDB = async (line) => {
    const API =
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_Server_ADDRESS_Production
        : process.env.REACT_APP_Server_ADDRESS;
    await fetch(API + "/scan", {
      method: "POST",
      body: JSON.stringify({
        userName: this.state.name,
        Send_Date: new Date(),
        Line: line,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) this.SetFinish();
      })
      .catch((err) => console.error(err));
  };

  SetLine = (line) => {
    this.setState({
      Line: line,
    });

    this.SaveToDB(line);
  };

  SetFinish = () => {
    this.setState({
      isFinish: true,
    });
  };

  Restart = () => {
    window.location.reload();
  };

  // componentDidMount function to get question
  componentDidMount() {
    let auth = localStorage.getItem("token");
    if (auth === null || auth.length < 10) return;
    const API =
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_Server_ADDRESS_Production
        : process.env.REACT_APP_Server_ADDRESS;

    fetch(API + "/auth/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((res) => {
            this.selectUserName("", "", res.Name);
            localStorage.setItem("token", res.data);
          });
        }
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div className="Page-container">
        <div className="container">
          <div className="title">
            <Typography variant="h2" align="center">
              Line Barcode
            </Typography>
            <Typography variant="h6" gutterBottom align="center">
              {this.state.name}
            </Typography>
          </div>

          {this.state.name === "" ? (
            <InputUsername selectUserName={this.selectUserName} />
          ) : null}

          {this.state.name !== "" && this.state.Line.length === 0 ? (
            <MyScanner SetLine={this.SetLine} />
          ) : null}

          {this.state.isFinish === true ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={6}
            >
              <Grid
                container
                justifyContent="center"
                item
                xs={12}
                md={6}
                lg={4}
              >
                <Typography variant="h2" gutterBottom align="center">
                  {this.state.name}
                </Typography>
                <Typography variant="h4" gutterBottom align="center">
                  {"successfully Enter To " + this.state.Line}
                </Typography>
                <button className="btn" onClick={() => this.Restart()}>
                  Rescan
                </button>
              </Grid>
            </Box>
          ) : null}
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
