import React from "react";
import base_axios from "../config/base_axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Form, FormGroup, Label, Input } from "reactstrap";

import Navbar from "../component/Navbar";
import Swal from "sweetalert2";

class SettingDriverEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: {},
      dataId: "",
      dataName: "",
      dataValue: "",
    };
  }
  componentDidMount() {
    let userId = this.props.match.params.dataId;
    base_axios
      .get("/api/get/data/" + userId)
      .then((res) => {
        if (res.data.success) {
          console.log(userId);
          const data = res.data.data[0];
          this.setState({
            Data: data,
            dataName: data.dataName,
            dataValue: data.dataValue,
          });
        } else {
          alert("Error web service");
        }
      })
      .catch((error) => {
        alert("Error server " + error);
      });
  }
  render() {
    return (
      <div>
        <Navbar />
        <div
          class="container"
          style={{
            boxShadow: "0 30px 50px rgba(0,0,0,.2)",
            padding: "2%",
            borderRadius: "5px",
            marginTop: "30px",
          }}
        >
          <div class="form-row justify-content-center">
            <div class="form-group col-md-6">
              <label for="inputPassword4">Data Name : </label>
              <input
                type="text"
                class="form-control"
                placeholder="data name : "
                value={this.state.dataName}
                onChange={(value) =>
                  this.setState({ dataName: value.target.value })
                }
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputEmail4">Data Value : </label>
              <input
                type="text"
                class="form-control"
                placeholder="data value : "
                value={this.state.dataValue}
                onChange={(value) =>
                  this.setState({ dataValue: value.target.value })
                }
              />
            </div>
          </div>
        </div>
        <Link to="/main">
          <button type="button" class="btn btn-secondary">
            Back
          </button>
        </Link>
        &nbsp;
        <button
          type="submit"
          class="btn btn-info"
          onClick={() => this.sendUpdate()}
        >
          Update
        </button>
      </div>
    );
  }
  sendUpdate() {
    //  get parameter id
    let userId = this.props.match.params.dataId;
    const datapost = {
      dataName: this.state.dataName,
      dataValue: this.state.dataValue,

    };

    base_axios
      .post("/api/update/data/" + userId, datapost)
      .then((response) => {
        if (response.data.success === true) {
          Swal.fire({
            title: "Success!",
            text: "Do you want to continue",
            icon: "success",
            confirmButtonText: "Cool",
          });
          this.props.history.push(`/main`);
          console.log(response);
        } else {
          alert("Error");
        }
      })
      .catch((error) => {
        alert("Error 34 " + error);
      });
  }
}

export default SettingDriverEdit;
