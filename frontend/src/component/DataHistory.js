import React, { useState } from "react";
import axios from "../config/base_axios";
import { Table, Row, Col, Nav } from "reactstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Navbar from "../component/Navbar";
class DataHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataName: "",
      dataValue: "",
      dataDate: "",
      Data: [],
    };
  }
  componentDidMount() {
    this.fetchData();
    this.listData();
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
  };
  listData = () => {
    return this.state.Data.map((data) => {
      return (
        <Col sm="4">
          <div
            class="card"
            style={{
              width: "20rem",
              paddingBottom: "20px",
              marginTop: "5px",
              margin: 10,
              backgroundColor: "#FEF4F1",
            }}
          >
            <div class="card-body">
              <h5 class="card-title">{data.dataName}</h5>
              <p class="card-text">{data.dataValue}</p>
              <p class="card-text">{data.dataDate}</p>
            </div>
            <div>
              {" "}
              <span style={{ float: "center" }}>
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
              </span>
            </div>
          </div>
        </Col>
      );
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <center>
          {" "}
          <div className="" style={{ fontSize: "100px", marginTop: "10px" }}>
            History
          </div>
        </center>
        <hr />
        <div class="container">
          <Row>
            <Col>
              <div class="card-group" style={{ marginLeft: "10px" }}>
                {this.listData()}
              </div>
            </Col>
          </Row>
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
      confirmButtonText: "Yes, Update it!",
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

export default DataHistory;
