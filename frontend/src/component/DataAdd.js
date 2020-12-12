import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import base_axios from "../config/base_axios";

class DataAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataName: "",
      dataValue: "",
    };
  }
  render() {
    return (
      <div>
        <div class="text-right" style={{ marginTop: "10px" }}>
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-toggle="modal"
            data-target="#dataAdd"
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-plus"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>{" "}
            Add Data
          </button>
        </div>

        <div
          class="modal fade"
          id="dataAdd"
          tabindex="-"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Add Data
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <Form>
                  <FormGroup>
                    <Label for="fName">Firstname</Label>
                    <Input
                      type="text"
                      name="dataName"
                      id="dataName"
                      placeholder="Data Name"
                      value={this.state.dataName}
                      onChange={(value) =>
                        this.setState({ dataName: value.target.value })
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="lName">Data Value</Label>
                    <Input
                      type="text"
                      name="dataValue"
                      id="dataValue"
                      placeholder="Data Value : "
                      value={this.state.dataValue}
                      onChange={(value) =>
                        this.setState({ dataValue: value.target.value })
                      }
                    />
                  </FormGroup>
                  
                </Form>
              </div>
              <div class="modal-footer">
                <button class="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button
                  data-dismiss="modal"
                  type="submit"
                  onClick={() => this.sendSave()}
                  type="button"
                  class="btn btn-info"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  sendSave() {
    if (this.state.dataName === "") {
      alert("Error input Data Name");
    } else if (this.state.dataValue === "") {
      alert("Error input Data Value");
    } 
    let token = localStorage.getItem("usertoken");
    const datapost = {
      dataName: this.state.dataName,
      dataValue: this.state.dataValue,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    base_axios
      .post("/api/create/data", datapost, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success === true) {
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        alert("Error 304 " + error);
      });
  }
}

export default DataAdd;
