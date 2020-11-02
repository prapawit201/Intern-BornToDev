import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import pic from "../image/pic.jpeg";
import iconPerson from "../image/pic1.jpeg";

class Navbar extends React.Component {
  state = {
    fName: "",
  };

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      fName: decoded.fName,
    });
  }

  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push(`/login`);
  }

  render() {
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    );

    const userLink = (
      <ul className="navbar-nav">
        <li>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret style={{ paddingLeft: "150%" }}>
              <img src={iconPerson} alt="iconPerson" height="25px" />
              {this.state.fName}
            </DropdownToggle>
            <DropdownMenu aria-labelledby="dropdownMenuButton">
              {/* <DropdownItem>
                {" "}
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
              </DropdownItem> */}
              <DropdownItem>
                {" "}
                <Link to="/setting" className="nav-link">
                  Setting
                </Link>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                {" "}
                <a
                  href=""
                  onClick={this.logOut.bind(this)}
                  className="nav-link"
                >
                  Logout
                </a>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </li>
      </ul>
    );
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">
            Navbar
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  Home <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Features
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link disabled"
                  href="#"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  Disabled
                </a>
              </li>
            </ul>
          </div>
          <div
            className="collapse navbar-collapse justify-content-md-center"
            id="navbarsExample10"
          >
            <ul className="navbar-nav"></ul>
            {localStorage.usertoken ? userLink : loginRegLink}
          </div>
        </nav>
      </div>
    );
  }
}
export default withRouter(Navbar);
