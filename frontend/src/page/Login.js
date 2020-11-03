import React from "react";
import "../App.css";
import { Button } from "reactstrap";
import Swal from "sweetalert2";
import { login } from "../component/UserFunction";
import { Link } from "react-router-dom";
import pic2 from "../image/pic2.jpeg";
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
        <div id="container">
          <center>
            <img src={pic2} width="400px" height="400px" />
          </center>
          <div
            class="col-6 col-md-4"
            style={{
              marginLeft: "33%",
              width: "500px",
              height: "500px",
              padding: "2%",
            }}
          >
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group" style={{}}>
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
                <Button type="submit" outline color="success">
                  Login
                </Button>
                {"  "}
                <Link to="/register" type="button" class="btn btn-outline-info">
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
