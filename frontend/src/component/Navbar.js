import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import pic1 from "../image/pic1.jpeg";
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
              <svg
                width="2em"
                height="2em"
                viewBox="0 0 16 16"
                class="bi bi-person"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                />
              </svg>
              {this.state.fName}
            </DropdownToggle>
            <DropdownMenu aria-labelledby="dropdownMenuButton">
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
          <img src={pic1} width="30px" />
          <Link to={"/main"} class="navbar-brand">
            To-DO WEB
          </Link>
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

          <div
            className="collapse navbar-collapse justify-content-md-center"
            id="navbarsExample10"
            style={{ marginLeft: "700px" }}
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
