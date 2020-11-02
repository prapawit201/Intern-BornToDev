import React, { Component } from "react";
import { register } from "../component/UserFunction";
import picRegis from "../image/pic.jpeg";
import Swal from "sweetalert2";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      fName: "",
      username: "",
      password: "",
      errors: null,
      status: 200,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      fName: this.state.fName,
      username: this.state.username,
      password: this.state.password,
    };

    register(newUser)
      .then((res) => {
        Swal.fire({
          title: "Success!",
          text: "Do you want to continue",
          icon: "success",
          confirmButtonText: "Cool",
        });
        this.props.history.push(`/main`);
        console.log(res);
      })
      .catch((error) => {
        // this.setState({ errors: "404 Error" });
        Swal.fire({
          title: "Error!",
          text: "Do you want to continue",
          icon: "error",
          confirmButtonText: "Cool",
        });
        this.props.history.push(`/`);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row" style={{ padding: "20px" }}>
          <div class="col-6" style={{ paddingTop: "150px" }}>
            <img src={picRegis} alt="iconPerson" height="60%" />
          </div>
          <div
            class="col-6"
            style={{
              padding: "4%",
              boxShadow: "0 30px 50px rgba(0,0,0,.2)",
              borderRadius: "5px",
            }}
          >
            <form noValidate onSubmit={this.onSubmit}>
              <center>
                <h1 className="h3 mb-3 font-weight-normal">SIGN UP</h1>
              </center>
              <hr />
              <div className="form-group">
                <label htmlFor="fName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="fName"
                  placeholder="Enter First Name"
                  value={this.state.fName}
                  onChange={this.onChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Enter Username"
                  value={this.state.username}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.onChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
                onClick={this.register}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
