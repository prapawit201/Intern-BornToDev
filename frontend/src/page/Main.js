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
        <div style={{ marginLeft: "50px", marginRight: "50px" }}>
          <div class="row" style={{ marginTop: "150px" }}>
            <div
              class="col-sm-4"
              style={{
                backgroundColor: "#FBF1D5",
                height: "500px",
                width: "300px",
              }}
            >
              .col-sm-4
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Cras justo odio</li>
                <li class="list-group-item">Dapibus ac facilisis in</li>
                <li class="list-group-item">Morbi leo risus</li>
                <li class="list-group-item">Porta ac consectetur ac</li>
                <li class="list-group-item">Vestibulum at eros</li>
              </ul>
            </div>
            <div
              class="col-sm-4"
              style={{
                backgroundColor: "#D1EAF5",
                height: "500px",
              }}
            >
              .col-sm-4
            </div>
            <div
              class="col-sm-4"
              style={{
                backgroundColor: "#FCDEE2",
                height: "500px",
              }}
            >
              .col-sm-4
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
