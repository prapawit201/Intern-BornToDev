import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import Navbar from "../component/Navbar";
import { Link } from "react-router-dom";
import axios from "../config/base_axios";
import DataAdd from "../component/DataAdd";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "../App.css";
class Main extends Component {
  constructor() {
    super();
    this.state = {
      fName: "",
      username: "",
      date: new Date(),
      time: "",
      Data: [],
      DataEachDay:[],
      errors: {},
      status : false,
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
    this.loadDataDate();
  }

  fetchData = () =>  {
    let token = localStorage.getItem("usertoken");
    axios
      .get("/api/list/data", {
        headers: {
          Authorization: token,
        },
      }) 
      .then(res => {
        if (res.data.data) {
          const data = res.data.data;
          this.setState({ Data: data });
          let temp=[] ;
          let test
          for (let index = 0; index < this.state.Data.length; index++) {
            
            if (this.state.Data[index].date == this.state.time) {
              
              this.setState({status : true})
              test = this.state.Data[index]
              temp.push(test)
            }
            
        }
          this.setState({DataEachDay:temp})
          console.log(this.state.DataEachDay);
        }
        
      });
  };
  onChange = date => {
    this.setState({ date: date });
  };
  loadDataDate() {
    this.state.time = moment(this.state.date.toLocaleDateString()).add(543, "year").format("DD/MM/YYYY");
    
    return this.state.Data.map(data => {
      let status = data.date;
    
      if (status == "13/12/2020") {
        return <div>hihi </div>;
      }else{
        return <h1>Bye</h1>
      }

    });
  }
  loadDataStatusDo() {;
    return this.state.DataEachDay.map(data => {
      let status = data.dataStatus;
      if (status == 1) {
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
                  onClick={() => this.onUpdate(data.dataId)}
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-caret-right"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"
                    />
                  </svg>
                </button>
              </span>
            </li>
          </ul>
        );
      }
    });
  }
  render() {
    this.loadDataDate()
    this.loadDataStatusDo()
    return (
      <div>
        <Navbar />
        <center>
          <span style={{ fontSize: "70px" }}>To-DO List </span>
        </center>{" "}
        <div className="" style={{ marginRight: "150px", marginTop: "30px" }}>
          <span>
            <DataAdd />
          </span>

          <div>
            <span style={{ float: "right", paddingTop: "10px" }}>
              {" "}
              <Link
                to={"/history"}
                type="button"
                class="btn btn-outline-warning"
              >
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-card-list"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"
                  />
                  <circle cx="3.5" cy="5.5" r=".5" />
                  <circle cx="3.5" cy="8" r=".5" />
                  <circle cx="3.5" cy="10.5" r=".5" />
                </svg>{" "}
                History
              </Link>{" "}
            </span>
          </div>
        </div>
        <div>
          <center>
            {" "}
            <Calendar
              showNavigation
              onChange={this.onChange}
              value={this.state.date}
            />
            {this.loadDataDate()}
  
          </center>
        </div>
        {this.state.status?<div style={{ marginLeft: "50px", marginRight: "50px" }}>
          <div class="row" style={{ marginTop: "60px" }}>
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
              {/* {this.listData()} */}
              {this.loadDataStatusDo()}
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
              {this.loadDataStatusDoing()}
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
              {this.loadDataStatusDone()}
            </div>
          </div>
        </div>:<h1>hello</h1>}
      </div>
    );
  }
 
  loadDataStatusDoing() {
    return this.state.Data.map(data => {
      let status = data.dataStatus;
      if (status == 2) {
        return (
          <ul class="list-group">
            <li class="list-group-item">
              {data.dataName}{" "}
              <span style={{ float: "right" }}>
                <button
                  class="btn btn-outline-info"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  style={{}}
                  onClick={() => this.onReverseDoing(data.dataId)}
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-caret-left"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 12.796L4.519 8 10 3.204v9.592zm-.659.753l-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"
                    />
                  </svg>
                </button>
                &nbsp;
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
                  onClick={() => this.onUpdateDoing(data.dataId)}
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-caret-right"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"
                    />
                  </svg>
                </button>
              </span>
            </li>
          </ul>
        );
      }
    });
  }
  loadDataStatusDone() {
    return this.state.Data.map(data => {
      let status = data.dataStatus;
      if (status == 3) {
        return (
          <ul class="list-group">
            <li class="list-group-item">
              {data.dataName}{" "}
              <span style={{ float: "right" }}>
                <button
                  class="btn btn-outline-info"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  style={{}}
                  onClick={() => this.onReverseDone(data.dataId)}
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-caret-left"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 12.796L4.519 8 10 3.204v9.592zm-.659.753l-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"
                    />
                  </svg>
                </button>
                &nbsp;
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
              </span>
            </li>
          </ul>
        );
      }
    });
  }
  async onReverseDone(dataId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to change this Data",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Update it!",
      cancelButtonText: "No, keep it",
    }).then(result => {
      if (result.value) {
        this.sendReverseDone(dataId);
        this.fetchData();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Data is Stay in Doing :)", "error");
      }
    });
  }
  sendReverseDone(userId) {
    const datapost = {
      dataStatus: 2,
    };
    axios
      .post("/api/update/status/data/" + userId, datapost)
      .then(response => {
        if (response.data.success) {
          Swal.fire(
            "Updated!",
            "Your Data has changed to Done List.",
            "success"
          );
        }
      })
      .catch(error => {
        alert("Error 325 ");
      });
  }
  async onReverseDoing(dataId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to change this Data",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Update it!",
      cancelButtonText: "No, keep it",
    }).then(result => {
      if (result.value) {
        this.sendReverseDoing(dataId);
        this.fetchData();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Data is Stay in Done :)", "error");
      }
    });
  }
  sendReverseDoing(userId) {
    const datapost = {
      dataStatus: 1,
    };
    axios
      .post("/api/update/status/data/" + userId, datapost)
      .then(response => {
        if (response.data.success) {
          Swal.fire(
            "Updated!",
            "Your Data has changed to To-DO List.",
            "success"
          );
        }
      })
      .catch(error => {
        alert("Error 325 ");
      });
  }
  async onReverse(dataId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to change this Data",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Update it!",
      cancelButtonText: "No, keep it",
    }).then(result => {
      if (result.value) {
        this.sendReverse(dataId);
        this.fetchData();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Data is Stay in TO-DO :)", "error");
      }
    });
  }
  sendReverse(userId) {
    const datapost = {
      dataStatus: 1,
    };
    axios
      .post("/api/update/status/data/" + userId, datapost)
      .then(response => {
        if (response.data.success) {
          Swal.fire(
            "Updated!",
            "Your Data has changed to To-DO List.",
            "success"
          );
        }
      })
      .catch(error => {
        alert("Error 325 ");
      });
  }
  async onUpdateDoing(dataId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to change this Data",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Update it!",
      cancelButtonText: "No, keep it",
    }).then(result => {
      if (result.value) {
        this.sendUpdateDoing(dataId);
        this.fetchData();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Data is Stay in Doing :)", "error");
      }
    });
  }
  sendUpdateDoing(userId) {
    const datapost = {
      dataStatus: 3,
    };
    axios
      .post("/api/update/status/data/" + userId, datapost)
      .then(response => {
        if (response.data.success) {
          Swal.fire(
            "Updated!",
            "Your Data has changed to Doing List.",
            "success"
          );
        }
      })
      .catch(error => {
        alert("Error 325 ");
      });
  }

  async onUpdate(dataId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to change this Data",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Update it!",
      cancelButtonText: "No, keep it",
    }).then(result => {
      if (result.value) {
        this.sendUpdate(dataId);
        this.fetchData();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Data is Stay in TO-DO :)", "error");
      }
    });
  }
  sendUpdate(userId) {
    const datapost = {
      dataStatus: 2,
    };
    axios
      .post("/api/update/status/data/" + userId, datapost)
      .then(response => {
        if (response.data.success) {
          Swal.fire(
            "Updated!",
            "Your Data has changed to Doing List.",
            "success"
          );
        }
      })
      .catch(error => {
        alert("Error 325 ");
      });
  }

  async onDelete(dataId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this Data",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Update it!",
      cancelButtonText: "No, keep it",
    }).then(result => {
      if (result.value) {
        this.sendDelete(dataId);
        this.fetchData();
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
      .then(response => {
        if (response.data.success) {
          Swal.fire("Deleted!", "Your Data has been deleted.", "success");
        }
      })
      .catch(error => {
        alert("Error 325 ");
      });
  }
}

export default Main;
