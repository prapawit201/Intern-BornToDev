import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import Navbar from "../component/Navbar";
import { Link } from "react-router-dom";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      fName: "",
      username: "",
      errors: {},
    };
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      fName: decoded.fName,
      lName: decoded.lName,
      username: decoded.username,
    });
  }

  render() {
    return (
      <div>
        <Navbar />{" "}
        <div style={{ float: "right", marginRight: "50px", marginTop: "50px" }}>
          <button type="button" class="btn btn-outline-primary">
            Add To-Do-List
          </button>
        </div>
      </div>
    );
  }
}

export default Main;
