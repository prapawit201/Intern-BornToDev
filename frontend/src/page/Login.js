import React from "react";
import "../App.css";
import Navbar from "../component/Navbar";
import { Button } from "reactstrap";
import Swal from "sweetalert2";
import { login } from "../component/UserFunction";
import { Link } from "react-router-dom";
export default class main extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    login(user).then((res) => {
      if (res) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your are Logged in",
          showConfirmButton: false,
          timer: 1300,
        });
        this.props.history.push(`/main`);
      }
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div id="container">
          <div
            class="col-6 col-md-4"
            style={{
              marginLeft: "33%",
              // boxShadow: "0 30px 50px rgba(0,0,0,.2)",
              padding: "2%",
              // borderRadius: "5px",
            }}
          >
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username : </label>
                <input
                  type="username"
                  className="form-control"
                  name="username"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password : </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <center>
                {" "}
                <Button type="submit" outline color="info">
                  Login
                </Button>
                <Link
                  to="/register"
                  type="button"
                  class="btn btn-outline-light"
                >
                  Register
                </Link>
              </center>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
