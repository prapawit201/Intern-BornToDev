import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import Navbar from "../component/Navbar";
import { Table, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "../config/base_axios";
import DataAdd from "../component/DataAdd";
import Swal from "sweetalert2/dist/sweetalert2.js";

import "../App.css";
class Main extends Component {
  constructor() {
    super();
    this.state = {
      fName: "",
      username: "",
      Data: [],
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
    this.fetchData();
  }

  fetchData = () => {
    let token = localStorage.getItem("usertoken");
    axios
      .get("/api/list/data", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.data.data) {
          const data = res.data.data;
          this.setState({ Data: data });
        }
      });
    {
      this.listData();
    }
  };
  listData = () => {
    return this.state.Data.map((data) => {
      return (
        <ul class="list-group">
          <li class="list-group-item">
            {data.dataName}{" "}
            <span style={{ float: "right" }}>
              <Link
                type="button"
                class="btn btn-outline-secondary"
                to={"/edit/data/" + data.dataId}
                style={{}}
              >
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-pencil-square"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </Link>
              &nbsp;
              <button
                type="button"
                class="btn btn-outline-danger"
                style={{}}
                onClick={() => this.onDelete(data.dataId)}
              >
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-trash"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </button>
              &nbsp;
              <button
                class="btn btn-outline-info"
                type="button"
                data-toggle="collapse"
                data-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
                style={{}}
              >
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-plus-square"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                  />
                </svg>
              </button>
            </span>
          </li>
        </ul>
      );
    });
  };

  render() {
    return (
      <div>
        <Navbar />{" "}
        <div style={{ marginRight: "100px", marginTop: "30px" }}>
          {" "}
          <Row>
            <Col sm="12">
              <DataAdd />
            </Col>
          </Row>
        </div>
        <div style={{ marginLeft: "50px", marginRight: "50px" }}>
          <div class="row" style={{ marginTop: "50px" }}>
            <div
              class="col-sm-4"
              style={{
                backgroundColor: "#FBF1D5",
                height: "500px",
                width: "300px",
              }}
            >
              <center>
                <span id="toDo">To Do</span>
              </center>
              <hr />
              {this.listData()}
            </div>
            <div
              class="col-sm-4"
              style={{
                backgroundColor: "#FCDEE2",
                height: "500px",
              }}
            >
              <center>
                <span id="toDo">Doing</span>
              </center>
              <hr />
            </div>
            <div
              class="col-sm-4"
              style={{
                backgroundColor: "#E2D0DC",
                height: "500px",
              }}
            >
              <center>
                <span id="toDo">Done</span>
              </center>
              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  }
  async onDelete(dataId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this Data",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        this.sendDelete(dataId);
        this.fetchData();
        this.listData();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Data is safe :)", "error");
      }
    });
  }
  sendDelete(userId) {
    axios
      .post("/api/delete/data", {
        dataId: userId,
      })
      .then((response) => {
        if (response.data.success) {
          Swal.fire("Deleted!", "Your Data has been deleted.", "success");
        }
      })
      .catch((error) => {
        alert("Error 325 ");
      });
  }
}

export default Main;
